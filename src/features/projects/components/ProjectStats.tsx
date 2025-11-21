import React, { useEffect, useRef, useState } from 'react';

import { Stack, Typography } from '@mui/material';
import Button from '@mui/material/Button';
import {
  animate,
  motion,
  useInView,
  useMotionValue,
  useMotionValueEvent,
} from 'motion/react';

import { CACHE_DURATION, EMPTY_STATS } from '@/config/constants';
import type {
  AnimatedStatProps,
  CachedStats,
  ProjectStatsProps,
  RepoStats,
} from '@/config/types';
import { useAnimationConfig, useEventCallback } from '@/hooks';

// Cache stats for 10 minutes to avoid rate limiting
const statsCache = new Map<string, CachedStats>();

function AnimatedStat({
  label,
  value,
  prefersReducedMotion,
  getTransition,
}: AnimatedStatProps): React.JSX.Element {
  const motionValue = useMotionValue(prefersReducedMotion ? value : 0);
  const [displayValue, setDisplayValue] = useState(
    prefersReducedMotion ? value : 0
  );

  useEffect(() => {
    if (prefersReducedMotion) {
      motionValue.set(value);
      return;
    }

    const controls = animate(motionValue, value, {
      ...getTransition('smooth', { duration: 0.7 }),
    });

    return () => controls.stop();
  }, [value, prefersReducedMotion, motionValue, getTransition]);

  useMotionValueEvent(motionValue, 'change', (latest) => {
    setDisplayValue(Math.round(latest));
  });

  return (
    <Stack direction="row" alignItems="baseline" spacing={1}>
      <Typography
        variant="body2"
        sx={{
          textTransform: 'uppercase',
          letterSpacing: 1,
          color: 'text.secondary',
        }}
      >
        {label}
      </Typography>
      <Typography
        component={motion.span}
        initial={{ opacity: 0.4 }}
        animate={{ opacity: 1 }}
        transition={getTransition('spring')}
        sx={{ fontWeight: 500, fontSize: '1.05rem', color: 'text.primary' }}
      >
        {displayValue.toLocaleString()}
      </Typography>
    </Stack>
  );
}

const logRateLimitWarning = (response: Response, repoPath: string) => {
  if (response.status !== 403) return;
  const rateLimitRemaining = response.headers.get('x-ratelimit-remaining');
  if (rateLimitRemaining === '0') {
    console.warn(`GitHub API rate limit exceeded for ${repoPath}`);
  } else {
    console.warn(`GitHub API 403 (Forbidden) for ${repoPath}`);
  }
};

function useRepoStats(repoPath: string) {
  const [stats, setStats] = useState<RepoStats | null>(null);
  const [status, setStatus] = useState<'idle' | 'loading' | 'error'>('idle');
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

  const clearOptimisticTimeout = () => {
    if (timeoutRef.current === null) return;
    window.clearTimeout(timeoutRef.current);
    timeoutRef.current = null;
  };

  useEffect(() => () => clearOptimisticTimeout(), []);

  useEffect(() => {
    if (!repoPath || !isInView) {
      return () => undefined;
    }

    let isCancelled = false;
    const controller = new AbortController();
    const forceRefresh = refreshIndex > 0;

    const fetchStats = async () => {
      try {
        const cached = statsCache.get(repoPath);
        const now = Date.now();

        if (
          !forceRefresh &&
          cached &&
          now - cached.timestamp < CACHE_DURATION
        ) {
          if (!isCancelled) {
            setStats(cached.data);
            setStatus('idle');
          }
          return;
        }

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

        statsCache.set(repoPath, { data: newStats, timestamp: now });

        setStats(newStats);
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
    if (!stats) return;

    clearOptimisticTimeout();
    const newStarCount = stats.stars + 1;
    setOptimisticStarCount(newStarCount);

    timeoutRef.current = window.setTimeout(() => {
      setOptimisticStarCount(null);
      setRefreshIndex((prev) => prev + 1);
      timeoutRef.current = null;
    }, 2000);
  });

  const baseStats = stats ?? EMPTY_STATS;
  const displayStats: RepoStats = {
    ...baseStats,
    stars: optimisticStarCount ?? baseStats.stars,
  };

  return {
    containerRef,
    status,
    stats: displayStats,
    hasLoadedStats: Boolean(stats),
    handleOptimisticStar,
  };
}

const ProjectStats = ({
  repoPath,
  hasProjectBoard,
}: ProjectStatsProps): React.JSX.Element => {
  const { prefersReducedMotion, getTransition } = useAnimationConfig();
  const { containerRef, status, stats, hasLoadedStats, handleOptimisticStar } =
    useRepoStats(repoPath);

  const statItems = [
    { key: 'stars', label: 'Stars', value: stats.stars },
    { key: 'forks', label: 'Forks', value: stats.forks },
  ];

  if (hasProjectBoard) {
    statItems.push({ key: 'issues', label: 'Issues', value: stats.issues });
  }

  const isInitialLoad = status === 'loading' && !hasLoadedStats;
  const canOptimisticUpdate = hasLoadedStats && status !== 'loading';

  return (
    <Stack
      ref={containerRef}
      spacing={1.5}
      alignItems="flex-start"
      sx={{ position: 'relative', flexShrink: 0 }}
    >
      {statItems.map(({ key, label, value }) => (
        <AnimatedStat
          key={key}
          label={label}
          value={value}
          prefersReducedMotion={prefersReducedMotion}
          getTransition={getTransition}
        />
      ))}
      {status === 'error' && (
        <Typography variant="caption" color="error.main">
          Stats temporarily unavailable (API rate limit).
        </Typography>
      )}
      {isInitialLoad && (
        <Typography variant="caption" color="text.secondary">
          Fetching GitHub activity…
        </Typography>
      )}
      <Button
        variant="text"
        size="small"
        onClick={handleOptimisticStar}
        disabled={!canOptimisticUpdate}
        sx={{ px: 0, fontSize: '0.75rem' }}
      >
        Already starred it? Reflect it instantly
      </Button>
    </Stack>
  );
};

ProjectStats.displayName = 'ProjectStats';

export default ProjectStats;
