import React from 'react';
import { Container, Row, Col, Button } from 'react-bootstrap';

const Hero = () => (
  <section id="hero" className="hero-section text-light text-center py-5">
    <Container>
      <Row className="d-flex justify-content-center text-center align-items-center">
        <Col md={8}>
          <h1>Hello, I'm Linus Johansson</h1>
          <h2>Frontend Developer | Backend Developer | Web Developer</h2>
          <p className="lead">Crafting elegant and efficient web solutions.</p>
          <Button variant="primary" href="#contact">
            Get in Touch
          </Button>
        </Col>
      </Row>
    </Container>
  </section>
);

export default Hero;
