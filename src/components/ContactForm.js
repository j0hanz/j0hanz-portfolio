import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Container,
  Row,
  Col,
  Form,
  Button,
  Alert,
  Spinner,
} from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEnvelope } from '@fortawesome/free-solid-svg-icons';
import EmailHandler from '../handler/EmailHandler';

const ContactForm = () => {
  const navigate = useNavigate(); // Navigation hook to redirect after form submission
  const [validated, setValidated] = useState(false); // State to track if the form is validated
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: '',
  }); // State to store form data
  const [errors, setErrors] = useState({}); // State to store form validation errors
  const [showAlert, setShowAlert] = useState(false); // State to control the visibility of the alert
  const [isSending, setIsSending] = useState(false); // State to indicate if the email is being sent

  // Function to validate form inputs
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
    return Object.keys(newErrors).length === 0; // Return true if there are no errors
  };

  // Function to handle form submission
  const handleSubmit = (event) => {
    event.preventDefault();
    const formValid = validateForm();
    setValidated(formValid);
    setShowAlert(!formValid); // Show alert if form is not valid

    if (formValid) {
      setIsSending(true); // Set sending state to true if the form is valid
    }
  };

  // Function to handle input changes and update form data
  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData((prevFormData) => ({ ...prevFormData, [name]: value }));
  };

  // Callback function for handling the email sending result
  const handleEmailSent = (success) => {
    setIsSending(false); // Reset sending state
    if (success) {
      setFormData({ name: '', email: '', message: '' }); // Clear form data
      navigate('/success'); // Redirect to success page on successful email sending
    } else {
      console.error('Email sending failed.');
    }
  };

  return (
    <section id="contact" className="contact-section py-5">
      <Container className="px-0">
        <h2 className="d-flex justify-content-center align-items-center">
          <FontAwesomeIcon icon={faEnvelope} size="sm" className="me-2" />
          Contact
        </h2>
        <Row className="justify-content-center mx-auto">
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
                {/* Name input field */}
                <Form.Label className="d-none">Name</Form.Label>
                <Form.Control
                  type="text"
                  name="name"
                  placeholder="Enter your name..."
                  className="mt-3"
                  required
                  value={formData.name}
                  onChange={handleChange}
                  isInvalid={!!errors.name} // Conditional rendering for validation feedback
                />
                <Form.Control.Feedback type="invalid">
                  {errors.name}
                </Form.Control.Feedback>
              </Form.Group>
              <Form.Group controlId="formEmail">
                {/* Email input field */}
                <Form.Label className="d-none">Email</Form.Label>
                <Form.Control
                  type="email"
                  name="email"
                  placeholder="Enter your email..."
                  className="mt-3"
                  required
                  value={formData.email}
                  onChange={handleChange}
                  isInvalid={!!errors.email} // Conditional rendering for validation feedback
                />
                <Form.Control.Feedback type="invalid">
                  {errors.email}
                </Form.Control.Feedback>
              </Form.Group>
              <Form.Group controlId="formMessage">
                {/* Message input field */}
                <Form.Label className="d-none">Message</Form.Label>
                <Form.Control
                  as="textarea"
                  name="message"
                  rows={3}
                  placeholder="Enter your message..."
                  className="mt-3"
                  required
                  value={formData.message}
                  onChange={handleChange}
                  isInvalid={!!errors.message} // Conditional rendering for validation feedback
                />
                <Form.Control.Feedback type="invalid">
                  {errors.message}
                </Form.Control.Feedback>
              </Form.Group>
              <div className="d-flex justify-content-center">
                {/* Submit button with spinner when sending */}
                <Button
                  variant="outline-primary d-flex mt-3"
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
                        className="me-2"
                      />
                      Sending...
                    </>
                  ) : (
                    'Send'
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
