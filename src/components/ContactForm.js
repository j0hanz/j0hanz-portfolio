import React from 'react';
import { Container, Row, Col, Form, Button } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEnvelope } from '@fortawesome/free-solid-svg-icons';

const ContactForm = React.memo(() => (
  <section id="contact" className="contact-section py-5 text-light">
    <Container className="px-0">
      <h2 className="text-center">
        <FontAwesomeIcon icon={faEnvelope} size="sm" className="me-2" />
        Contact
      </h2>
      <Row className="justify-content-center mt-4 mx-auto">
        <Col md={8}>
          <Form>
            <Form.Group controlId="formName">
              <Form.Label>Name</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter your name..."
                className="mb-3"
              />
            </Form.Group>
            <Form.Group controlId="formEmail">
              <Form.Label>Email</Form.Label>
              <Form.Control
                type="email"
                placeholder="Enter your email..."
                className="mb-3"
              />
            </Form.Group>
            <Form.Group controlId="formMessage">
              <Form.Label>Message</Form.Label>
              <Form.Control
                as="textarea"
                rows={3}
                placeholder="Enter your message..."
                className="mb-3"
              />
            </Form.Group>
            <Button variant="outline-primary" type="submit">
              Send
            </Button>
          </Form>
        </Col>
      </Row>
    </Container>
  </section>
));

export default ContactForm;
