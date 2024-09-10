import React, { useState, useCallback } from 'react';
import { Container, Row, Col, Spinner, Button } from 'react-bootstrap';
import Image from '../assets/image_me.jpeg';
import styles from './styles/Hero.module.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faDownload, faEnvelope } from '@fortawesome/free-solid-svg-icons';
import ModalCv from './ModalCv';

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
    }, 1000); // Simulates a delay before showing the modal
  }, []);

  /* Function to handle closing the modal */
  const handleModalClose = useCallback(() => setShowModal(false), []);

  return (
    <section id="hero" className="text-center py-4">
      <Container>
        <Row className="d-flex justify-content-center align-items-center">
          <Col xs="auto">
            <h1 className={`mb-4 ${styles.gradientText}`}>Linus Johansson</h1>
            <img
              src={Image}
              alt="Linus Johansson"
              className={`mb-4 ${styles.heroImage}`}
            />
            <h2>Junior Full-Stack Developer</h2>
            <hr className="my-2" />
            <p className="lead">
              Creating elegant and efficient web solutions.
            </p>
            <div className="d-flex flex-column align-items-center my-3">
              <Button
                onClick={handleModalOpen}
                variant="outline-primary"
                disabled={loading}
                className={`mb-3 ${styles.customButton}`}
              >
                {loading ? (
                  <Spinner
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
                      className={styles.buttonIcon}
                    />
                    Download CV
                  </>
                )}
              </Button>
              <Button
                href="#contact"
                variant="outline-dark"
                className={styles.customButton}
              >
                <FontAwesomeIcon
                  icon={faEnvelope}
                  className={styles.buttonIcon}
                />
                Get in Touch
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
