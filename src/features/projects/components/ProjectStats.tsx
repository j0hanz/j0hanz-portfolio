import {
  Stack,
  SvgIcon,
  type SvgIconProps,
  type SxProps,
  type Theme,
  Typography,
} from '@mui/material';
import { motion } from 'motion/react';
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

function StarIcon(props: SvgIconProps) {
  return (
    <SvgIcon viewBox="0 0 16 16" {...props}>
      <path d="M8 .25a.75.75 0 0 1 .673.418l1.882 3.815 4.21.612a.75.75 0 0 1 .416 1.279l-3.046 2.97.719 4.192a.751.751 0 0 1-1.088.791L8 12.347l-3.766 1.98a.75.75 0 0 1-1.088-.79l.72-4.194L.818 6.374a.75.75 0 0 1 .416-1.28l4.21-.611L7.327.668A.75.75 0 0 1 8 .25Zm0 2.445L6.615 5.5a.75.75 0 0 1-.564.41l-3.097.45 2.24 2.184a.75.75 0 0 1 .216.664l-.528 3.084 2.769-1.456a.75.75 0 0 1 .698 0l2.77 1.456-.53-3.084a.75.75 0 0 1 .216-.664l2.24-2.183-3.096-.45a.75.75 0 0 1-.564-.41L8 2.694Z" />
    </SvgIcon>
  );
}

function ForkIcon(props: SvgIconProps) {
  return (
    <SvgIcon viewBox="0 0 16 16" {...props}>
      <path d="M5 5.372v.878c0 .414.336.75.75.75h4.5a.75.75 0 0 0 .75-.75v-.878a2.25 2.25 0 1 1 1.5 0v.878a2.25 2.25 0 0 1-2.25 2.25h-1.5v2.128a2.251 2.251 0 1 1-1.5 0V8.5h-1.5A2.25 2.25 0 0 1 3.5 6.25v-.878a2.25 2.25 0 1 1 1.5 0ZM5 3.25a.75.75 0 1 0-1.5 0 .75.75 0 0 0 1.5 0Zm6.75.75a.75.75 0 1 0 0-1.5.75.75 0 0 0 0 1.5Zm-3 8.75a.75.75 0 1 0-1.5 0 .75.75 0 0 0 1.5 0Z" />
    </SvgIcon>
  );
}

function IssueIcon(props: SvgIconProps) {
  return (
    <SvgIcon viewBox="0 0 16 16" {...props}>
      <path d="M8 9.5a1.5 1.5 0 1 0 0-3 1.5 1.5 0 0 0 0 3Z" />
      <path d="M8 0a8 8 0 1 1 0 16A8 8 0 0 1 8 0ZM1.5 8a6.5 6.5 0 1 0 13 0 6.5 6.5 0 0 0-13 0Z" />
    </SvgIcon>
  );
}

const STAT_CONFIG: Record<
  StatKey,
  { label: string; icon: React.ComponentType<SvgIconProps> }
> = {
  stars: { label: 'Stars', icon: StarIcon },
  forks: { label: 'Forks', icon: ForkIcon },
  issues: { label: 'Issues', icon: IssueIcon },
} as const;

const STAT_KEYS: StatKey[] = ['stars', 'forks', 'issues'];
const STAT_KEYS_WITHOUT_ISSUES: StatKey[] = ['stars', 'forks'];

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
      <Icon sx={{ color: 'text.secondary', fontSize: "1.1rem" }} />
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
