import type { ReactNode } from 'react';
import { useRef } from 'react';

import { Box, Stack, type SxProps, type Theme } from '@mui/material';
import { motion } from 'motion/react';

import { ShinyText } from '@/components/animations';
import { skillBadgeVariants, viewportPresets } from '@/config/motion';
import { SPACING } from '@/config/responsive';
import type { ElementRef } from '@/config/types';
import { SkillBadge } from '@/features/hero/SkillBadge';
import { useAnimationConfig, useInView } from '@/hooks';
import { skills } from '@/lib/data/skills';

const containerSx: SxProps<Theme> = {
  mt: { xs: 3, sm: 3.5, md: 4, lg: 5 },
  width: 1, // = 100%
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
  disableShiny,
}: {
  animate: boolean;
  isInView: boolean;
  disableShiny: boolean;
}): React.JSX.Element {
  const badgeContent = skills.map((skill) => (
    <BadgeWrapper key={skill.label} animate={animate}>
      <SkillBadge skill={skill} />
    </BadgeWrapper>
  ));

  return (
    <>
      <ShinyText
        text="Tech Stack"
        speed={6}
        disabled={disableShiny}
        className="skill-badge-label"
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
        <BadgeList animate={false} isInView={false} disableShiny />
      </Stack>
    );
  }

  // Animated version - badge stagger handled inside BadgeList
  return (
    <Stack ref={containerRef} sx={containerSx} alignItems="flex-start">
      <BadgeList animate isInView={isInView} disableShiny={false} />
    </Stack>
  );
}

export { SkillBadgeRow };
