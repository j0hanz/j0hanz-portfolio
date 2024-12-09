import React, { useState, useCallback } from 'react';
import { Container, Row, Col, Spinner, Button } from 'react-bootstrap';
import Image from '../assets/image_me.webp';
import styles from './styles/Hero.module.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faDownload, faEnvelope } from '@fortawesome/free-solid-svg-icons';
import ModalCv from '../components/ModalCv';
import ImageModal from '../components/ImageModal';
import appStyles from '../App.module.css';
import ScrollRevealWrapper from '../components/ScrollWrapper';

const Hero = () => {
  /* State to manage loading spinner for CV download */
  const [loading, setLoading] = useState(false);

  /* State to manage the visibility of the CV modal */
  const [showModal, setShowModal] = useState(false);

  /* State to manage the visibility of the image modal */
  const [showImageModal, setShowImageModal] = useState(false);

  /* Function to handle opening the CV modal with a loading spinner */
  const handleModalOpen = useCallback(() => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setShowModal(true);
    }, 1000);
  }, []);

  /* Function to handle closing the CV modal */
  const handleModalClose = useCallback(() => setShowModal(false), []);

  /* Function to handle opening the image modal */
  const handleImageModalOpen = useCallback(() => setShowImageModal(true), []);

  /* Function to handle closing the image modal */
  const handleImageModalClose = useCallback(() => setShowImageModal(false), []);

  /* Common class names for buttons */
  const buttonBaseClass = `d-flex align-items-center ${appStyles.customButton}`;
  const downloadButtonClass = `${buttonBaseClass} my-4 ${styles.downloadButton}`;
  const contactButtonClass = `${buttonBaseClass} ${styles.contactButton}`;

  return (
    <ScrollRevealWrapper>
      <section id="hero" className={`text-center ${appStyles.sectionPadding}`}>
        <Container className={appStyles.sectionContainer}>
          <Row className="d-flex justify-content-center align-items-center">
            <Col xs="auto">
              <img
                src={Image}
                alt="Linus Johansson"
                className={`mb-3 ${styles.heroImage}`}
                onClick={handleImageModalOpen}
                style={{ cursor: 'pointer' }}
              />
              <h1 className={styles.gradientText}>Linus Johansson</h1>
              <hr className="my-2" />
              <p
                className={`text-body-secondary fw-semibold ${styles.developerTitle}`}
              >
                Junior Full-Stack Developer
              </p>
              <div className="d-flex flex-column align-items-center mt-4">
                <Button
                  onClick={handleModalOpen}
                  disabled={loading}
                  className={downloadButtonClass}
                >
                  {loading ? (
                    <Spinner
                      variant="light"
                      as="span"
                      animation="border"
                      size="sm"
                      role="status"
                      aria-hidden="true"
                    />
                  ) : (
                    <>
                      <FontAwesomeIcon
                        icon={faDownload}
                        className={`ps-1 ${appStyles.buttonIcon}`}
                      />
                      <span className={appStyles.buttonText}>Download CV</span>
                    </>
                  )}
                </Button>
                <Button href="#contact" className={contactButtonClass}>
                  <FontAwesomeIcon
                    icon={faEnvelope}
                    className={appStyles.buttonIcon}
                  />
                  <span className={appStyles.buttonText}>Get in Touch</span>
                </Button>
              </div>
            </Col>
          </Row>
        </Container>
        <ModalCv show={showModal} handleClose={handleModalClose} />
        <ImageModal show={showImageModal} handleClose={handleImageModalClose} />
      </section>
    </ScrollRevealWrapper>
  );
};

export default Hero;
