import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import Image from '../assets/image_me.jpeg';
import styles from './styles/Hero.module.css';

const Hero = React.memo(() => {
  const classes = `mb-4 ${styles.gradientText}`;
  const imageClasses = `mb-4 ${styles.heroImage}`;
  const leadClasses = `mb-4 lead`;
  const buttonClasses = `btn btn-outline-success text-white`;

  return (
    <section id="hero" className="hero-section text-light text-center py-5">
      <Container className="px-0">
        <Row className="d-flex justify-content-center text-center align-items-center mx-auto">
          <Col xs="auto">
            <h1 className={classes}>Linus Johansson</h1>
            <img src={Image} alt="Linus Johansson" className={imageClasses} />
            <h2 className="h4 mb-3">Full-Stack Developer</h2>
            <hr className="my-2" />
            <p className={leadClasses}>
              Crafting elegant and efficient web solutions.
            </p>
            <a href="#contact" className={buttonClasses} size="lg">
              Get in Touch
            </a>
          </Col>
        </Row>
      </Container>
    </section>
  );
});

export default Hero;
