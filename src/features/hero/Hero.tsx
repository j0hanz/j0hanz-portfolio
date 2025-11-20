import React from 'react';

import { HiOutlineArrowDownTray, HiOutlineEnvelope } from 'react-icons/hi2';

import { Box, Container, Grid, Stack, Typography } from '@mui/material';

import ProfileImage from '@/assets/image_me.webp';
import Button from '@/components/Button';
import ImageModal from '@/components/ImageModal';
import ModalCv from '@/components/ModalCv';
import { SlideFromSide } from '@/components/Motions';
import { useToggle } from '@/hooks';

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
    <Box component="section" id="hero" sx={{ pt: '4rem' }}>
      <Container sx={{ textAlign: 'center', px: 0, pb: '2.5rem' }}>
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
                  borderRadius: '10px',
                  objectFit: 'cover',
                  transition: 'all 0.3s ease',
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
                sx={{
                  background:
                    'linear-gradient(180deg, #017bb5 25%, #026a99 50%, #3a8cc1 75%)',
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
                alignItems={{ xs: 'center', lg: 'flex-start' }}
                sx={{ mt: 3 }}
              >
                <Button
                  onClick={handleModalOpen}
                  sx={{
                    my: 4,
                    width: 180,
                    height: 45,
                    bgcolor: '#0067dd',
                    '&:hover': { bgcolor: '#004797' },
                  }}
                  icon={
                    <HiOutlineArrowDownTray
                      size="1.05rem"
                      style={{ color: '#f5f4f4' }}
                    />
                  }
                  text="Download CV"
                />
                <Button
                  href="#contact"
                  sx={{
                    width: 180,
                    height: 45,
                    bgcolor: '#313131',
                    '&:hover': { bgcolor: '#242424' },
                  }}
                  icon={
                    <HiOutlineEnvelope
                      size="1.05rem"
                      style={{ color: '#f5f4f4' }}
                    />
                  }
                  text="Get in Touch"
                />
              </Stack>
            </SlideFromSide>
          </Grid>
        </Grid>
      </Container>
      <ModalCv show={showModal} handleClose={handleModalClose} />
      <ImageModal show={showImageModal} handleClose={handleImageModalClose} />
    </Box>
  );
}

export default Hero;
