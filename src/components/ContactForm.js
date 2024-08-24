import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Container,
  Row,
  Col,
  Form,
  Button,
  Spinner,
  InputGroup,
} from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faEnvelope,
  faUser,
  faComment,
} from '@fortawesome/free-solid-svg-icons';
import EmailHandler from '../handler/EmailHandler';
import styles from './styles/ContactForm.module.css';

const ContactForm = () => {
  const navigate = useNavigate();
  const [validated, setValidated] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: '',
  });
  const [errors, setErrors] = useState({});
  const [isSending, setIsSending] = useState(false);

  const validateForm = () => {
    const newErrors = {};

    if (!/^[a-zA-Z\s]{2,}$/.test(formData.name)) {
      newErrors.name = 'Please enter a valid name.';
    }

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = 'Please enter a valid email address.';
    }

    if (formData.message.length < 10) {
      newErrors.message = 'Your message is too short.';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    const formValid = validateForm();
    setValidated(formValid);

    if (formValid) {
      setIsSending(true);
    }
  };

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData((prevFormData) => ({ ...prevFormData, [name]: value }));
  };

  const handleEmailSent = (success) => {
    setIsSending(false);
    if (success) {
      setFormData({ name: '', email: '', message: '' });
      navigate('/success');
    } else {
      console.error('Email sending failed.');
    }
  };

  return (
    <section id="contact" className="contact-section py-4">
      <Container className="px-0">
        <h2 className="d-flex justify-content-center align-items-center">
          <FontAwesomeIcon icon={faEnvelope} className="me-2" />
          Contact
        </h2>
        <Row className="justify-content-center mx-auto mt-4">
          <Col md={8}>
            <Form noValidate onSubmit={handleSubmit}>
              <Form.Group controlId="formName">
                <InputGroup>
                  <InputGroup.Text className={styles.inputGroupIcon}>
                    <FontAwesomeIcon size="sm" icon={faUser} />
                  </InputGroup.Text>
                  <Form.Control
                    type="text"
                    name="name"
                    placeholder="Enter your name..."
                    required
                    value={formData.name}
                    onChange={handleChange}
                    isInvalid={!!errors.name}
                  />
                  <Form.Control.Feedback type="invalid">
                    {errors.name}
                  </Form.Control.Feedback>
                </InputGroup>
              </Form.Group>

              <Form.Group controlId="formEmail">
                <InputGroup className="mt-2">
                  <InputGroup.Text className={styles.inputGroupIcon}>
                    <FontAwesomeIcon size="sm" icon={faEnvelope} />
                  </InputGroup.Text>
                  <Form.Control
                    type="email"
                    name="email"
                    placeholder="Enter your email..."
                    required
                    value={formData.email}
                    onChange={handleChange}
                    isInvalid={!!errors.email}
                  />
                  <Form.Control.Feedback type="invalid">
                    {errors.email}
                  </Form.Control.Feedback>
                </InputGroup>
              </Form.Group>

              <Form.Group controlId="formMessage">
                <InputGroup className="mt-2">
                  <InputGroup.Text className={styles.inputGroupIcon}>
                    <FontAwesomeIcon size="sm" icon={faComment} />
                  </InputGroup.Text>
                  <Form.Control
                    as="textarea"
                    name="message"
                    rows={3}
                    placeholder="Enter your message..."
                    required
                    value={formData.message}
                    onChange={handleChange}
                    isInvalid={!!errors.message}
                  />
                  <Form.Control.Feedback type="invalid">
                    {errors.message}
                  </Form.Control.Feedback>
                </InputGroup>
              </Form.Group>

              <div className="d-flex justify-content-center my-4">
                <Button
                  className={styles.customButton}
                  variant="outline-success"
                  type="submit"
                  disabled={isSending}
                >
                  {isSending ? (
                    <>
                      <Spinner
                        as="span"
                        animation="border"
                        size="sm"
                        role="status"
                        aria-hidden="true"
                      />
                    </>
                  ) : (
                    <>
                      <FontAwesomeIcon
                        icon={faEnvelope}
                        className={styles.buttonIcon}
                      />
                      <span className={styles.buttonText}>Submit</span>
                    </>
                  )}
                </Button>
              </div>
            </Form>
            {validated && (
              <EmailHandler formData={formData} onEmailSent={handleEmailSent} />
            )}
          </Col>
        </Row>
      </Container>
    </section>
  );
};

export default ContactForm;
