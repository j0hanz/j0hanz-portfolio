import type { ReactNode } from 'react';
import { useRef } from 'react';

import { Box, Stack, type SxProps, type Theme } from '@mui/material';
import { motion } from 'motion/react';

import { BlurText } from '@/components/animations';
import { skillBadgeVariants, viewportPresets } from '@/config/motion';
import { SPACING } from '@/config/responsive';
import type { ElementRef } from '@/config/types';
import SkillBadge from '@/features/hero/SkillBadge';
import { useAnimationConfig, useInView } from '@/hooks';
import { skills } from '@/lib/data/skills';

const containerSx: SxProps<Theme> = {
  mt: { xs: 3, sm: 3.5, md: 4, lg: 5 },
  width: 1, // = 100%
};

const labelSx: SxProps<Theme> = {
  color: 'text.secondary',
  letterSpacing: { xs: 1.5, sm: 1.75, md: 2, lg: 2.5 },
  mb: { xs: 1, sm: 1.25, md: 1.5, lg: 2 },
  fontSize: (theme) => theme.typography.caption.fontSize,
};

const stackSx: SxProps<Theme> = {
  gap: SPACING.stack,
  flexWrap: 'wrap',
  justifyContent: 'flex-start',
};

// Badge wrapper - applies animation variants when motion is enabled
function BadgeWrapper({
  children,
  animate,
}: {
  children: ReactNode;
  animate: boolean;
}): React.JSX.Element {
  if (!animate) return <>{children}</>;
  return (
    <Box component={motion.span} variants={skillBadgeVariants.item}>
      {children}
    </Box>
  );
}

// Shared content - DRY rendering of badge list
function BadgeList({
  animate,
  isInView,
}: {
  animate: boolean;
  isInView: boolean;
}): React.JSX.Element {
  const badgeContent = skills.map((skill) => (
    <BadgeWrapper key={skill.label} animate={animate}>
      <SkillBadge skill={skill} />
    </BadgeWrapper>
  ));

  return (
    <>
      <BlurText
        text="Tech Stack"
        animateBy="letters"
        delay={40}
        direction="top"
        sx={labelSx}
      />
      {animate ? (
        <Box
          component={motion.div}
          variants={skillBadgeVariants.container}
          initial="initial"
          animate={isInView ? 'animate' : 'initial'}
          sx={{ display: 'flex', flexDirection: 'row', ...stackSx }}
        >
          {badgeContent}
        </Box>
      ) : (
        <Stack direction="row" sx={stackSx}>
          {badgeContent}
        </Stack>
      )}
    </>
  );
}

function SkillBadgeRow(): React.JSX.Element {
  const containerRef = useRef<HTMLDivElement>(null);
  const { prefersReducedMotion } = useAnimationConfig();
  const isInView = useInView(
    containerRef as ElementRef,
    viewportPresets.section
  );

  // Static version for reduced motion - no animation props
  if (prefersReducedMotion) {
    return (
      <Stack sx={containerSx} alignItems="flex-start">
        <BadgeList animate={false} isInView={false} />
      </Stack>
    );
  }

  // Animated version - badge stagger handled inside BadgeList
  return (
    <Stack ref={containerRef} sx={containerSx} alignItems="flex-start">
      <BadgeList animate isInView={isInView} />
    </Stack>
  );
}

export default SkillBadgeRow;
