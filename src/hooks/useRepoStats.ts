import { useEffect, useRef, useState } from 'react';

import { useInView } from 'motion/react';

import { CACHE_DURATION, EMPTY_STATS } from '@/config/constants';
import type { CachedStats, RepoStats } from '@/config/types';
import { useEventCallback, useFetch } from '@/hooks';

// Cache stats for 10 minutes to avoid rate limiting
const statsCache = new Map<string, CachedStats>();

interface GitHubRepoResponse {
  stargazers_count: number;
  forks_count: number;
  open_issues_count: number;
  [key: string]: unknown;
}

const isCacheFresh = (
  cached: CachedStats | undefined,
  forceRefresh: boolean
): cached is CachedStats => {
  if (forceRefresh || !cached) return false;
  return Date.now() - cached.timestamp < CACHE_DURATION;
};

export function useRepoStats(repoPath: string) {
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

  const forceRefresh = refreshIndex > 0;
  const cached = statsCache.get(repoPath);
  const isFresh = isCacheFresh(cached, forceRefresh);

  const { data, loading, error, execute } = useFetch<GitHubRepoResponse>(
    undefined,
    {
      onSuccess: (responseData) => {
        const newStats: RepoStats = {
          stars: responseData.stargazers_count ?? 0,
          forks: responseData.forks_count ?? 0,
          issues: responseData.open_issues_count ?? 0,
        };
        statsCache.set(repoPath, { data: newStats, timestamp: Date.now() });
      },
      onError: (err) => {
        console.error(`Unable to load GitHub stats for ${repoPath}:`, err);
      },
    }
  );

  const clearOptimisticTimeout = useEventCallback(() => {
    if (timeoutRef.current === null) return;
    window.clearTimeout(timeoutRef.current);
    timeoutRef.current = null;
  });

  useEffect(() => () => clearOptimisticTimeout(), [clearOptimisticTimeout]);

  useEffect(() => {
    if (!repoPath || !isInView || isFresh) {
      return;
    }

    execute(`https://api.github.com/repos/${repoPath}`, {
      headers: {
        Accept: 'application/vnd.github+json',
      },
    });
  }, [repoPath, isInView, isFresh, execute]);

  const handleOptimisticStar = useEventCallback(() => {
    // Only allow optimistic updates if we have data (cached or fetched)
    if (!isFresh && !data) return;

    clearOptimisticTimeout();

    // Calculate current stars based on what we're displaying
    const currentStars = isFresh
      ? cached!.data.stars
      : (data?.stargazers_count ?? 0);

    const newStarCount = currentStars + 1;
    setOptimisticStarCount(newStarCount);

    timeoutRef.current = window.setTimeout(() => {
      setOptimisticStarCount(null);
      setRefreshIndex((prev) => prev + 1);
      timeoutRef.current = null;
    }, 2000);
  });

  // Derive current stats
  const currentStats: RepoStats = isFresh
    ? cached!.data
    : data
      ? {
          stars: data.stargazers_count ?? 0,
          forks: data.forks_count ?? 0,
          issues: data.open_issues_count ?? 0,
        }
      : EMPTY_STATS;

  const displayStats: RepoStats = {
    ...currentStats,
    stars: optimisticStarCount ?? currentStats.stars,
  };

  const status = loading ? 'loading' : error ? 'error' : 'idle';
  const hasLoadedStats = isFresh || !!data;

  return {
    containerRef,
    status,
    stats: displayStats,
    hasLoadedStats,
    handleOptimisticStar,
  };
}

export default useRepoStats;
