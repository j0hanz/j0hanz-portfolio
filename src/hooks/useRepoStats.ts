import { useEffect, useRef, useState } from 'react';

import { useInView } from 'motion/react';

import { CACHE_DURATION, EMPTY_STATS } from '@/config/constants';
import type { CachedStats, RepoStats } from '@/config/types';
import { useEventCallback } from '@/hooks';

// Cache stats for 10 minutes to avoid rate limiting
const statsCache = new Map<string, CachedStats>();

const logRateLimitWarning = (response: Response, repoPath: string) => {
  if (response.status !== 403) return;
  const rateLimitRemaining = response.headers.get('x-ratelimit-remaining');
  if (rateLimitRemaining === '0') {
    console.warn(`GitHub API rate limit exceeded for ${repoPath}`);
  } else {
    console.warn(`GitHub API 403 (Forbidden) for ${repoPath}`);
  }
};

const isCacheFresh = (
  cached: CachedStats | undefined,
  forceRefresh: boolean
): cached is CachedStats => {
  if (forceRefresh || !cached) return false;
  return Date.now() - cached.timestamp < CACHE_DURATION;
};

export function useRepoStats(repoPath: string) {
  const [stats, setStats] = useState<RepoStats>(EMPTY_STATS);
  const [status, setStatus] = useState<'idle' | 'loading' | 'error'>('idle');
  const [hasLoadedStats, setHasLoadedStats] = useState(false);
  const [refreshIndex, setRefreshIndex] = useState(0);
  const [optimisticStarCount, setOptimisticStarCount] = useState<number | null>(
    null
  );
  const containerRef = useRef<HTMLDivElement | null>(null);
  const timeoutRef = useRef<number | null>(null);
  const isInView = useInView(containerRef, {
    once: true,
    margin: '0px 0px -20% 0px',
  });

  const clearOptimisticTimeout = useEventCallback(() => {
    if (timeoutRef.current === null) return;
    window.clearTimeout(timeoutRef.current);
    timeoutRef.current = null;
  });

  useEffect(() => () => clearOptimisticTimeout(), [clearOptimisticTimeout]);

  useEffect(() => {
    if (!repoPath || !isInView) {
      return () => undefined;
    }

    let isCancelled = false;
    const controller = new AbortController();
    const forceRefresh = refreshIndex > 0;

    const resolveFromCache = () => {
      const cached = statsCache.get(repoPath);
      if (!isCacheFresh(cached, forceRefresh)) {
        return false;
      }

      setStats(cached.data);
      setHasLoadedStats(true);
      setStatus('idle');
      return true;
    };

    if (resolveFromCache()) {
      return () => {
        isCancelled = true;
        controller.abort();
      };
    }

    const fetchStats = async () => {
      try {
        setStatus('loading');
        const response = await fetch(
          `https://api.github.com/repos/${repoPath}`,
          {
            signal: controller.signal,
            headers: {
              Accept: 'application/vnd.github+json',
            },
          }
        );

        if (!response.ok) {
          logRateLimitWarning(response, repoPath);
          throw new Error(`Failed to fetch repo stats: ${response.status}`);
        }

        const data = await response.json();
        if (isCancelled) return;

        const newStats: RepoStats = {
          stars: data.stargazers_count ?? 0,
          forks: data.forks_count ?? 0,
          issues: data.open_issues_count ?? 0,
        };

        statsCache.set(repoPath, { data: newStats, timestamp: Date.now() });

        setStats(newStats);
        setHasLoadedStats(true);
        setStatus('idle');
      } catch (error) {
        if (controller.signal.aborted || isCancelled) return;
        console.error(`Unable to load GitHub stats for ${repoPath}:`, error);
        setStatus('error');
      }
    };

    fetchStats();

    return () => {
      isCancelled = true;
      controller.abort();
    };
  }, [repoPath, isInView, refreshIndex]);

  const handleOptimisticStar = useEventCallback(() => {
    if (!hasLoadedStats) return;

    clearOptimisticTimeout();
    const newStarCount = stats.stars + 1;
    setOptimisticStarCount(newStarCount);

    timeoutRef.current = window.setTimeout(() => {
      setOptimisticStarCount(null);
      setRefreshIndex((prev) => prev + 1);
      timeoutRef.current = null;
    }, 2000);
  });

  const displayStats: RepoStats = {
    ...stats,
    stars: optimisticStarCount ?? stats.stars,
  };

  return {
    containerRef,
    status,
    stats: displayStats,
    hasLoadedStats,
    handleOptimisticStar,
  };
}

export default useRepoStats;
