import { useRef } from 'react';

import DownloadRounded from '@mui/icons-material/DownloadRounded';
import EmailRounded from '@mui/icons-material/EmailRounded';
import { Box, Container, Stack, Typography } from '@mui/material';
import Grid from '@mui/material/Grid';
import { AnimatePresence, motion } from 'motion/react';

import ProfileImage from '@/assets/image_me.webp';
import Button from '@/components/Button';
import CvModalPortal from '@/components/CvModalPortal';
import ImageModal from '@/components/ImageModal';
import { MagneticWrapper } from '@/components/MagneticWrapper';
import { BlinkingCursor, StaggerContainer } from '@/components/Motions';
import { Parallax } from '@/components/Parallax';
import { ProfileSkeleton } from '@/components/Skeletons';
import { TextReveal } from '@/components/TextReveal';
import { fadeVariants } from '@/config/motion';
import type { HeroActionConfig } from '@/config/types';
import {
  useAnimationConfig,
  useAnimationPriority,
  useHover,
  useImageLoading,
  useModal,
  useMotionVariant,
} from '@/hooks';
import { contactButtonSx, iconSx } from '@/styles/shared';

import {
  buttonsStackSx,
  containerSx,
  cursorStyle,
  downloadButtonSx,
  heroNameStyles,
  overlaySx,
  profileImgSx,
  profileWrapperSx,
  rightGridSx,
  sectionSx,
  subtitleClipPath,
  subtitleSx,
} from './Hero.styles';

const HERO_NAME = 'Linus Johansson';

// Hero action button configurations
const createHeroActions = (
  onCvClick: () => void
): readonly HeroActionConfig[] =>
  [
    {
      key: 'download-cv',
      label: 'Download CV',
      buttonProps: {
        onClick: onCvClick,
        startIcon: <DownloadRounded sx={iconSx} />,
        sx: downloadButtonSx,
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
        motionWhileTap: { scale: 0.95, rotate: 2 },
      },
    },
  ] as const;

// Rendering hero section
function Hero(): React.JSX.Element {
  const cvModal = useModal(false);
  const imageModal = useModal(false);
  const profileImageRef = useRef<HTMLImageElement | null>(null);
  const isProfileHovered = useHover(profileImageRef);
  const { prefersReducedMotion, getTransition } = useAnimationConfig();
  const animationPriority = useAnimationPriority();
  const { isLoaded: isProfileLoaded, handleLoad: handleProfileLoad } =
    useImageLoading();

  const disableMagnetic =
    prefersReducedMotion || animationPriority === 'reduced';

  const heroActions = createHeroActions(cvModal.open);

  const profileMotion = useMotionVariant(fadeVariants.up);
  const subtitleMotion = useMotionVariant(subtitleClipPath, {
    initial: 'initial',
    animate: 'animate',
  });

  return (
    <Box component="section" id="hero" sx={sectionSx}>
      <Container maxWidth="lg" sx={containerSx}>
        <Grid container justifyContent="center" spacing={2}>
          <Grid size={{ md: 5 }}>
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
                  onKeyDown={(e: React.KeyboardEvent) => {
                    if (e.key === 'Enter' || e.key === ' ') {
                      e.preventDefault();
                      imageModal.open();
                    }
                  }}
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
          <Grid size="auto" sx={rightGridSx}>
            <StaggerContainer stagger={0.1}>
              <TextReveal
                text={HERO_NAME}
                as="h1"
                sx={{
                  background: (theme) => theme.palette.heroGradient,
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
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
                alignItems={{ xs: 'center', lg: 'flex-start' }}
                sx={buttonsStackSx}
              >
                {heroActions.map(({ key, label, buttonProps }) => (
                  <MagneticWrapper key={key} disabled={disableMagnetic}>
                    <Button variant="contained" {...buttonProps}>
                      {label}
                    </Button>
                  </MagneticWrapper>
                ))}
              </Stack>
            </StaggerContainer>
          </Grid>
        </Grid>
      </Container>
      <CvModalPortal isOpen={cvModal.isOpen} onClose={cvModal.close} />
      <AnimatePresence initial={false} mode="wait">
        {imageModal.isOpen && (
          <ImageModal
            key="hero-image-modal"
            show={imageModal.isOpen}
            handleClose={imageModal.close}
          />
        )}
      </AnimatePresence>
    </Box>
  );
}

export default Hero;
