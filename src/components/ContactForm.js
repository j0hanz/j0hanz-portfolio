import React, { useState } from 'react';
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
  faExclamationCircle,
} from '@fortawesome/free-solid-svg-icons';
import EmailHandler from './EmailHandler';
import SuccessMessage from './SuccessMessage';
import styles from './styles/ContactForm.module.css';
import appStyles from '../App.module.css';

const ContactForm = () => {
  const [validated, setValidated] = useState(false);
  const [isSending, setIsSending] = useState(false);
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    company: '',
    url: '',
    message: '',
  });
  const [errors, setErrors] = useState({});

  const handleChange = (event) => {
    setFormData({ ...formData, [event.target.name]: event.target.value });
  };

  const validateForm = () => {
    const newErrors = {};
    if (!/^[a-zA-Z\s]{2,}$/.test(formData.name.trim())) {
      newErrors.name = 'Please enter a valid name.';
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = 'Please enter a valid email address.';
    }
    if (formData.message.trim().length < 10) {
      newErrors.message = 'Your message should be at least 10 characters long.';
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

  const handleEmailSent = (success) => {
    setIsSending(false);
    if (success) {
      setFormData({ name: '', email: '', company: '', url: '', message: '' });
      setShowSuccessModal(true);
    } else {
      console.error('Email sending failed.');
    }
  };

  const handleCloseSuccessModal = () => {
    setShowSuccessModal(false);
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
        <Row className="d-flex justify-content-center align-items-center mx-auto">
          <Col md={8}>
            <Form noValidate onSubmit={handleSubmit}>
              <Form.Group controlId="formName" className={styles.formGroup}>
                <InputGroup className={styles.inputGroup}>
                  <InputGroup.Text className={styles.inputGroupIcon}>
                    <FontAwesomeIcon size="sm" icon={faUser} />
                  </InputGroup.Text>
                  <Form.Control
                    type="text"
                    name="name"
                    className={styles.inputGroupControl}
                    placeholder="Your full name"
                    required
                    value={formData.name}
                    onChange={handleChange}
                    isInvalid={!!errors.name}
                  />
                </InputGroup>
                {errors.name && (
                  <div className={styles.errorMessage}>
                    <FontAwesomeIcon
                      icon={faExclamationCircle}
                      className="me-2"
                    />
                    {errors.name}
                  </div>
                )}
              </Form.Group>
              <Form.Group controlId="formEmail" className={styles.formGroup}>
                <InputGroup className={styles.inputGroup}>
                  <InputGroup.Text className={styles.inputGroupIcon}>
                    <FontAwesomeIcon size="sm" icon={faEnvelope} />
                  </InputGroup.Text>
                  <Form.Control
                    type="email"
                    name="email"
                    className={styles.inputGroupControl}
                    placeholder="Your email address"
                    required
                    value={formData.email}
                    onChange={handleChange}
                    isInvalid={!!errors.email}
                  />
                </InputGroup>
                {errors.email && (
                  <div className={styles.errorMessage}>
                    <FontAwesomeIcon
                      icon={faExclamationCircle}
                      className="me-2"
                    />
                    {errors.email}
                  </div>
                )}
              </Form.Group>
              <Form.Group controlId="formCompany" className={styles.formGroup}>
                <InputGroup className={styles.inputGroup}>
                  <InputGroup.Text className={styles.inputGroupIcon}>
                    <FontAwesomeIcon size="sm" icon={faBuilding} />
                  </InputGroup.Text>
                  <Form.Control
                    type="text"
                    name="company"
                    className={styles.inputGroupControl}
                    placeholder="Your company (optional)"
                    value={formData.company}
                    onChange={handleChange}
                  />
                </InputGroup>
              </Form.Group>
              <Form.Group controlId="formUrl" className={styles.formGroup}>
                <InputGroup className={styles.inputGroup}>
                  <InputGroup.Text className={styles.inputGroupIcon}>
                    <FontAwesomeIcon size="sm" icon={faLink} />
                  </InputGroup.Text>
                  <Form.Control
                    type="url"
                    name="url"
                    className={styles.inputGroupControl}
                    placeholder="Your website (optional)"
                    value={formData.url}
                    onChange={handleChange}
                  />
                </InputGroup>
              </Form.Group>
              <Form.Group controlId="formMessage" className={styles.formGroup}>
                <InputGroup className={styles.inputGroup}>
                  <InputGroup.Text className={styles.inputGroupIcon}>
                    <FontAwesomeIcon size="sm" icon={faComment} />
                  </InputGroup.Text>
                  <Form.Control
                    as="textarea"
                    name="message"
                    className={styles.inputGroupControl}
                    rows={3}
                    placeholder="How can I help you?"
                    required
                    value={formData.message}
                    onChange={handleChange}
                    isInvalid={!!errors.message}
                  />
                </InputGroup>
                {errors.message && (
                  <div className={styles.errorMessage}>
                    <FontAwesomeIcon
                      icon={faExclamationCircle}
                      className="me-2"
                    />
                    {errors.message}
                  </div>
                )}
              </Form.Group>
              <div className="d-flex justify-content-center mt-5">
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
            <SuccessMessage
              show={showSuccessModal}
              onClose={handleCloseSuccessModal}
            />
          </Col>
        </Row>
      </Container>
    </section>
  );
};

export default ContactForm;
