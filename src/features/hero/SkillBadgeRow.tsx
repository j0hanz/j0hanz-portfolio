import { Stack, type SxProps, type Theme, Typography } from '@mui/material';
import { motion, type Variants } from 'motion/react';

import SkillBadge from '@/features/hero/SkillBadge';
import { useAnimationConfig } from '@/hooks';
import skills from '@/lib/data/skills';

const containerSx: SxProps<Theme> = {
  mt: 4,
  width: '100%',
};

const labelSx: SxProps<Theme> = {
  color: 'text.secondary',
  letterSpacing: 2,
  mb: 1.5,
  fontSize: '0.65rem',
};

const stackSx: SxProps<Theme> = {
  gap: { xs: 1.5, md: 2 },
  flexWrap: 'wrap',
  justifyContent: 'flex-start',
};

// Stagger container variants
const containerVariants: Variants = {
  initial: {},
  animate: {
    transition: {
      staggerChildren: 0.04,
      delayChildren: 0.3,
    },
  },
};

// Item variants for stagger effect
const itemVariants: Variants = {
  initial: { opacity: 0, y: 15, scale: 0.9 },
  animate: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: {
      type: 'spring',
      stiffness: 300,
      damping: 24,
    },
  },
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
      variants={containerVariants}
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
          <motion.span key={skill.label} variants={itemVariants}>
            <SkillBadge skill={skill} />
          </motion.span>
        ))}
      </Stack>
    </Stack>
  );
}

export default SkillBadgeRow;
