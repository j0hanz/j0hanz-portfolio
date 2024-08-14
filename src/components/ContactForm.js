import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Container, Row, Col, Form, Button, Alert } from 'react-bootstrap';
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
  const [errors, setErrors] = useState({});
  const [showAlert, setShowAlert] = useState(false);

  const validateForm = () => {
    const newErrors = {};

    // Validate name (must be at least 2 characters and contain only letters and spaces)
    if (!/^[a-zA-Z\s]{2,}$/.test(formData.name)) {
      newErrors.name =
        'Please enter a valid name (at least 2 characters, letters, and spaces only).';
    }

    // Validate email using a regex pattern
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = 'Please enter a valid email address.';
    }

    // Validate message (must be at least 10 characters)
    if (formData.message.length < 10) {
      newErrors.message =
        'Your message is too short (at least 10 characters required).';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    if (validateForm()) {
      setValidated(true);
      setShowAlert(false);
    } else {
      setValidated(false);
      setShowAlert(true);
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
            {showAlert && (
              <Alert
                variant="danger"
                onClose={() => setShowAlert(false)}
                dismissible
              >
                Please correct the errors in the form below.
              </Alert>
            )}
            <Form noValidate onSubmit={handleSubmit}>
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
                  isInvalid={!!errors.name}
                />
                <Form.Control.Feedback type="invalid">
                  {errors.name}
                </Form.Control.Feedback>
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
                  isInvalid={!!errors.email}
                />
                <Form.Control.Feedback type="invalid">
                  {errors.email}
                </Form.Control.Feedback>
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
                  isInvalid={!!errors.message}
                />
                <Form.Control.Feedback type="invalid">
                  {errors.message}
                </Form.Control.Feedback>
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
