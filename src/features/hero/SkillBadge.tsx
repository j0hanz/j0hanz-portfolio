import { Box, type SxProps, type Theme, Tooltip } from '@mui/material';
import { motion } from 'motion/react';

import type { Skill } from '@/config/types';
import { useAnimationConfig } from '@/hooks';

interface SkillBadgeProps {
  skill: Skill;
}

const badgeContainerSx: SxProps<Theme> = {
  position: 'relative',
  display: 'inline-flex',
  alignItems: 'center',
  justifyContent: 'center',
};

const iconSx: SxProps<Theme> = {
  fontSize: { xs: '1.5rem', md: '1.75rem' },
  color: 'text.secondary',
  transition: 'color 0.2s ease',
  '&:hover': {
    color: 'primary.main',
  },
};

function SkillBadge({ skill }: SkillBadgeProps): React.JSX.Element {
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
        component={motion.span}
        {...motionProps}
        sx={badgeContainerSx}
        aria-label={`${skill.label} skill`}
        role="img"
      >
        <Box component={IconComponent} sx={iconSx} />
      </Box>
    </Tooltip>
  );
}

export default SkillBadge;
