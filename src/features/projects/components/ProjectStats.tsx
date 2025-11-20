import React, { useEffect, useState } from 'react';

import { Stack, Typography } from '@mui/material';
import {
  animate,
  motion,
  useMotionValue,
  useMotionValueEvent,
} from 'motion/react';

import type { AnimationConfig, ProjectStatsProps } from '@/config/types';
import { useAnimationConfig } from '@/hooks';

interface RepoStats {
  stars: number;
  forks: number;
  issues: number;
}

interface CachedStats {
  data: RepoStats;
  timestamp: number;
}

// Cache stats for 10 minutes to avoid rate limiting
const statsCache = new Map<string, CachedStats>();
const CACHE_DURATION = 10 * 60 * 1000; // 10 minutes

interface AnimatedStatProps {
  label: string;
  value: number;
  prefersReducedMotion: boolean;
  getTransition: AnimationConfig['getTransition'];
}

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
        transition={getTransition('snappy')}
        sx={{ fontWeight: 600, fontSize: '1.05rem', color: 'text.primary' }}
      >
        {displayValue.toLocaleString()}
      </Typography>
    </Stack>
  );
}

const ProjectStats = ({
  repoPath,
  hasProjectBoard,
}: ProjectStatsProps): React.JSX.Element => {
  const { prefersReducedMotion, getTransition } = useAnimationConfig();
  const [stats, setStats] = useState<RepoStats | null>(null);
  const [status, setStatus] = useState<'idle' | 'loading' | 'error'>('idle');

  useEffect(() => {
    let isCancelled = false;
    const controller = new AbortController();

    const fetchStats = async () => {
      try {
        // Check cache first
        const cached = statsCache.get(repoPath);
        const now = Date.now();

        if (cached && now - cached.timestamp < CACHE_DURATION) {
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
          if (response.status === 403) {
            const rateLimitRemaining = response.headers.get(
              'x-ratelimit-remaining'
            );
            if (rateLimitRemaining === '0') {
              console.warn(`GitHub API rate limit exceeded for ${repoPath}`);
            } else {
              console.warn(`GitHub API 403 (Forbidden) for ${repoPath}`);
            }
          }
          throw new Error(`Failed to fetch repo stats: ${response.status}`);
        }

        const data = await response.json();
        if (isCancelled) return;

        const newStats = {
          stars: data.stargazers_count ?? 0,
          forks: data.forks_count ?? 0,
          issues: data.open_issues_count ?? 0,
        };

        // Cache the results
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
  }, [repoPath]);

  const fallback = stats ?? { stars: 0, forks: 0, issues: 0 };
  const statItems = [
    { key: 'stars', label: 'Stars', value: fallback.stars },
    { key: 'forks', label: 'Forks', value: fallback.forks },
  ];

  if (hasProjectBoard) {
    statItems.push({ key: 'issues', label: 'Issues', value: fallback.issues });
  }

  return (
    <Stack spacing={1.5} alignItems="flex-start" sx={{ mb: 3 }}>
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
      {status === 'loading' && !stats && (
        <Typography variant="caption" color="text.secondary">
          Fetching GitHub activity…
        </Typography>
      )}
    </Stack>
  );
};

ProjectStats.displayName = 'ProjectStats';

export default ProjectStats;
