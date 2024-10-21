import React from 'react';
import { Modal, Button, Container } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheck, faTimes } from '@fortawesome/free-solid-svg-icons';
import appStyles from '../App.module.css';
import Toast from './Toast';
import styles from './styles/SuccessMessage.module.css';

const SuccessMessage = ({ show, onClose }) => {
  return (
    <Modal show={show} onHide={onClose} centered>
      <Modal.Body className={appStyles.modalBody}>
        <Button className={appStyles.closeButton} onClick={onClose}>
          <FontAwesomeIcon icon={faTimes} />
        </Button>
        <Container className="text-center">
          <h2 className="mb-4">Thank You!</h2>
          <FontAwesomeIcon
            icon={faCheck}
            size="5x"
            className={`my-3 ${styles.successIcon}`}
          />
          <p className="lead mb-4">Your message has been sent successfully.</p>
        </Container>
      </Modal.Body>
    </Modal>
  );
};

export default SuccessMessage;
