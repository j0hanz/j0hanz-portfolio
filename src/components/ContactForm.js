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
  faBriefcase,
  faGlobe,
  faExclamationCircle,
  faTrashCan,
} from '@fortawesome/free-solid-svg-icons';
import EmailHandler from '../api/emailJs';
import styles from './styles/ContactForm.module.css';
import appStyles from '../App.module.css';
import { validateForm } from '../utils/validation';
import { toast } from 'react-toastify';
import ScrollRevealWrapper from './ScrollWrapper';

const ContactForm = () => {
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

  const handleChange = (event) => {
    setFormData({ ...formData, [event.target.name]: event.target.value });
  };

  const handleEmailSent = (success) => {
    setIsSending(false);
    if (success) {
      setFormData({ name: '', email: '', company: '', url: '', message: '' });
      toast.success('Your message was sent successfully!');
    } else {
      toast.error('Failed to send message! Please try again later.');
    }
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    const newErrors = validateForm(formData);
    setErrors(newErrors);
    const formValid = Object.keys(newErrors).length === 0;
    setValidated(formValid);
    if (formValid) {
      setIsSending(true);
    }
  };

  const handleReset = () => {
    setFormData({ name: '', email: '', company: '', url: '', message: '' });
    setErrors({});
    setValidated(false);
  };

  return (
    <ScrollRevealWrapper>
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
          <Row className="d-flex justify-content-center align-items-center">
            <Col md={8}>
              <Form noValidate onSubmit={handleSubmit}>
                <Form.Group controlId="formName">
                  <InputGroup className={`ps-1 ${styles.inputGroup}`}>
                    <InputGroup.Text className={styles.inputGroupIcon}>
                      <FontAwesomeIcon size="sm" icon={faUser} />
                    </InputGroup.Text>
                    <Form.Control
                      type="text"
                      name="name"
                      className={styles.inputGroupControl}
                      placeholder="enter your name..."
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
                  <InputGroup className={`ps-1 ${styles.inputGroup}`}>
                    <InputGroup.Text className={styles.inputGroupIcon}>
                      <FontAwesomeIcon size="sm" icon={faEnvelope} />
                    </InputGroup.Text>
                    <Form.Control
                      type="email"
                      name="email"
                      className={styles.inputGroupControl}
                      placeholder="enter your email..."
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
                <Form.Group
                  controlId="formCompany"
                  className={styles.formGroup}
                >
                  <InputGroup className={`ps-1 ${styles.inputGroup}`}>
                    <InputGroup.Text className={styles.inputGroupIcon}>
                      <FontAwesomeIcon size="sm" icon={faBriefcase} />
                    </InputGroup.Text>
                    <Form.Control
                      type="text"
                      name="company"
                      className={styles.inputGroupControl}
                      placeholder="company... (optional)"
                      value={formData.company}
                      onChange={handleChange}
                    />
                  </InputGroup>
                </Form.Group>
                <Form.Group controlId="formUrl" className={styles.formGroup}>
                  <InputGroup className={`ps-1 ${styles.inputGroup}`}>
                    <InputGroup.Text className={styles.inputGroupIcon}>
                      <FontAwesomeIcon size="sm" icon={faGlobe} />
                    </InputGroup.Text>
                    <Form.Control
                      type="url"
                      name="url"
                      className={styles.inputGroupControl}
                      placeholder="website url... (optional)"
                      value={formData.url}
                      onChange={handleChange}
                      isInvalid={!!errors.url}
                    />
                  </InputGroup>
                  {errors.url && (
                    <div className={styles.errorMessage}>
                      <FontAwesomeIcon
                        icon={faExclamationCircle}
                        className="me-2"
                      />
                      {errors.url}
                    </div>
                  )}
                </Form.Group>
                <Form.Group
                  controlId="formMessage"
                  className={styles.formGroup}
                >
                  <InputGroup className={`ps-1 ${styles.inputGroup}`}>
                    <InputGroup.Text className={styles.inputGroupIcon}>
                      <FontAwesomeIcon size="sm" icon={faComment} />
                    </InputGroup.Text>
                    <Form.Control
                      as="textarea"
                      name="message"
                      className={styles.inputGroupControl}
                      rows={4}
                      placeholder="enter your message..."
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
                <div className="d-flex justify-content-between py-4 px-1">
                  <Button
                    className={styles.clearButton}
                    type="button"
                    onClick={handleReset}
                    disabled={isSending}
                  >
                    <FontAwesomeIcon icon={faTrashCan} />
                  </Button>
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
                        <span className={appStyles.buttonText}>Send</span>
                      </>
                    )}
                  </Button>
                </div>
              </Form>
              {validated && (
                <EmailHandler
                  formData={formData}
                  onEmailSent={handleEmailSent}
                />
              )}
            </Col>
          </Row>
        </Container>
      </section>
    </ScrollRevealWrapper>
  );
};

export default ContactForm;
