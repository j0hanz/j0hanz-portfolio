import React, { useRef } from 'react';

import DownloadRounded from '@mui/icons-material/DownloadRounded';
import EmailRounded from '@mui/icons-material/EmailRounded';
import { Box, Container, Stack, Typography, useTheme } from '@mui/material';
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
  buttonsStackSx,
  contactButtonSx,
  containerSx,
  cursorAnimation,
  cursorStyle,
  cursorTransition,
  downloadButtonSx,
  heroNameStyles,
  iconSx,
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
  useToggle,
} from '@/hooks';

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
                    aria-hidden
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
