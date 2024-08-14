import React, { useState } from 'react'; // Importing React library and useState hook
import { useNavigate } from 'react-router-dom'; // Importing useNavigate hook from react-router-dom
import { Container, Row, Col, Form, Button } from 'react-bootstrap'; // Importing components from react-bootstrap
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'; // Importing FontAwesomeIcon component
import { faEnvelope } from '@fortawesome/free-solid-svg-icons'; // Importing specific icon from FontAwesome
import EmailHandler from '../handler/EmailHandler'; // Importing EmailHandler component

// Functional component ContactForm wrapped with React.memo for performance optimization
const ContactForm = React.memo(() => {
  const navigate = useNavigate(); // Initializing useNavigate hook
  const [validated, setValidated] = useState(false); // State for form validation
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: '',
  }); // State for form data

  // Handle form submission
  const handleSubmit = (event) => {
    const form = event.currentTarget;
    if (form.checkValidity() === false) {
      event.preventDefault();
      event.stopPropagation();
    } else {
      event.preventDefault();
      // Simulate form submission
      setTimeout(() => {
        setValidated(true);
      }, 1000);
    }
  };

  // Handle form data change
  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData({ ...formData, [name]: value });
  };

  // Handle email sent success or failure
  const handleEmailSent = (success) => {
    if (success) {
      setFormData({ name: '', email: '', message: '' }); // Reset form fields
      navigate('/success'); // Navigate to success page on email success
    } else {
      console.error('Email sending failed.'); // Handle email sending failure
    }
  };

  return (
    // Section element with id and classes for styling
    <section id="contact" className="contact-section py-5">
      {/* Bootstrap container with no horizontal padding */}
      <Container className="px-0">
        {/* Heading with FontAwesome icon and centered text */}
        <h2 className="text-center">
          <FontAwesomeIcon icon={faEnvelope} size="sm" className="me-2" />
          Contact
        </h2>
        {/* Bootstrap row centered horizontally with top margin */}
        <Row className="justify-content-center mt-4 mx-auto">
          {/* Bootstrap column with medium size 8 */}
          <Col md={8}>
            {/* Bootstrap form */}
            <Form noValidate validated={validated} onSubmit={handleSubmit}>
              {/* Form group for name input */}
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
              {/* Form group for email input */}
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
              {/* Form group for message textarea */}
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
              {/* Submit button with outline-success variant and white text */}
              <div className="d-flex justify-content-center">
                <Button variant="outline-primary d-flex" type="submit">
                  Send
                </Button>
              </div>
            </Form>
          </Col>
        </Row>
      </Container>
      {/* Integrate EmailHandler */}
      {validated && (
        <EmailHandler formData={formData} onEmailSent={handleEmailSent} />
      )}
    </section>
  );
});

// Exporting the ContactForm component as default export
export default ContactForm;
