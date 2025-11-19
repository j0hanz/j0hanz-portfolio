import React from 'react';

import { HiOutlineArrowDownTray, HiOutlineEnvelope } from 'react-icons/hi2';

import { Box, Container, Stack } from '@mui/material';
import { Grid } from '@mui/material';

import ProfileImage from '@/assets/image_me.webp';
import Button from '@/components/Button';
import Image from '@/components/Image';
import ImageModal from '@/components/ImageModal';
import ModalCv from '@/components/ModalCv';
import { SlideFromSide } from '@/components/Motions';
import { useToggle } from '@/hooks';

import styles from './Hero.module.css';
import appStyles from '@/styles/App.module.css';

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
    <section id="hero" className={appStyles.heroSection}>
      <Container
        className={appStyles.sectionContainer}
        sx={{ textAlign: 'center' }}
      >
        <Grid container justifyContent="center" spacing={2}>
          <Grid size={{ md: 5 }}>
            <SlideFromSide from="left">
              <Image
                src={ProfileImage}
                alt="Linus Johansson"
                className={styles.heroImage}
                onClick={handleImageModalOpen}
              />
            </SlideFromSide>
          </Grid>
          <Grid size="auto" sx={{ textAlign: { xs: 'center', lg: 'left' } }}>
            <SlideFromSide from="right">
              <div className={styles.gradientText}>Linus Johansson</div>
              <Box sx={{ my: 2 }} className={styles.developerTitle}>
                Junior Full-Stack Developer
              </Box>
              <Stack
                direction="column"
                alignItems={{ xs: 'center', lg: 'flex-start' }}
                sx={{ mt: 3 }}
              >
                <Button
                  onClick={handleModalOpen}
                  className={`${styles.downloadButton}`}
                  sx={{ my: 4 }}
                  icon={
                    <HiOutlineArrowDownTray
                      className={`${appStyles.buttonIcon} ${styles.buttonIcon}`}
                    />
                  }
                  text="Download CV"
                />
                <Button
                  href="#contact"
                  className={styles.contactButton}
                  icon={<HiOutlineEnvelope className={appStyles.buttonIcon} />}
                  text="Get in Touch"
                />
              </Stack>
            </SlideFromSide>
          </Grid>
        </Grid>
      </Container>
      <ModalCv show={showModal} handleClose={handleModalClose} />
      <ImageModal show={showImageModal} handleClose={handleImageModalClose} />
    </section>
  );
}

export default Hero;
