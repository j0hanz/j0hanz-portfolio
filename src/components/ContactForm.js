import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Container, Row, Col, Form, Button } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEnvelope } from '@fortawesome/free-solid-svg-icons';
import EmailHandler from '../handler/EmailHandler';

const ContactForm = () => {
  const navigate = useNavigate();
  const [validated, setValidated] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: '',
  });

  const handleSubmit = (event) => {
    const form = event.currentTarget;

    if (form.checkValidity() === false) {
      event.preventDefault();
      event.stopPropagation();
    } else {
      event.preventDefault();
      setValidated(true);
    }
  };

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleEmailSent = (success) => {
    if (success) {
      setFormData({ name: '', email: '', message: '' }); // Reset form fields
      navigate('/success'); // Navigate to success page
    } else {
      console.error('Email sending failed.');
    }
  };

  return (
    <section id="contact" className="contact-section py-5">
      <Container className="px-0">
        <h2 className="text-center">
          <FontAwesomeIcon icon={faEnvelope} size="sm" className="me-2" />
          Contact
        </h2>
        <Row className="justify-content-center mt-4 mx-auto">
          <Col md={8}>
            <Form noValidate validated={validated} onSubmit={handleSubmit}>
              <Form.Group controlId="formName">
                <Form.Label className="d-none">Name</Form.Label>
                <Form.Control
                  type="text"
                  name="name"
                  placeholder="Enter your name..."
                  className="mb-3"
                  required
                  value={formData.name}
                  onChange={handleChange}
                />
              </Form.Group>
              <Form.Group controlId="formEmail">
                <Form.Label className="d-none">Email</Form.Label>
                <Form.Control
                  type="email"
                  name="email"
                  placeholder="Enter your email..."
                  className="mb-3"
                  required
                  value={formData.email}
                  onChange={handleChange}
                />
              </Form.Group>
              <Form.Group controlId="formMessage">
                <Form.Label className="d-none">Message</Form.Label>
                <Form.Control
                  as="textarea"
                  name="message"
                  rows={3}
                  placeholder="Enter your message..."
                  className="mb-3"
                  required
                  value={formData.message}
                  onChange={handleChange}
                />
              </Form.Group>
              <div className="d-flex justify-content-center">
                <Button variant="outline-primary d-flex" type="submit">
                  Send
                </Button>
              </div>
            </Form>
          </Col>
        </Row>
      </Container>
      {validated && (
        <EmailHandler formData={formData} onEmailSent={handleEmailSent} />
      )}
    </section>
  );
};

export default ContactForm;
