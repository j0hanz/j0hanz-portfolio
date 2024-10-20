import React, { useState, useCallback } from 'react';
import { Container, Row, Col, Spinner, Button } from 'react-bootstrap';
import Image from '../assets/image_me.jpeg';
import styles from './styles/Hero.module.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faDownload, faEnvelope } from '@fortawesome/free-solid-svg-icons';
import ModalCv from './ModalCv';
import appStyles from '../App.module.css';

const Hero = () => {
  /* State to manage loading spinner for CV download */
  const [loading, setLoading] = useState(false);

  /* State to manage the visibility of the CV modal */
  const [showModal, setShowModal] = useState(false);

  /* Function to handle opening the modal with a loading spinner */
  const handleModalOpen = useCallback(() => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setShowModal(true);
    }, 1000);
  }, []);

  /* Function to handle closing the modal */
  const handleModalClose = useCallback(() => setShowModal(false), []);

  /* Common class names for buttons */
  const buttonBaseClass = `d-flex align-items-center ${appStyles.customButtonLight}`;
  const downloadButtonClass = `${buttonBaseClass} my-4 ${styles.downloadButton}`;
  const contactButtonClass = `${buttonBaseClass} ${styles.contactButton}`;

  return (
    <section
      id="hero"
      className={`text-center ${appStyles.sectionPadding} ${appStyles.imgDarkBg}`}
    >
      <Container className={appStyles.sectionContainer}>
        <Row className="d-flex justify-content-center align-items-center mx-auto">
          <Col xs="auto">
            <img
              src={Image}
              alt="Linus Johansson"
              className={`mb-4 ${styles.heroImage}`}
            />
            <h1 className={styles.gradientText}>Linus Johansson</h1>
            <hr className="my-2" />
            <p
              className={`text-body-secondary fw-semibold ${styles.developerTitle}`}
            >
              Junior Full-Stack Developer
            </p>
            <div className="d-flex flex-column align-items-center my-5">
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
                      className={appStyles.buttonIcon}
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
    </section>
  );
};

export default Hero;
