import type { SvgIconProps } from '@mui/material';

import { ForkIcon, IssueIcon, StarIcon } from '@/components/icons/GitHubIcons';
import type { StatKey } from '@/config/types';

// Configuration for GitHub repository statistics display
export const STAT_CONFIG: Record<
  StatKey,
  { label: string; icon: React.ComponentType<SvgIconProps> }
> = {
  stars: { label: 'Stars', icon: StarIcon },
  forks: { label: 'Forks', icon: ForkIcon },
  issues: { label: 'Issues', icon: IssueIcon },
} as const;

// Stat keys for projects with issue tracking
export const STAT_KEYS: StatKey[] = ['stars', 'forks', 'issues'];

// Stat keys for projects without issue tracking (no project board)
export const STAT_KEYS_WITHOUT_ISSUES: StatKey[] = ['stars', 'forks'];
