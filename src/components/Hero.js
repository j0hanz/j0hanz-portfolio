import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import Image from '../assets/image_me.jpeg';
import styles from './styles/Hero.module.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faDownload } from '@fortawesome/free-solid-svg-icons';
import Cv from '../assets/Linus_Johansson_CV.pdf';

// Functional component Hero wrapped with React.memo for performance optimization
const Hero = React.memo(() => {
  // Defining CSS classes for various elements
  const classes = `mb-4 ${styles.gradientText}`;
  const imageClasses = `mb-4 ${styles.heroImage}`;
  const leadClasses = `mb-4 lead`;
  const buttonClasses = `btn btn-outline-dark btn-lg`;

  return (
    <section id="hero" className="hero-section text-center py-5">
      <Container className="px-0">
        <Row className="d-flex justify-content-center text-center align-items-center mx-auto">
          <Col xs="auto">
            <h1 className={classes}>Linus Johansson</h1>
            <img src={Image} alt="Linus Johansson" className={imageClasses} />
            <h2 className="mb-3">Full-Stack Developer</h2>
            <hr className="my-2" />
            <p className={leadClasses}>
              Crafting elegant and efficient web solutions.
            </p>
            <div className="d-flex flex-column justify-content-center align-items-center my-4">
              <a href={Cv} download className="btn btn-outline-primary mb-3">
                <FontAwesomeIcon size="lg" icon={faDownload} className="me-2" />
                Download CV
              </a>
              <a href="#contact" className={buttonClasses}>
                Get in Touch
              </a>
            </div>
          </Col>
        </Row>
      </Container>
    </section>
  );
});

export default Hero;
