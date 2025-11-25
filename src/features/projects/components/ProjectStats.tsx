import { Suspense, useRef } from 'react';

import { Stack, type SxProps, type Theme, Typography } from '@mui/material';
import { motion, useInView } from 'motion/react';

import ErrorBoundary from '@/components/ErrorBoundary';
import { StatsSkeleton } from '@/components/Skeletons';
import type {
  ProjectStatsProps,
  RepoStats,
  StatItem,
  StatKey,
} from '@/config/types';
import { useAnimationConfig, useCountUp } from '@/hooks';
import { LETTER_SPACING_NORMAL } from '@/styles/shared';
import { useRepoStatsQuery } from '@/utils/query/index';

const labelSx: SxProps<Theme> = {
  textTransform: 'uppercase',
  letterSpacing: LETTER_SPACING_NORMAL,
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

const STAT_LABELS: Record<StatKey, string> = {
  stars: 'Stars',
  forks: 'Forks',
  issues: 'Issues',
} as const;

const STAT_KEYS: StatKey[] = ['stars', 'forks', 'issues'];
const STAT_KEYS_WITHOUT_ISSUES: StatKey[] = ['stars', 'forks'];

// Builds stat items array based on configuration
function buildStatItems(stats: RepoStats, includeIssues: boolean): StatItem[] {
  const keys = includeIssues ? STAT_KEYS : STAT_KEYS_WITHOUT_ISSUES;
  return keys.map((key) => ({
    key,
    label: STAT_LABELS[key],
    value: stats[key],
  }));
}

function StatsErrorFallback() {
  return (
    <Typography variant="body2" color="text.secondary">
      Stats unavailable
    </Typography>
  );
}

function AnimatedStat({
  label,
  value,
}: {
  label: string;
  value: number;
}): React.JSX.Element {
  const { ref, value: displayValue } = useCountUp(value);
  const { getTransition } = useAnimationConfig();

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
        {displayValue}
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
  const { data: stats } = useRepoStatsQuery(repoPath);
  const statItems = buildStatItems(stats, hasProjectBoard);

  return (
    <>
      {statItems.map(({ key, label, value }) => (
        <AnimatedStat key={key} label={label} value={value} />
      ))}
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
        <ErrorBoundary fallback={<StatsErrorFallback />}>
          <Suspense fallback={<StatsSkeleton />}>
            <StatsContent
              repoPath={repoPath}
              hasProjectBoard={hasProjectBoard}
            />
          </Suspense>
        </ErrorBoundary>
      ) : (
        <StatsSkeleton />
      )}
    </Stack>
  );
};

ProjectStats.displayName = 'ProjectStats';

export default ProjectStats;
