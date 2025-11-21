import React from 'react';

import { MenuBookTwoTone, SettingsTwoTone } from '@mui/icons-material';
import { Box, Stack } from '@mui/material';
import Grid from '@mui/material/Grid';
import { motion } from 'motion/react';

import Card from '@/components/Card';
import SectionContainer from '@/components/SectionContainer';
import { TextReveal } from '@/components/TextReveal';
import { useAnimationConfig } from '@/hooks';
import skills from '@/lib/data/skills';
import {
  createStaggerContainer,
  staggerItemVariant,
} from '@/utils/motionVariants';

// Rendering skills section
function Skills(): React.JSX.Element {
  const { motionViewport } = useAnimationConfig();

  return (
    <SectionContainer
      id="skills"
      title={<TextReveal text="Skills" as="span" />}
      icon={SettingsTwoTone}
      sx={{
        px: 0,
        pb: 5,
      }}
    >
      <Grid
        component={motion.div}
        variants={createStaggerContainer(0.08, 0.1)}
        initial="initial"
        whileInView="animate"
        viewport={motionViewport}
        container
        spacing={{ xs: 2, sm: 2, md: 2 }}
      >
        {skills.map((skill) => (
          <Grid
            key={skill.label}
            component={motion.div}
            variants={staggerItemVariant}
            size={{ xs: 6, sm: 6, md: 3 }}
            sx={{ textAlign: 'center', mb: 4 }}
          >
            <Card
              title={skill.label}
              sx={{
                position: 'relative',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'space-between',
                mt: 0.5,
              }}
            >
              <Box
                component={skill.icon}
                sx={{
                  fontSize: '4rem',
                  color: 'primary.main',
                  mb: 0.7,
                }}
              />
              {skill.learning && (
                <Stack
                  direction="row"
                  alignItems="center"
                  justifyContent="center"
                  sx={{
                    position: 'absolute',
                    bottom: 0,
                    left: '50%',
                    transform: 'translateX(-50%)',
                    bgcolor: 'neutral.dark',
                    color: 'common.white',
                    width: 1,
                    height: '1.4rem',
                    borderRadius: '0 0 10px 10px',
                    fontSize: '0.8rem',
                  }}
                >
                  <MenuBookTwoTone
                    sx={{
                      mr: 0.35,
                      transform: 'skew(-5deg)',
                    }}
                  />
                  <Box component="span" sx={{ transform: 'skew(-5deg)' }}>
                    Learning
                  </Box>
                </Stack>
              )}
            </Card>
          </Grid>
        ))}
      </Grid>
    </SectionContainer>
  );
}

export default Skills;
