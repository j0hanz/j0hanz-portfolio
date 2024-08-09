import React from 'react';
import { Container, Row, Col, Card } from 'react-bootstrap';

const AboutMe = () => (
  <section id="about-me" className="about-section py-5 text-light">
    <Container>
      <Row className="justify-content-center">
        <Col md={8}>
          <Card className="p-4 shadow bg-secondary text-light">
            <Card.Body>
              <Card.Title>About Me</Card.Title>
              <Card.Text>
                I am a passionate web developer with experience in both frontend
                and backend technologies...
              </Card.Text>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  </section>
);

export default AboutMe;
