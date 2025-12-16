import { Suspense } from 'react';

import {
  Stack,
  type SvgIconProps,
  type SxProps,
  type Theme,
  Typography,
} from '@mui/material';
import { useSuspenseQuery } from '@tanstack/react-query';
import { motion } from 'motion/react';

import {
  STAT_CONFIG,
  STAT_KEYS,
  STAT_KEYS_WITHOUT_ISSUES,
} from '@/config/stats';
import type { ProjectStatsProps, StatItem } from '@/config/types';
import { useAnimationConfig, useCountUp } from '@/hooks';
import { LETTER_SPACING_NORMAL, SIZING } from '@/styles/shared';
import { githubKeys } from '@/utils/query/keys';

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
  flex: 'none',
};

// Builds stat items array based on configuration
function buildStatItems(
  stats: { stars: number; forks: number; issues: number },
  includeIssues: boolean
): (StatItem & { icon: React.ComponentType<SvgIconProps> })[] {
  const keys = includeIssues ? STAT_KEYS : STAT_KEYS_WITHOUT_ISSUES;
  return keys.map((key) => ({
    key,
    label: STAT_CONFIG[key].label,
    value: stats[key],
    icon: STAT_CONFIG[key].icon,
  }));
}

function AnimatedStat({
  label,
  value,
  icon: Icon,
}: {
  label: string;
  value: number;
  icon: React.ComponentType<SvgIconProps>;
}): React.JSX.Element {
  const { ref, value: displayValue } = useCountUp(value);
  const { getTransition } = useAnimationConfig();

  return (
    <Stack direction="row" alignItems="center" spacing={1.5}>
      <Icon
        sx={{
          color: 'text.secondary',
          fontSize: SIZING.iconMd,
        }}
      />
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

function ProjectStatsContent({
  repoPath,
  hasProjectBoard,
}: ProjectStatsProps): React.JSX.Element {
  // Use TanStack Query's Suspense hook - proper way for React 19
  const { data: stats } = useSuspenseQuery({
    queryKey: githubKeys.repoStats(repoPath),
    queryFn: ({ signal }) =>
      fetch(`https://api.github.com/repos/${repoPath}`, {
        headers: {
          Accept: 'application/vnd.github+json',
          'X-GitHub-Api-Version': '2022-11-28',
          ...(import.meta.env.VITE_GITHUB_TOKEN && {
            Authorization: `Bearer ${import.meta.env.VITE_GITHUB_TOKEN}`,
          }),
        },
        signal,
      })
        .then((res) => (res.ok ? res.json() : Promise.reject()))
        .then((data) => ({
          stars: data.stargazers_count ?? 0,
          forks: data.forks_count ?? 0,
          issues: data.open_issues_count ?? 0,
        }))
        .catch(() => ({ stars: 0, forks: 0, issues: 0 })),
    staleTime: 10 * 60 * 1000,
    gcTime: 30 * 60 * 1000,
  });

  const statItems = buildStatItems(stats, hasProjectBoard);

  return (
    <Stack spacing={1.5} alignItems="flex-start" sx={containerSx}>
      {statItems.map(({ key, label, value, icon }) => (
        <AnimatedStat key={key} label={label} value={value} icon={icon} />
      ))}
    </Stack>
  );
}

const ProjectStats = (props: ProjectStatsProps): React.JSX.Element => {
  return (
    <Suspense fallback={null}>
      <ProjectStatsContent {...props} />
    </Suspense>
  );
};

ProjectStats.displayName = 'ProjectStats';

export { ProjectStats };
