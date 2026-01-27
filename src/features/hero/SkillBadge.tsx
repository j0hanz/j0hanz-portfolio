import { Box, type SxProps, type Theme, Tooltip } from '@mui/material';
import { m } from 'motion/react';

import type { SkillBadgeProps } from '@/config/types';
import { useAnimationConfig } from '@/hooks';
import { SIZING } from '@/styles/shared';

const badgeContainerSx: SxProps<Theme> = {
  position: 'relative',
  display: 'inline-grid',
  placeItems: 'center',
};

const iconSx: SxProps<Theme> = {
  fontSize: SIZING.iconLg,
  color: 'text.secondary',
  transition: 'color 0.2s ease',
  '&:hover': {
    color: 'primary.main',
  },
};

function SkillBadge({ skill }: Readonly<SkillBadgeProps>): React.JSX.Element {
  const { prefersReducedMotion, getTransition } = useAnimationConfig();
  const IconComponent = skill.icon;

  const motionProps = prefersReducedMotion
    ? {}
    : {
        whileHover: { scale: 1.15 },
        whileTap: { scale: 0.95 },
        transition: getTransition('springSnappy'),
      };

  return (
    <Tooltip title={skill.label} arrow enterDelay={200}>
      <Box
        component={m.span}
        {...motionProps}
        sx={badgeContainerSx}
        aria-label={`${skill.label} skill`}
        role="img"
      >
        <Box component={IconComponent} sx={iconSx} aria-hidden="true" />
      </Box>
    </Tooltip>
  );
}

export { SkillBadge };
