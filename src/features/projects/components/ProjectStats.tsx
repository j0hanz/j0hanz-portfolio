import React, { startTransition, Suspense, useOptimistic, useRef } from 'react';

import {
  Skeleton,
  Stack,
  type SxProps,
  type Theme,
  Typography,
} from '@mui/material';
import Button from '@mui/material/Button';
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
import { useRepoStatsQuery } from '@/utils/query';

const labelSx: SxProps<Theme> = {
  textTransform: 'uppercase',
  letterSpacing: 1,
  color: 'text.secondary',
};

const valueSx: SxProps<Theme> = {
  fontWeight: 500,
  fontSize: (theme) => theme.typography.body1.fontSize,
  color: 'text.primary',
};

const containerSx: SxProps<Theme> = {
  position: 'relative',
  flexShrink: 0,
};

const buttonSx: SxProps<Theme> = {
  px: 0,
  fontSize: (theme) => theme.typography.caption.fontSize,
};

type StatKey = keyof RepoStats;

const STAT_LABELS: Record<StatKey, string> = {
  stars: 'Stars',
  forks: 'Forks',
  issues: 'Issues',
} as const;

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
    <Stack spacing={0.5} width="100%" aria-hidden="true">
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
  const ref = useRef<HTMLSpanElement>(null);

  React.useEffect(() => {
    if (prefersReducedMotion) {
      if (ref.current) ref.current.textContent = value.toLocaleString();
      return;
    }

    const controls = animate(motionValue, value, {
      ...getTransition('smooth', { duration: 0.7 }),
    });

    return () => controls.stop();
  }, [value, prefersReducedMotion, motionValue, getTransition]);

  useMotionValueEvent(motionValue, 'change', (latest) => {
    if (ref.current) {
      ref.current.textContent = Math.round(latest).toLocaleString();
    }
  });

  return (
    <Stack direction="row" alignItems="baseline" spacing={1}>
      <Typography variant="body2" sx={labelSx}>
        {label}
      </Typography>
      <Typography
        component={motion.span}
        ref={ref}
        initial={{ opacity: 0.4 }}
        animate={{ opacity: 1 }}
        transition={getTransition('spring')}
        sx={valueSx}
      >
        {prefersReducedMotion ? value.toLocaleString() : '0'}
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
  const { data: initialStats } = useRepoStatsQuery(repoPath);

  const [optimisticStats, addOptimisticStar] = useOptimistic(
    initialStats,
    (state: RepoStats, increment: number) => ({
      ...state,
      stars: state.stars + increment,
    })
  );

  const handleOptimisticStar = () => {
    startTransition(async () => {
      addOptimisticStar(1);
      // Demo: Simulate network delay to demonstrate optimistic UI pattern
      await new Promise((resolve) => setTimeout(resolve, 800));
    });
  };

  const statItems = buildStatItems(optimisticStats, hasProjectBoard);

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
