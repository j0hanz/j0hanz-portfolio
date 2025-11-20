import React, { lazy, Suspense, useRef } from 'react';

import { HiOutlineArrowDownTray, HiOutlineEnvelope } from 'react-icons/hi2';

import { Box, Container, Stack, Typography } from '@mui/material';
import Grid from '@mui/material/Grid';
import { motion, useMotionValue, useSpring, useTransform } from 'motion/react';

import ProfileImage from '@/assets/image_me.webp';
import Button from '@/components/Button';
import ImageModal from '@/components/ImageModal';
import Spinner from '@/components/Spinner';
import {
  useAnimationConfig,
  useAnimationPriority,
  useHover,
  useScrollProgress,
  useToggle,
} from '@/hooks';
import { motionVariants } from '@/utils/motionVariants';

const ModalCv = lazy(() => import('@/components/ModalCv'));

const buttonBaseStyles = {
  minWidth: 180,
  height: 45,
} as const;

interface MagneticWrapperProps {
  disabled: boolean;
  children: React.ReactNode;
}

const MagneticWrapper = ({
  disabled,
  children,
}: MagneticWrapperProps): React.JSX.Element => {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const springX = useSpring(x, { stiffness: 180, damping: 24, mass: 0.8 });
  const springY = useSpring(y, { stiffness: 180, damping: 24, mass: 0.8 });

  const reset = () => {
    x.set(0);
    y.set(0);
  };

  const handlePointerMove = (event: React.PointerEvent<HTMLDivElement>) => {
    if (disabled || !containerRef.current) return;

    const rect = containerRef.current.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    x.set((event.clientX - centerX) * 0.08);
    y.set((event.clientY - centerY) * 0.08);
  };

  const motionStyle = disabled
    ? { display: 'inline-flex' as const }
    : { display: 'inline-flex' as const, x: springX, y: springY };

  return (
    <motion.div
      ref={containerRef}
      style={motionStyle}
      onPointerMove={disabled ? undefined : handlePointerMove}
      onPointerLeave={disabled ? undefined : reset}
      onPointerUp={disabled ? undefined : reset}
      onBlur={disabled ? undefined : reset}
    >
      {children}
    </motion.div>
  );
};

// Rendering hero section
function Hero(): React.JSX.Element {
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
  const { prefersReducedMotion, getTransition } = useAnimationConfig();
  const animationPriority = useAnimationPriority();
  const { value: scrollYProgress } = useScrollProgress();
  const parallaxRange = prefersReducedMotion ? 0 : 80;
  const parallaxY = useTransform(scrollYProgress, [0, 1], [0, parallaxRange]);
  const imageReveal = motionVariants.scroll.scrollFadeUp;
  const textReveal = motionVariants.scroll.scrollFadeUp;
  const disableMagnetic =
    prefersReducedMotion || animationPriority === 'reduced';

  return (
    <Box component="section" id="hero" sx={{ pt: 8 }}>
      <Container maxWidth="lg" sx={{ textAlign: 'center', px: 0, pb: 5 }}>
        <Grid container justifyContent="center" spacing={2}>
          <Grid size={{ md: 5 }}>
            <Box
              component={motion.div}
              initial={imageReveal.initial}
              whileInView={imageReveal.whileInView}
              transition={getTransition('smooth')}
              style={{ y: parallaxY }}
              sx={{ position: 'relative', display: 'inline-flex' }}
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
                sx={{
                  width: { xs: 185, md: 245, lg: 280 },
                  height: { xs: 185, md: 245, lg: 280 },
                  borderRadius: 2,
                  objectFit: 'cover',
                  cursor: 'pointer',
                  mb: { xs: 3, lg: 0 },
                }}
              />
              <Box
                component={motion.div}
                aria-hidden
                initial={false}
                animate={{ opacity: isProfileHovered ? 1 : 0 }}
                transition={getTransition('snappy')}
                sx={{
                  position: 'absolute',
                  inset: 0,
                  borderRadius: 2,
                  bgcolor: 'rgba(0, 0, 0, 0.4)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: 'common.white',
                  letterSpacing: 1,
                  fontSize: '0.9rem',
                  pointerEvents: 'none',
                  textTransform: 'uppercase',
                }}
              >
                Click to enlarge
              </Box>
            </Box>
          </Grid>
          <Grid size="auto" sx={{ textAlign: { xs: 'center', lg: 'left' } }}>
            <Box
              component={motion.div}
              initial={textReveal.initial}
              whileInView={textReveal.whileInView}
              transition={getTransition('smooth')}
            >
              <Typography
                variant="h1"
                component={motion.h1}
                initial={
                  prefersReducedMotion ? undefined : { opacity: 0, y: 24 }
                }
                animate={
                  prefersReducedMotion ? undefined : { opacity: 1, y: 0 }
                }
                transition={getTransition('smooth', {
                  duration: 0.8,
                  delay: 0.1,
                })}
                sx={{
                  background: (theme) => theme.palette.heroGradient,
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                  fontSize: { xs: '2.5rem', sm: '3.2rem' },
                  letterSpacing: { xs: '2px', sm: '3px' },
                  fontWeight: 500,
                  lineHeight: 1.2,
                }}
              >
                {heroName}
              </Typography>
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
                transition={getTransition('smooth', {
                  duration: 1.1,
                  delay: 0.2,
                })}
                sx={{
                  my: 2,
                  fontSize: { xs: '1.2rem', sm: '1.3rem' },
                  letterSpacing: { xs: '0.5px', sm: '2px' },
                  textTransform: 'uppercase',
                  color: 'text.primary',
                  fontWeight: 500,
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: 0.5,
                }}
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
                sx={{ mt: 3 }}
              >
                <MagneticWrapper disabled={disableMagnetic}>
                  <Button
                    variant="contained"
                    onClick={handleModalOpen}
                    startIcon={<HiOutlineArrowDownTray size="1.05rem" />}
                    sx={{
                      ...buttonBaseStyles,
                      bgcolor: 'primary.main',
                    }}
                    motionWhileTap={{ scale: 0.95, rotate: -2 }}
                  >
                    Download CV
                  </Button>
                </MagneticWrapper>
                <MagneticWrapper disabled={disableMagnetic}>
                  <Button
                    variant="contained"
                    href="#contact"
                    startIcon={<HiOutlineEnvelope size="1.05rem" />}
                    sx={{
                      ...buttonBaseStyles,
                      bgcolor: 'neutral.main',
                      '&:hover': { bgcolor: 'neutral.dark' },
                    }}
                    motionWhileTap={{ scale: 0.95, rotate: 2 }}
                  >
                    Get in Touch
                  </Button>
                </MagneticWrapper>
              </Stack>
            </Box>
          </Grid>
        </Grid>
      </Container>
      {showModal && (
        <Suspense fallback={<Spinner />}>
          <ModalCv show={showModal} handleClose={handleModalClose} />
        </Suspense>
      )}
      <ImageModal show={showImageModal} handleClose={handleImageModalClose} />
    </Box>
  );
}

export default Hero;
