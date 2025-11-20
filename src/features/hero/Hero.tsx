import React, { lazy, Suspense } from 'react';

import { HiOutlineArrowDownTray, HiOutlineEnvelope } from 'react-icons/hi2';

import { Box, Container, Stack, Typography } from '@mui/material';
import Grid from '@mui/material/Grid';

import ProfileImage from '@/assets/image_me.webp';
import Button from '@/components/Button';
import ImageModal from '@/components/ImageModal';
import { SlideFromSide } from '@/components/Motions';
import Spinner from '@/components/Spinner';
import { useToggle } from '@/hooks';

const ModalCv = lazy(() => import('@/components/ModalCv'));

const buttonBaseStyles = {
  minWidth: 180,
  height: 45,
} as const;

// Rendering hero section
function Hero(): React.JSX.Element {
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

  return (
    <Box component="section" id="hero" sx={{ pt: 8 }}>
      <Container maxWidth="lg" sx={{ textAlign: 'center', px: 0, pb: 5 }}>
        <Grid container justifyContent="center" spacing={2}>
          <Grid size={{ md: 5 }}>
            <SlideFromSide from="left">
              <Box
                component="img"
                src={ProfileImage}
                alt="Linus Johansson"
                onClick={handleImageModalOpen}
                sx={{
                  width: { xs: 185, md: 245, lg: 280 },
                  height: { xs: 185, md: 245, lg: 280 },
                  borderRadius: 2,
                  objectFit: 'cover',
                  transition: (theme) =>
                    theme.transitions.create('filter', {
                      duration: theme.transitions.duration.standard,
                    }),
                  cursor: 'pointer',
                  mb: { xs: 3, lg: 0 },
                  '&:hover': {
                    filter: 'brightness(0.8)',
                  },
                }}
              />
            </SlideFromSide>
          </Grid>
          <Grid size="auto" sx={{ textAlign: { xs: 'center', lg: 'left' } }}>
            <SlideFromSide from="right">
              <Typography
                variant="h1"
                component="h1"
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
                Linus Johansson
              </Typography>
              <Typography
                variant="h2"
                component="h2"
                sx={{
                  my: 2,
                  fontSize: { xs: '1.2rem', sm: '1.3rem' },
                  letterSpacing: { xs: '0.5px', sm: '2px' },
                  textTransform: 'uppercase',
                  color: 'text.primary',
                  fontWeight: 500,
                }}
              >
                Junior Full-Stack Developer
              </Typography>
              <Stack
                direction="column"
                spacing={2}
                alignItems={{ xs: 'center', lg: 'flex-start' }}
                sx={{ mt: 3 }}
              >
                <Button
                  variant="contained"
                  onClick={handleModalOpen}
                  startIcon={<HiOutlineArrowDownTray size="1.05rem" />}
                  sx={{
                    ...buttonBaseStyles,
                    bgcolor: 'primary.main',
                    '&:hover': { bgcolor: 'primary.dark' },
                  }}
                >
                  Download CV
                </Button>
                <Button
                  variant="contained"
                  href="#contact"
                  startIcon={<HiOutlineEnvelope size="1.05rem" />}
                  sx={{
                    ...buttonBaseStyles,
                    bgcolor: 'neutral.main',
                    '&:hover': { bgcolor: 'neutral.dark' },
                  }}
                >
                  Get in Touch
                </Button>
              </Stack>
            </SlideFromSide>
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
