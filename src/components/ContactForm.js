import React from 'react'; // Importing React library
import { Container, Row, Col, Form, Button } from 'react-bootstrap'; // Importing components from react-bootstrap
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'; // Importing FontAwesomeIcon component
import { faEnvelope } from '@fortawesome/free-solid-svg-icons'; // Importing specific icon from FontAwesome

// Functional component ContactForm wrapped with React.memo for performance optimization
const ContactForm = React.memo(() => (
  // Section element with id and classes for styling
  <section id="contact" className="contact-section py-5 text-light">
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
          <Form>
            {/* Form group for name input */}
            <Form.Group controlId="formName">
              <Form.Label>Name</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter your name..."
                className="mb-3"
                required
              />
            </Form.Group>
            {/* Form group for email input */}
            <Form.Group controlId="formEmail">
              <Form.Label>Email</Form.Label>
              <Form.Control
                type="email"
                placeholder="Enter your email..."
                className="mb-3"
                required
              />
            </Form.Group>
            {/* Form group for message textarea */}
            <Form.Group controlId="formMessage">
              <Form.Label>Message</Form.Label>
              <Form.Control
                as="textarea"
                rows={3}
                placeholder="Enter your message..."
                className="mb-3"
                required
              />
            </Form.Group>
            {/* Submit button with outline-success variant and white text */}
            <Button variant="outline-success text-white" type="submit">
              Send
            </Button>
          </Form>
        </Col>
      </Row>
    </Container>
  </section>
));

// Exporting the ContactForm component as default export
export default ContactForm;
