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
import { GRID_COLUMNS, RESPONSIVE_SPACING } from '@/config/responsive';
import type { HeroActionConfig } from '@/config/types';
import SkillBadgeRow from '@/features/hero/SkillBadgeRow';
import {
  useAnimationConfig,
  useAnimationPriority,
  useCvModalActions,
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
function Hero(): React.JSX.Element {
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

  const heroActions = createHeroActions(openCvModal);

  const profileMotion = useMotionVariant(fadeVariants.up);
  const subtitleMotion = useMotionVariant(subtitleClipPath, {
    initial: 'initial',
    animate: 'animate',
  });

  return (
    <Box component="section" id="hero" sx={sectionSx}>
      <Container maxWidth="lg" sx={containerSx}>
        <Grid container spacing={RESPONSIVE_SPACING.grid} alignItems="center">
          <Grid size={GRID_COLUMNS.heroImage}>
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
          <Grid size={GRID_COLUMNS.heroContent}>
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
                    {heroActions.map(({ key, label, buttonProps }) => (
                      <MagneticWrapper key={key} disabled={disableMagnetic}>
                        <Button variant="contained" {...buttonProps}>
                          {label}
                        </Button>
                      </MagneticWrapper>
                    ))}
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
