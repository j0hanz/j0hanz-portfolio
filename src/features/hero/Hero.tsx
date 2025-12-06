import DownloadRounded from '@mui/icons-material/DownloadRounded';
import EmailRounded from '@mui/icons-material/EmailRounded';
import { Box, Container, Stack, Typography } from '@mui/material';
import Grid from '@mui/material/Grid';
import { motion } from 'motion/react';

import Button from '@/components/Button';
import Card from '@/components/Card';
import { MagneticWrapper } from '@/components/MagneticWrapper';
import { BlinkingCursor, StaggerContainer } from '@/components/Motions';
import { TextReveal } from '@/components/TextReveal';
import { SPACING } from '@/config/responsive';
import type { HeroActionConfig } from '@/config/types';
import HeroProfile from '@/features/hero/HeroProfile';
import SkillBadgeRow from '@/features/hero/SkillBadgeRow';
import {
  useAnimationConfig,
  useAnimationPriority,
  useCvModalActions,
  useMobileBreakpoint,
  useMotionVariant,
} from '@/hooks';
import { contactButtonSx, iconSx } from '@/styles/shared';

import {
  buttonsStackSx,
  containerSx,
  cursorSx,
  downloadButtonSx,
  heroCardSx,
  heroContentSx,
  heroNameStyles,
  sectionSx,
  subtitleClipPath,
  subtitleSx,
} from './Hero.styles';

const HERO_NAME = 'Linus Johansson';

// Hero action button configurations
const HERO_ACTIONS: readonly HeroActionConfig[] = [
  {
    key: 'download-cv',
    label: 'Download CV',
    buttonProps: {
      startIcon: <DownloadRounded sx={iconSx} />,
      sx: downloadButtonSx,
      variant: 'contained',
      color: 'primary',
      motionWhileTap: { scale: 0.95, rotate: -2 },
    },
  },
  {
    key: 'contact',
    label: 'Get in Touch',
    buttonProps: {
      href: '#contact',
      startIcon: <EmailRounded sx={iconSx} />,
      sx: contactButtonSx,
      variant: 'text',
      color: 'inherit',
      motionWhileTap: { scale: 0.95, rotate: 2 },
    },
  },
] as const;

function Hero(): React.JSX.Element {
  const { openCvModal } = useCvModalActions();
  const { prefersReducedMotion, getTransition } = useAnimationConfig();
  const animationPriority = useAnimationPriority();
  const isMobile = useMobileBreakpoint('md');
  const disableMagnetic =
    prefersReducedMotion || animationPriority === 'reduced';
  const subtitleMotion = useMotionVariant(subtitleClipPath, {
    initial: 'initial',
    animate: 'animate',
  });

  return (
    <Box component="section" id="hero" sx={sectionSx}>
      <Container maxWidth={false} sx={containerSx}>
        <Grid container spacing={SPACING.grid} alignItems="center">
          <Grid size={{ xs: 12, lg: 'auto' }}>
            <HeroProfile />
          </Grid>
          <Grid size={{ xs: 12, md: 'grow' }}>
            <Card noContentPadding sx={heroCardSx}>
              <Box sx={heroContentSx}>
                <StaggerContainer stagger={0.1}>
                  <TextReveal
                    text={HERO_NAME}
                    as="h1"
                    splitBy="char"
                    sx={{
                      '& span': {
                        background: (theme) => theme.palette.heroGradient,
                        WebkitBackgroundClip: 'text',
                        WebkitTextFillColor: 'transparent',
                      },
                      ...heroNameStyles,
                    }}
                  />
                  <Typography
                    variant="h2"
                    component={motion.h2}
                    {...subtitleMotion}
                    transition={getTransition('easeInOut', {
                      duration: 1.1,
                      delay: 0.2,
                    })}
                    sx={subtitleSx}
                  >
                    Junior Full-Stack Developer
                    {!prefersReducedMotion && <BlinkingCursor sx={cursorSx} />}
                  </Typography>
                  <Stack
                    direction="column"
                    spacing={2}
                    alignItems="flex-start"
                    sx={buttonsStackSx}
                  >
                    {HERO_ACTIONS.map((action) => {
                      const isDownload = action.key === 'download-cv';
                      const button = (
                        <Button
                          variant="contained"
                          {...action.buttonProps}
                          onClick={isDownload ? openCvModal : undefined}
                        >
                          {action.label}
                        </Button>
                      );

                      return isMobile ? (
                        <Box key={action.key}>{button}</Box>
                      ) : (
                        <MagneticWrapper
                          key={action.key}
                          disabled={disableMagnetic}
                        >
                          {button}
                        </MagneticWrapper>
                      );
                    })}
                  </Stack>
                  <SkillBadgeRow />
                </StaggerContainer>
              </Box>
            </Card>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
}

export default Hero;
