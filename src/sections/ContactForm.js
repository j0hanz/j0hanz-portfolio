import React, { useState } from 'react';
import {
  Container,
  Row,
  Col,
  Form,
  Button,
  Spinner,
  Card,
} from 'react-bootstrap';
import {
  HiOutlineTrash,
  HiOutlinePaperAirplane,
  HiMiniEnvelope,
} from 'react-icons/hi2';
import EmailHandler from '../api/emailJs';
import styles from './styles/ContactForm.module.css';
import appStyles from '../App.module.css';
import { validateForm } from '../utils/validation';
import { toast } from 'react-toastify';
import ScrollRevealWrapper from '../components/ScrollWrapper';
import FormContact from '../form/contact';
import Badge from '../components/Badge';

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
              <HiMiniEnvelope className={appStyles.mainIcon} />
            </div>
            <div className={appStyles.sectionTitle}>Contact</div>
          </div>
          <Row className="d-flex justify-content-center align-items-center">
            <Col md={9}>
              <Card className={`h-100 ${appStyles.cardBgColor}`}>
                <Card.Body className={appStyles.formBody}>
                  <Form noValidate onSubmit={handleSubmit}>
                    <FormContact
                      formData={formData}
                      errors={errors}
                      handleChange={handleChange}
                    />
                    <div className="d-flex justify-content-between mt-3 p-2">
                      <Button
                        className={styles.clearButton}
                        type="button"
                        onClick={handleReset}
                        disabled={isSending}
                      >
                        <HiOutlineTrash className={styles.buttonIconClear} />
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
                            <HiOutlinePaperAirplane
                              className={styles.buttonIcon}
                            />
                            <span className={styles.buttonText}>Send</span>
                          </>
                        )}
                      </Button>
                    </div>
                  </Form>
                </Card.Body>
              </Card>
              {validated && (
                <EmailHandler
                  formData={formData}
                  onEmailSent={handleEmailSent}
                />
              )}
              <Badge />
            </Col>
          </Row>
        </Container>
      </section>
    </ScrollRevealWrapper>
  );
};

export default ContactForm;
