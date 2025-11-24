import { useRef } from 'react';

import DownloadRounded from '@mui/icons-material/DownloadRounded';
import EmailRounded from '@mui/icons-material/EmailRounded';
import { Box, Container, Stack, Typography } from '@mui/material';
import Grid from '@mui/material/Grid';
import { motion } from 'motion/react';

import ProfileImage from '@/assets/image_me.webp';
import Button from '@/components/Button';
import ImageModal from '@/components/ImageModal';
import { MagneticWrapper } from '@/components/MagneticWrapper';
import ModalCv from '@/components/ModalCv';
import { StaggerContainer } from '@/components/Motions';
import { Parallax } from '@/components/Parallax';
import { TextReveal } from '@/components/TextReveal';
import { fadeVariants } from '@/config/motion';
import type { CustomButtonProps } from '@/config/types';
import {
  buttonsStackSx,
  contactButtonSx,
  containerSx,
  cursorAnimation,
  cursorStyle,
  cursorTransition,
  downloadButtonSx,
  heroNameStyles,
  overlaySx,
  profileImgSx,
  profileWrapperSx,
  rightGridSx,
  sectionSx,
  subtitleClipPath,
  subtitleSx,
} from '@/features/hero/Hero.styles';
import {
  useAnimationConfig,
  useAnimationPriority,
  useHover,
  useModal,
} from '@/hooks';
import { iconSx } from '@/styles/shared';

const HERO_NAME = 'Linus Johansson';

interface HeroActionConfig {
  key: string;
  label: string;
  buttonProps: Partial<CustomButtonProps>;
}

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
  const { prefersReducedMotion, getTransition, motionViewport } =
    useAnimationConfig();
  const animationPriority = useAnimationPriority();

  const disableMagnetic =
    prefersReducedMotion || animationPriority === 'reduced';

  const heroActions = createHeroActions(cvModal.open);

  return (
    <Box component="section" id="hero" sx={sectionSx}>
      <Container maxWidth="lg" sx={containerSx}>
        <Grid container justifyContent="center" spacing={2}>
          <Grid size={{ md: 5 }}>
            <Parallax offset={30}>
              <Box
                component={motion.div}
                initial={fadeVariants.up.initial}
                whileInView={fadeVariants.up.animate}
                transition={getTransition('easeOut')}
                viewport={motionViewport}
                sx={profileWrapperSx}
              >
                <Box
                  component={motion.img}
                  ref={profileImageRef}
                  src={ProfileImage}
                  alt="Linus Johansson"
                  onClick={imageModal.open}
                  animate={{
                    opacity: isProfileHovered ? 0.8 : 1,
                    scale: isProfileHovered ? 1.02 : 1,
                  }}
                  transition={getTransition('smooth')}
                  sx={profileImgSx}
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
                initial={
                  prefersReducedMotion ? undefined : subtitleClipPath.initial
                }
                animate={
                  prefersReducedMotion ? undefined : subtitleClipPath.animate
                }
                transition={getTransition('easeInOut', {
                  duration: 1.1,
                  delay: 0.2,
                })}
                sx={subtitleSx}
              >
                Junior Full-Stack Developer
                {!prefersReducedMotion && (
                  <motion.span
                    aria-hidden="true"
                    animate={cursorAnimation}
                    transition={cursorTransition}
                    style={cursorStyle}
                  />
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
      {cvModal.isOpen && (
        <ModalCv show={cvModal.isOpen} handleClose={cvModal.close} />
      )}
      {imageModal.isOpen && (
        <ImageModal show={imageModal.isOpen} handleClose={imageModal.close} />
      )}
    </Box>
  );
}

export default Hero;
