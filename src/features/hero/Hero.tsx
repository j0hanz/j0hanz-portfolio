import DownloadRounded from '@mui/icons-material/DownloadRounded';
import EmailRounded from '@mui/icons-material/EmailRounded';
import { Box, Container, Stack, Typography } from '@mui/material';
import Grid from '@mui/material/Grid';
import { motion } from 'motion/react';

import { GlitchText, TextType } from '@/components/animations';
import Button from '@/components/Button';
import Card from '@/components/Card';
import { MagneticWrapper } from '@/components/MagneticWrapper';
import { BlinkingCursor, StaggerContainer } from '@/components/Motions';
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
const HERO_SUBTITLE = 'Junior Full-Stack Developer';

// Hero action button configurations
const HERO_ACTIONS: readonly HeroActionConfig[] = [
  {
    key: 'download-cv',
    label: 'Download CV',
    buttonProps: {
      startIcon: <DownloadRounded sx={iconSx} />,
      sx: downloadButtonSx,
      variant: 'outlined',
      color: 'inherit',
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
        <Grid
          container
          spacing={SPACING.grid}
          alignItems={{ xs: 'center', lg: 'stretch' }}
        >
          <Grid size={{ xs: 12, lg: 5 }}>
            <HeroProfile />
          </Grid>
          <Grid size={{ xs: 12, md: 'grow' }}>
            <Card noContentPadding sx={heroCardSx}>
              <Box sx={heroContentSx}>
                <StaggerContainer stagger={0.1}>
                  {/* Hero Name with GlitchText effect */}
                  <Typography sx={heroNameStyles}>
                    <GlitchText speed={1.1} enableShadows>
                      {HERO_NAME}
                    </GlitchText>
                  </Typography>

                  {/* Hero Subtitle with typewriter + shine effect */}
                  <Typography
                    component={motion.span}
                    {...subtitleMotion}
                    transition={getTransition('easeInOut', {
                      duration: 1.1,
                      delay: 0.2,
                    })}
                    sx={subtitleSx}
                  >
                    <TextType
                      text={HERO_SUBTITLE}
                      typingSpeed={60}
                      initialDelay={800}
                      showCursor={false}
                      loop={false}
                      className="shiny-text"
                    />
                    {!prefersReducedMotion && <BlinkingCursor sx={cursorSx} />}
                  </Typography>

                  {/* CTA Buttons */}
                  <Stack
                    direction={{ xs: 'column', lg: 'row' }}
                    gap={{ xs: 2, sm: 2.5, md: 3 }}
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
