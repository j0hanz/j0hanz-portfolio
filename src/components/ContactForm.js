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
  faBuilding,
  faLink,
} from '@fortawesome/free-solid-svg-icons';
import EmailHandler from './EmailHandler';
import styles from './styles/ContactForm.module.css';
import appStyles from '../App.module.css';

const ContactForm = () => {
  const navigate = useNavigate();
  const [validated, setValidated] = useState(false);
  const [isSending, setIsSending] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    company: '',
    url: '',
    message: '',
  });
  const [errors, setErrors] = useState({});

  /* Handles input change event and updates the form data state */
  const handleChange = (event) => {
    setFormData({ ...formData, [event.target.name]: event.target.value });
  };

  /* Validates the form data and sets errors if validation fails */
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

  /* Handles the form submission and triggers validation */
  const handleSubmit = (event) => {
    event.preventDefault();
    const formValid = validateForm();
    setValidated(formValid);
    if (formValid) {
      setIsSending(true);
    }
  };

  /* Handles the email sending status and navigates to success page if successful */
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
    <section id="contact" className={appStyles.sectionPadding}>
      <Container className={appStyles.sectionContainer}>
        <div className={appStyles.sectionTitleContainer}>
          <div>
            <FontAwesomeIcon
              icon={faEnvelope}
              size="2x"
              className={appStyles.mainIcon}
            />
          </div>
          <h2 className={appStyles.sectionTitle}>Contact</h2>
        </div>
        <Row className="justify-content-center mx-auto mt-2">
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

              <Form.Group controlId="formEmail" className="my-3">
                <InputGroup>
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

              <Form.Group controlId="formCompany" className="my-3">
                <InputGroup>
                  <InputGroup.Text className={styles.inputGroupIcon}>
                    <FontAwesomeIcon size="sm" icon={faBuilding} />
                  </InputGroup.Text>
                  <Form.Control
                    type="text"
                    name="company"
                    placeholder="Enter your company name..."
                    value={formData.company}
                    onChange={handleChange}
                  />
                </InputGroup>
              </Form.Group>

              <Form.Group controlId="formUrl" className="my-3">
                <InputGroup>
                  <InputGroup.Text className={styles.inputGroupIcon}>
                    <FontAwesomeIcon size="sm" icon={faLink} />
                  </InputGroup.Text>
                  <Form.Control
                    type="url"
                    name="url"
                    placeholder="Enter your website URL..."
                    value={formData.url}
                    onChange={handleChange}
                  />
                </InputGroup>
              </Form.Group>

              <Form.Group controlId="formMessage">
                <InputGroup>
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
                  className={styles.submitButton}
                  type="submit"
                  disabled={isSending}
                >
                  {isSending ? (
                    <Spinner
                      variant="light"
                      as="span"
                      animation="border"
                      size="sm"
                      role="status"
                      aria-hidden="true"
                    />
                  ) : (
                    <>
                      <FontAwesomeIcon
                        icon={faEnvelope}
                        className={appStyles.buttonIcon}
                      />
                      <span className={appStyles.buttonText}>Submit</span>
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
