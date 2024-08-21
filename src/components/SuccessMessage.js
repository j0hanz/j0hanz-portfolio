import React, { useEffect } from 'react';
import { Container, Row, Col, Button } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheckCircle } from '@fortawesome/free-solid-svg-icons';
import { toast } from 'react-toastify';
import Toast from './Toast'; // Import the Notifications component

// Functional component SuccessMessage
const SuccessMessage = () => {
  const navigate = useNavigate();

  useEffect(() => {
    toast.success('Your message has been sent successfully!');
  }, []);

  return (
    <section id="success" className="py-5">
      <Container className="px-0">
        <Row className="justify-content-center mt-4 mx-auto">
          <Col md={8} className="text-center">
            <FontAwesomeIcon icon={faCheckCircle} size="4x" className="mb-4" />
            <h2 className="mb-3">Thank You!</h2>
            <p className="lead mb-4">
              Your message has been sent successfully.
            </p>
            <Button
              variant="outline-dark"
              size="lg"
              onClick={() => navigate('/')}
            >
              Go Back to Home
            </Button>
          </Col>
        </Row>
      </Container>
      <Toast />
    </section>
  );
};

export default SuccessMessage;
