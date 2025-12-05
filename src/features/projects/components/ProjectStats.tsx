import {
  Stack,
  type SvgIconProps,
  type SxProps,
  type Theme,
  Typography,
} from '@mui/material';
import { motion } from 'motion/react';

import {
  STAT_CONFIG,
  STAT_KEYS,
  STAT_KEYS_WITHOUT_ISSUES,
} from '@/config/stats';
import type { ProjectStatsProps, RepoStats, StatItem } from '@/config/types';
import { useAnimationConfig, useCountUp } from '@/hooks';
import { LETTER_SPACING_NORMAL, SIZING } from '@/styles/shared';
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
  flex: 'none',
};

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

const ProjectStats = ({
  repoPath,
  hasProjectBoard,
}: ProjectStatsProps): React.JSX.Element => {
  const { data: stats } = useRepoStatsQuery(repoPath);
  const statItems = buildStatItems(stats, hasProjectBoard);

  return (
    <Stack spacing={1.5} alignItems="flex-start" sx={containerSx}>
      {statItems.map(({ key, label, value, icon }) => (
        <AnimatedStat key={key} label={label} value={value} icon={icon} />
      ))}
    </Stack>
  );
};

ProjectStats.displayName = 'ProjectStats';

export default ProjectStats;
