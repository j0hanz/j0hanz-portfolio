import React, { useEffect } from 'react';
import { Container, Row, Col, Button } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheck, faRotateLeft } from '@fortawesome/free-solid-svg-icons';
import { toast } from 'react-toastify';
import Toast from './Toast';
import styles from './styles/SuccessMessage.module.css';

const SuccessMessage = () => {
  /* Hook to navigate to other pages */
  const navigate = useNavigate();

  /* Displays a success toast notification when the component is mounted */
  useEffect(() => {
    toast.success('Your message has been sent successfully!');
  }, []);

  return (
    <section id="success" className="py-4">
      <Container className="px-0">
        <Row className="justify-content-center">
          <Col md={8} lg={6} className="text-center">
            <FontAwesomeIcon
              icon={faCheck}
              size="5x"
              className="my-1 text-success"
            />
            <h2 className={styles.textThankYou}>Thank You!</h2>
            <p className="lead mb-4">
              Your message has been sent successfully.
            </p>
            <hr className="w-75 mx-auto" />
            <Button
              variant="outline-dark"
              size="lg"
              onClick={() => navigate('/')}
              className={styles.customButton}
            >
              <FontAwesomeIcon icon={faRotateLeft} size="lg" className="me-2" />
              Return
            </Button>
          </Col>
        </Row>
      </Container>
      <Toast />
    </section>
  );
};

export default SuccessMessage;
