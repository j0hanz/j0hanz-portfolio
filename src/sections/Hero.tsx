import React, { useState } from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import Image from '@/components/Image';
import ProfileImage from '@/assets/image_me.webp';
import styles from './styles/Hero.module.css';
import { HiOutlineEnvelope, HiOutlineArrowDownTray } from 'react-icons/hi2';
import ModalCv from '@/components/ModalCv';
import ImageModal from '@/components/ImageModal';
import appStyles from '@/App.module.css';
import { SlideFromSide } from '@/components/Motions';
import Button from '@/components/Button';

// Rendering hero section
const Hero: React.FC = () => {
  const [showModal, setShowModal] = useState(false);
  const [showImageModal, setShowImageModal] = useState(false);

  // Handlers for opening and closing modals
  const handleModalOpen = () => {
    setShowModal(true);
  };

  const handleModalClose = () => setShowModal(false);
  const handleImageModalOpen = () => setShowImageModal(true);
  const handleImageModalClose = () => setShowImageModal(false);

  const downloadButtonClass = `my-4 ${styles.downloadButton}`;
  const contactButtonClass = `${styles.contactButton}`;

  return (
    <section id="hero" className={`text-center ${appStyles.heroSection}`}>
      <Container className={appStyles.sectionContainer}>
        <Row className="d-flex justify-content-center">
          <Col md={5}>
            <SlideFromSide from="left">
              <Image
                src={ProfileImage}
                alt="Linus Johansson"
                className={styles.heroImage}
                onClick={handleImageModalOpen}
              />
            </SlideFromSide>
          </Col>
          <Col xs="auto" className="text-center text-lg-start">
            <SlideFromSide from="right">
              <div className={styles.gradientText}>Linus Johansson</div>
              <div className={`my-2 ${styles.developerTitle}`}>
                Junior Full-Stack Developer
              </div>
              <div className="d-flex flex-column align-items-center align-items-lg-start mt-3">
                <Button
                  onClick={handleModalOpen}
                  className={downloadButtonClass}
                  icon={
                    <HiOutlineArrowDownTray
                      className={`${appStyles.buttonIcon} ${styles.buttonIcon}`}
                    />
                  }
                  text="Download CV"
                />
                <Button
                  href="#contact"
                  className={contactButtonClass}
                  icon={<HiOutlineEnvelope className={appStyles.buttonIcon} />}
                  text="Get in Touch"
                />
              </div>
            </SlideFromSide>
          </Col>
        </Row>
      </Container>
      <ModalCv show={showModal} handleClose={handleModalClose} />
      <ImageModal show={showImageModal} handleClose={handleImageModalClose} />
    </section>
  );
};

export default Hero;
