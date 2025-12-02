import { useRef } from 'react';

import DownloadRounded from '@mui/icons-material/DownloadRounded';
import EmailRounded from '@mui/icons-material/EmailRounded';
import { Box, Container, Stack, Typography } from '@mui/material';
import Grid from '@mui/material/Grid';
import { AnimatePresence, motion } from 'motion/react';

import ProfileImage from '@/assets/image_me.webp';
import Button from '@/components/Button';
import Card from '@/components/Card';
import ImageModal from '@/components/ImageModal';
import { MagneticWrapper } from '@/components/MagneticWrapper';
import { BlinkingCursor, StaggerContainer } from '@/components/Motions';
import { Parallax } from '@/components/Parallax';
import { ProfileSkeleton } from '@/components/Skeletons';
import { TextReveal } from '@/components/TextReveal';
import { fadeVariants } from '@/config/motion';
import { SPACING } from '@/config/responsive';
import type { HeroActionConfig } from '@/config/types';
import SkillBadgeRow from '@/features/hero/SkillBadgeRow';
import {
  useAnimationConfig,
  useAnimationPriority,
  useCvModalActions,
  useHover,
  useImageLoading,
  useMobileBreakpoint,
  useModal,
  useMotionVariant,
} from '@/hooks';
import { contactButtonSx, iconSx } from '@/styles/shared';

import {
  buttonsStackSx,
  containerSx,
  cursorStyle,
  downloadButtonSx,
  heroCardSx,
  heroContentSx,
  heroNameStyles,
  overlaySx,
  profileImgSx,
  profileWrapperSx,
  sectionSx,
  subtitleClipPath,
  subtitleSx,
} from './Hero.styles';

const HERO_NAME = 'Linus Johansson';

// Hero action button configurations - static array for consistent rendering
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

// Rendering hero section
function Hero() {
  const { openCvModal } = useCvModalActions();
  const imageModal = useModal(false);
  const profileImageRef = useRef<HTMLImageElement | null>(null);
  const isProfileHovered = useHover(profileImageRef);
  const { prefersReducedMotion, getTransition } = useAnimationConfig();
  const animationPriority = useAnimationPriority();
  const { isLoaded: isProfileLoaded, handleLoad: handleProfileLoad } =
    useImageLoading();

  const disableMagnetic =
    prefersReducedMotion || animationPriority === 'reduced';
  const isMobile = useMobileBreakpoint('md');
  const profileMotion = useMotionVariant(fadeVariants.up);
  const subtitleMotion = useMotionVariant(subtitleClipPath, {
    initial: 'initial',
    animate: 'animate',
  });

  // Handle image keyboard interaction
  const handleImageKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      imageModal.open();
    }
  };

  return (
    <Box component="section" id="hero" sx={sectionSx}>
      <Container maxWidth="lg" sx={containerSx}>
        <Grid container spacing={SPACING.grid} alignItems="center">
          <Grid size={{ xs: 12, md: 'auto' }}>
            <Parallax offset={30}>
              <Box
                component={motion.div}
                {...profileMotion}
                transition={getTransition('easeOut')}
                sx={profileWrapperSx}
              >
                {!isProfileLoaded && <ProfileSkeleton />}
                <Box
                  component={motion.img}
                  ref={profileImageRef}
                  src={ProfileImage}
                  alt="Linus Johansson"
                  role="button"
                  tabIndex={0}
                  aria-label="View enlarged profile photo"
                  onClick={imageModal.open}
                  onKeyDown={handleImageKeyDown}
                  onLoad={handleProfileLoad}
                  animate={{
                    opacity: isProfileLoaded ? (isProfileHovered ? 0.8 : 1) : 0,
                    scale: isProfileHovered ? 1.02 : 1,
                  }}
                  transition={getTransition('smooth')}
                  sx={{ ...profileImgSx, cursor: 'pointer' }}
                />
                <Box
                  component={motion.div}
                  aria-hidden="true"
                  initial={false}
                  animate={{ opacity: isProfileHovered ? 1 : 0 }}
                  transition={getTransition('springSmooth')}
                  sx={overlaySx}
                >
                  Click to enlarge
                </Box>
              </Box>
            </Parallax>
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
                    {!prefersReducedMotion && (
                      <BlinkingCursor style={cursorStyle} />
                    )}
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

                      // Only wrap with MagneticWrapper on desktop
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
      <AnimatePresence initial={false} mode="wait">
        {imageModal.isOpen && (
          <ImageModal
            key="hero-image-modal"
            open={imageModal.isOpen}
            onClose={imageModal.close}
          />
        )}
      </AnimatePresence>
    </Box>
  );
}

export default Hero;
