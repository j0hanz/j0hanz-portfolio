import {
  Stack,
  type SvgIconProps,
  type SxProps,
  type Theme,
  Typography,
} from '@mui/material';
import { m } from 'motion/react';

import {
  STAT_CONFIG,
  STAT_KEYS,
  STAT_KEYS_WITHOUT_ISSUES,
} from '@/config/stats';
import type { ProjectStatsProps, RepoStats, StatItem } from '@/config/types';
import { useAnimationConfig, useCountUp, useGitHubApi } from '@/hooks';

const labelSx: SxProps<Theme> = (theme) =>
  theme.custom.layout.projectStats.label;

const valueSx: SxProps<Theme> = (theme) =>
  theme.custom.layout.projectStats.value;

const containerSx: SxProps<Theme> = (theme) =>
  theme.custom.layout.projectStats.container;

// Builds stat items array based on configuration
function buildStatItems(
  stats: RepoStats,
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
}: Readonly<{
  label: string;
  value: number;
  icon: React.ComponentType<SvgIconProps>;
}>): React.JSX.Element {
  const { ref, value: displayValue } = useCountUp(value);
  const { getTransition } = useAnimationConfig();

  return (
    <Stack direction="row" alignItems="center" spacing={2}>
      <Icon
        sx={{
          color: 'text.secondary',
          fontSize: (theme) => theme.custom.sizing.iconMd,
        }}
      />
      <Typography variant="body2" sx={labelSx}>
        {label}
      </Typography>
      <Typography
        component={m.span}
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

const ProjectStats = ({
  repoPath,
  hasProjectBoard,
}: Readonly<ProjectStatsProps>): React.JSX.Element => {
  const { repoStats } = useGitHubApi(repoPath);
  const statItems = buildStatItems(repoStats, hasProjectBoard);

  return (
    <Stack spacing={1.5} alignItems="flex-start" sx={containerSx}>
      {statItems.map(({ key, label, value, icon }) => (
        <AnimatedStat key={key} label={label} value={value} icon={icon} />
      ))}
    </Stack>
  );
};

ProjectStats.displayName = 'ProjectStats';

export { ProjectStats };
