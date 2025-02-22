import React from 'react';
import { Container, Row, Col, Form, Spinner, Card } from 'react-bootstrap';
import {
  HiOutlineTrash,
  HiOutlinePaperAirplane,
  HiEnvelope,
} from 'react-icons/hi2';
import EmailHandler from '@/api/emailJs';
import styles from './styles/ContactForm.module.css';
import appStyles from '@/App.module.css';
import FormContact from '@/form/contact';
import Badge from '@/components/Badges';
import Button from '@/components/Button';
import useContactForm from '@/hooks/useContactForm';

// Rendering contact form section
const ContactForm: React.FC = () => {
  const {
    validated,
    isSending,
    formData,
    errors,
    handleChange,
    handleEmailSent,
    handleSubmit,
    handleReset,
  } = useContactForm();

  return (
    <section id="contact" className={appStyles.sectionPadding}>
      <Container className={appStyles.sectionContainer}>
        <div className={appStyles.sectionTitleContainer}>
          <div>
            <HiEnvelope className={appStyles.mainIcon} />
          </div>
          <div className={appStyles.sectionTitle}>Contact</div>
        </div>
        <Row className="d-flex justify-content-center align-items-center">
          <Col md={8}>
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
                      icon={
                        <HiOutlineTrash className={styles.buttonIconClear} />
                      }
                    />
                    <Button
                      className={styles.submitButton}
                      type="submit"
                      disabled={isSending}
                      icon={
                        isSending ? (
                          <Spinner
                            variant="light"
                            as="span"
                            animation="border"
                            size="sm"
                            role="status"
                            aria-hidden="true"
                          />
                        ) : (
                          <HiOutlinePaperAirplane
                            className={styles.buttonIcon}
                          />
                        )
                      }
                      text={isSending ? '' : 'Send'}
                    />
                  </div>
                </Form>
              </Card.Body>
            </Card>
            {validated && (
              <EmailHandler formData={formData} onEmailSent={handleEmailSent} />
            )}
            <Badge />
          </Col>
        </Row>
      </Container>
    </section>
  );
};

export default ContactForm;
