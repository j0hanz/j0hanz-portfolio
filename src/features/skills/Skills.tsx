import type { JSX } from 'react';

import MenuBookTwoTone from '@mui/icons-material/MenuBookTwoTone';
import SettingsTwoTone from '@mui/icons-material/SettingsTwoTone';
import { Box, Stack, type SxProps, type Theme } from '@mui/material';
import Grid from '@mui/material/Grid';
import { motion } from 'motion/react';

import Card from '@/components/Card';
import SectionContainer from '@/components/SectionContainer';
import { TextReveal } from '@/components/TextReveal';
import { createStaggerContainer, staggerItemVariant } from '@/config/motion';
import { useAnimationConfig, usePulse } from '@/hooks';
import skills from '@/lib/data/skills';
import { sectionSpacingSx, SKEW_TRANSFORM } from '@/styles/shared';

const gridItemSx: SxProps<Theme> = {
  textAlign: 'center',
  mb: 4,
};

const cardSx: SxProps<Theme> = {
  position: 'relative',
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  justifyContent: 'space-between',
  mt: 0.5,
};

const skillIconSx: SxProps<Theme> = {
  fontSize: (theme) => theme.typography.h2.fontSize,
  color: 'primary.main',
  mb: 0.7,
};

const learningStackSx: SxProps<Theme> = {
  position: 'absolute',
  bottom: 0,
  left: '50%',
  transform: 'translateX(-50%)',
  bgcolor: 'neutral.dark',
  color: 'common.white',
  width: 1,
  height: (theme) => theme.spacing(1.75),
  borderRadius: '0 0 10px 10px',
  fontSize: (theme) => theme.typography.caption.fontSize,
};

const learningIconSx: SxProps<Theme> = {
  mr: 0.35,
  transform: SKEW_TRANSFORM,
};

const learningTextSx: SxProps<Theme> = {
  transform: SKEW_TRANSFORM,
};

function LearningBadge(): JSX.Element {
  const pulseScale = usePulse(1, 1.05, 2500);

  return (
    <motion.div style={{ scale: pulseScale }}>
      <Stack
        direction="row"
        alignItems="center"
        justifyContent="center"
        sx={learningStackSx}
      >
        <MenuBookTwoTone sx={learningIconSx} />
        <Box component="span" sx={learningTextSx}>
          Learning
        </Box>
      </Stack>
    </motion.div>
  );
}

function Skills(): JSX.Element {
  const { motionViewport, prefersReducedMotion } = useAnimationConfig();
  const gridMotionProps = prefersReducedMotion
    ? {}
    : {
        variants: createStaggerContainer(0.08, 0.1),
        initial: 'initial',
        whileInView: 'animate',
        viewport: motionViewport,
      };
  const gridItemMotionProps = prefersReducedMotion
    ? {}
    : { variants: staggerItemVariant };

  return (
    <SectionContainer
      id="skills"
      title={<TextReveal text="Skills" as="span" />}
      icon={SettingsTwoTone}
      sx={sectionSpacingSx}
    >
      <Grid
        component={prefersReducedMotion ? 'div' : motion.div}
        {...gridMotionProps}
        container
        spacing={{ xs: 2, sm: 2, md: 2 }}
      >
        {skills.map((skill) => (
          <Grid
            key={skill.label}
            component={prefersReducedMotion ? 'div' : motion.div}
            {...gridItemMotionProps}
            size={{ xs: 6, sm: 6, md: 3 }}
            sx={gridItemSx}
          >
            <Card title={skill.label} sx={cardSx}>
              <Box component={skill.icon} sx={skillIconSx} />
              {skill.learning && <LearningBadge />}
            </Card>
          </Grid>
        ))}
      </Grid>
    </SectionContainer>
  );
}

export default Skills;
