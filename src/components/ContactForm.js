import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Container, Row, Col, Form, Button } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEnvelope } from '@fortawesome/free-solid-svg-icons';
import api from '../api/api';

const ContactForm = React.memo(() => {
  const navigate = useNavigate();
  const [validated, setValidated] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: '',
  });
  const [formError, setFormError] = useState(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const form = event.currentTarget;
    if (form.checkValidity() === false) {
      event.stopPropagation();
    } else {
      try {
        const response = await api.post('/contact/', formData);
        const data = response.data;
        if (data.status === 'success') {
          navigate('/success'); // Navigate to success page
        } else {
          if (typeof data.errors === 'object') {
            const errorMessages = Object.values(data.errors).flat();
            setFormError(errorMessages);
          } else {
            setFormError([
              data.errors || 'An error occurred while submitting the form',
            ]);
          }
        }
      } catch (error) {
        setFormError(['An error occurred while submitting the form']);
      }
    }
    setValidated(true);
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
              {formError && (
                <div className="mt-3 text-danger text-center">
                  {formError.map((error, index) => (
                    <div key={index}>{error}</div>
                  ))}
                </div>
              )}
            </Form>
          </Col>
        </Row>
      </Container>
    </section>
  );
});

export default ContactForm;
