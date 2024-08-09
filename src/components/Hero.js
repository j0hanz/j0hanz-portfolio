import React from 'react';
import { Container, Row, Col, Button } from 'react-bootstrap';
import Image from '../assets/image_me.jpeg';
import styles from './styles/Hero.module.css';

const Hero = () => (
  <section id="hero" className="hero-section text-light text-center py-5">
    <Container className="px-0">
      <Row className="d-flex justify-content-center text-center align-items-center mx-auto">
        <Col xs="auto">
          <h1 className="display-4 mb-3">
            <span className={styles.gradientText}>Hello,</span> I'm Linus
            Johansson
          </h1>
          <img src={Image} alt="Linus Johansson" className={styles.heroImage} />
          <h2 className="h4 mb-3">Full-Stack Developer</h2>
          <p className="lead mb-4">
            Crafting elegant and efficient web solutions.
          </p>
          <Button
            variant="outline-success text-white"
            href="#contact"
            size="lg"
          >
            Get in Touch
          </Button>
        </Col>
      </Row>
    </Container>
  </section>
);

export default Hero;
