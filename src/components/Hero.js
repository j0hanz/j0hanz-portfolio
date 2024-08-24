import React, { useState } from 'react';
import { Container, Row, Col, Spinner, Button } from 'react-bootstrap';
import Image from '../assets/image_me.jpeg';
import styles from './styles/Hero.module.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faDownload, faEnvelope } from '@fortawesome/free-solid-svg-icons';
import Cv from '../assets/Linus_Johansson_CV.pdf';

const Hero = React.memo(() => {
  const [loading, setLoading] = useState(false);

  // Handle CV download
  const handleDownload = () => {
    setLoading(true);

    const link = document.createElement('a');
    link.href = Cv;
    link.download = 'Linus_Johansson_CV.pdf';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);

    setTimeout(() => setLoading(false), 2000);
  };

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
            <h2>Full-Stack Developer</h2>
            <hr className="my-2" />
            <p className="lead">
              Crafting elegant and efficient web solutions.
            </p>
            <div className="d-flex flex-column align-items-center my-3">
              <Button
                onClick={handleDownload}
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
                onClick={() => (window.location.href = '#contact')}
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
    </section>
  );
});

export default Hero;
