import React, { useRef } from 'react';

import DownloadRounded from '@mui/icons-material/DownloadRounded';
import EmailRounded from '@mui/icons-material/EmailRounded';
import {
  alpha,
  Box,
  Container,
  Stack,
  type SxProps,
  type Theme,
  Typography,
  useTheme,
} from '@mui/material';
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
import {
  useAnimationConfig,
  useAnimationPriority,
  useHover,
  useToggle,
} from '@/hooks';

const buttonBaseStyles = {
  minWidth: 180,
  height: 45,
} as const;

const sectionSx: SxProps<Theme> = {
  pt: 8,
};

const containerSx: SxProps<Theme> = {
  textAlign: 'center',
  px: 0,
  pb: 5,
};

const profileWrapperSx: SxProps<Theme> = {
  position: 'relative',
  display: 'inline-flex',
};

const profileImgSx: SxProps<Theme> = {
  width: { xs: 185, md: 245, lg: 280 },
  height: { xs: 185, md: 245, lg: 280 },
  borderRadius: 2,
  objectFit: 'cover',
  cursor: 'pointer',
  mb: { xs: 3, lg: 0 },
};

const overlaySx: SxProps<Theme> = {
  position: 'absolute',
  inset: 0,
  borderRadius: 2,
  bgcolor: (theme) => alpha(theme.palette.common.black, 0.4),
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  color: 'common.white',
  letterSpacing: 1,
  fontSize: '0.9rem',
  pointerEvents: 'none',
  textTransform: 'uppercase',
};

const rightGridSx: SxProps<Theme> = {
  textAlign: { xs: 'center', lg: 'left' },
};

const subtitleSx: SxProps<Theme> = {
  my: 2,
  fontSize: { xs: '1.2rem', sm: '1.3rem' },
  letterSpacing: { xs: '0.5px', sm: '2px' },
  textTransform: 'uppercase',
  color: 'text.primary',
  fontWeight: 500,
  display: 'inline-flex',
  alignItems: 'center',
  gap: 0.5,
};

const buttonsStackSx: SxProps<Theme> = {
  mt: 3,
};

const downloadButtonSx: SxProps<Theme> = {
  ...buttonBaseStyles,
  bgcolor: 'primary.main',
};

const contactButtonSx: SxProps<Theme> = {
  ...buttonBaseStyles,
  bgcolor: 'neutral.main',
  '&:hover': { bgcolor: 'neutral.dark' },
};

const iconSx: SxProps<Theme> = {
  fontSize: '1.05rem',
};

// Rendering hero section
function Hero(): React.JSX.Element {
  const theme = useTheme();
  const heroName = 'Linus Johansson';
  const {
    value: showModal,
    setTrue: handleModalOpen,
    setFalse: handleModalClose,
  } = useToggle(false);
  const {
    value: showImageModal,
    setTrue: handleImageModalOpen,
    setFalse: handleImageModalClose,
  } = useToggle(false);
  const profileImageRef = useRef<HTMLImageElement | null>(null);
  const isProfileHovered = useHover(profileImageRef);
  const { prefersReducedMotion, getTransition, motionViewport } =
    useAnimationConfig();
  const animationPriority = useAnimationPriority();

  const disableMagnetic =
    prefersReducedMotion || animationPriority === 'reduced';

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
                  onClick={handleImageModalOpen}
                  animate={{
                    filter: isProfileHovered
                      ? 'brightness(0.8)'
                      : 'brightness(1)',
                  }}
                  transition={getTransition('smooth')}
                  sx={profileImgSx}
                />
                <Box
                  component={motion.div}
                  aria-hidden
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
                text={heroName}
                as="h1"
                style={{
                  background: theme.palette.heroGradient,
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                  fontSize: 'clamp(2.5rem, 5vw, 3.2rem)',
                  letterSpacing: '2px',
                  fontWeight: 500,
                  lineHeight: 1.2,
                  justifyContent: 'center',
                }}
              />

              <Typography
                variant="h2"
                component={motion.h2}
                initial={
                  prefersReducedMotion
                    ? undefined
                    : { clipPath: 'inset(0 100% 0 0)' }
                }
                animate={
                  prefersReducedMotion
                    ? undefined
                    : { clipPath: 'inset(0 0% 0 0)' }
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
                    aria-hidden
                    animate={{ opacity: [0, 1, 0] }}
                    transition={{ duration: 0.9, repeat: Infinity }}
                    style={{
                      display: 'inline-block',
                      width: 2,
                      height: '1.3em',
                      backgroundColor: 'currentColor',
                      marginLeft: '0.35rem',
                    }}
                  />
                )}
              </Typography>
              <Stack
                direction="column"
                spacing={2}
                alignItems={{ xs: 'center', lg: 'flex-start' }}
                sx={buttonsStackSx}
              >
                <MagneticWrapper disabled={disableMagnetic}>
                  <Button
                    variant="contained"
                    onClick={handleModalOpen}
                    startIcon={<DownloadRounded sx={iconSx} />}
                    sx={downloadButtonSx}
                    motionWhileTap={{ scale: 0.95, rotate: -2 }}
                  >
                    Download CV
                  </Button>
                </MagneticWrapper>
                <MagneticWrapper disabled={disableMagnetic}>
                  <Button
                    variant="contained"
                    href="#contact"
                    startIcon={<EmailRounded sx={iconSx} />}
                    sx={contactButtonSx}
                    motionWhileTap={{ scale: 0.95, rotate: 2 }}
                  >
                    Get in Touch
                  </Button>
                </MagneticWrapper>
              </Stack>
            </StaggerContainer>
          </Grid>
        </Grid>
      </Container>
      {showModal && <ModalCv show={showModal} handleClose={handleModalClose} />}
      <ImageModal show={showImageModal} handleClose={handleImageModalClose} />
    </Box>
  );
}

export default Hero;
