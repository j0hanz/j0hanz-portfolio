import React, { Suspense, useRef, useState } from 'react';

import {
  Skeleton,
  Stack,
  type SxProps,
  type Theme,
  Typography,
} from '@mui/material';
import Button from '@mui/material/Button';
import { useQueryClient } from '@tanstack/react-query';
import {
  animate,
  motion,
  useInView,
  useMotionValue,
  useMotionValueEvent,
} from 'motion/react';

import type {
  AnimatedStatProps,
  ProjectStatsProps,
  RepoStats,
} from '@/config/types';
import { useAnimationConfig } from '@/hooks';
import { githubKeys, useRepoStatsQuery } from '@/utils/query';

const labelSx: SxProps<Theme> = {
  textTransform: 'uppercase',
  letterSpacing: 1,
  color: 'text.secondary',
};

const valueSx: SxProps<Theme> = {
  fontWeight: 500,
  fontSize: '1.05rem',
  color: 'text.primary',
};

const containerSx: SxProps<Theme> = {
  position: 'relative',
  flexShrink: 0,
};

const buttonSx: SxProps<Theme> = {
  px: 0,
  fontSize: '0.75rem',
};

type StatKey = keyof RepoStats;

const STAT_LABELS: Record<StatKey, string> = {
  stars: 'Stars',
  forks: 'Forks',
  issues: 'Issues',
};

const buildStatItems = (stats: RepoStats, includeIssues: boolean) => {
  const keys: StatKey[] = includeIssues
    ? ['stars', 'forks', 'issues']
    : ['stars', 'forks'];
  return keys.map((key) => ({
    key,
    label: STAT_LABELS[key],
    value: stats[key],
  }));
};

function StatsSkeleton() {
  return (
    <Stack spacing={0.5} width="100%" aria-hidden>
      <Skeleton variant="text" width="60%" height={20} />
      <Skeleton variant="text" width="40%" height={20} />
    </Stack>
  );
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

  React.useEffect(() => {
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
      <Typography variant="body2" sx={labelSx}>
        {label}
      </Typography>
      <Typography
        component={motion.span}
        initial={{ opacity: 0.4 }}
        animate={{ opacity: 1 }}
        transition={getTransition('spring')}
        sx={valueSx}
      >
        {displayValue.toLocaleString()}
      </Typography>
    </Stack>
  );
}

function StatsContent({
  repoPath,
  hasProjectBoard,
}: {
  repoPath: string;
  hasProjectBoard: boolean;
}): React.JSX.Element {
  const { prefersReducedMotion, getTransition } = useAnimationConfig();
  const queryClient = useQueryClient();
  const { data: initialStats } = useRepoStatsQuery(repoPath);
  const [optimisticStars, setOptimisticStars] = useState<number | null>(null);

  const handleOptimisticStar = () => {
    // Get current stats from cache
    const currentStats =
      queryClient.getQueryData<RepoStats>(githubKeys.repoStats(repoPath)) ??
      initialStats;

    // Set optimistic star count
    const newStarCount = currentStats.stars + 1;
    setOptimisticStars(newStarCount);

    // Update query cache optimistically
    queryClient.setQueryData<RepoStats>(githubKeys.repoStats(repoPath), {
      ...currentStats,
      stars: newStarCount,
    });

    // Reset optimistic state after 2 seconds
    setTimeout(() => {
      setOptimisticStars(null);
      // Optionally refetch to get actual server state
      // queryClient.invalidateQueries({ queryKey: githubKeys.repoStats(repoPath) });
    }, 2000);
  };

  const stats: RepoStats = {
    ...initialStats,
    stars: optimisticStars ?? initialStats.stars,
  };

  const statItems = buildStatItems(stats, hasProjectBoard);

  return (
    <>
      {statItems.map(({ key, label, value }) => (
        <AnimatedStat
          key={key}
          label={label}
          value={value}
          prefersReducedMotion={prefersReducedMotion}
          getTransition={getTransition}
        />
      ))}
      <Button
        variant="text"
        size="small"
        onClick={handleOptimisticStar}
        sx={buttonSx}
      >
        Already starred it? Reflect it instantly
      </Button>
    </>
  );
}

const ProjectStats = ({
  repoPath,
  hasProjectBoard,
}: ProjectStatsProps): React.JSX.Element => {
  const containerRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(containerRef, {
    once: true,
    margin: '0px 0px -20% 0px',
  });

  return (
    <Stack
      ref={containerRef}
      spacing={1.5}
      alignItems="flex-start"
      sx={containerSx}
    >
      {isInView ? (
        <Suspense fallback={<StatsSkeleton />}>
          <StatsContent repoPath={repoPath} hasProjectBoard={hasProjectBoard} />
        </Suspense>
      ) : (
        <StatsSkeleton />
      )}
    </Stack>
  );
};

ProjectStats.displayName = 'ProjectStats';

export default ProjectStats;
