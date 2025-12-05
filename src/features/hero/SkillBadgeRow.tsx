import { Stack, type SxProps, type Theme, Typography } from '@mui/material';
import { motion } from 'motion/react';

import { skillBadgeVariants } from '@/config/motion';
import { SPACING } from '@/config/responsive';
import SkillBadge from '@/features/hero/SkillBadge';
import { useAnimationConfig } from '@/hooks';
import skills from '@/lib/data/skills';

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

function SkillBadgeRow(): React.JSX.Element {
  const { prefersReducedMotion, motionViewport } = useAnimationConfig();

  if (prefersReducedMotion) {
    return (
      <Stack sx={containerSx} alignItems="flex-start">
        <Typography variant="overline" sx={labelSx}>
          Tech Stack
        </Typography>
        <Stack direction="row" sx={stackSx}>
          {skills.map((skill) => (
            <SkillBadge key={skill.label} skill={skill} />
          ))}
        </Stack>
      </Stack>
    );
  }

  return (
    <Stack
      component={motion.div}
      variants={skillBadgeVariants.container}
      initial="initial"
      whileInView="animate"
      viewport={motionViewport}
      sx={containerSx}
      alignItems="flex-start"
    >
      <Typography variant="overline" sx={labelSx}>
        Tech Stack
      </Typography>
      <Stack direction="row" sx={stackSx}>
        {skills.map((skill) => (
          <motion.span key={skill.label} variants={skillBadgeVariants.item}>
            <SkillBadge skill={skill} />
          </motion.span>
        ))}
      </Stack>
    </Stack>
  );
}

export default SkillBadgeRow;
