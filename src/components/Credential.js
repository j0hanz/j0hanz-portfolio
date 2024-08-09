import React from 'react';
import { Modal, Container, Button } from 'react-bootstrap';
import ImageCredential from '../assets/Credential.png';
import styles from './styles/Credential.module.css'; // Import the CSS module

const Credential = ({ show, handleClose }) => {
  return (
    <>
      <Modal show={show} onHide={handleClose} centered size="lg">
        <Modal.Header
          closeButton
          closeVariant="white"
          className="bg-dark text-light"
        >
          <Modal.Title>Credential</Modal.Title>
        </Modal.Header>
        <Modal.Body className="bg-dark text-light">
          <Container className="text-center">
            <a
              href="https://www.credential.net/dd705ce7-f66c-456a-b07d-e8712cd7287c#gs.cubcle"
              target="_blank"
              rel="noopener noreferrer"
            >
              <div className={styles.credentialImageContainer}>
                <img
                  src={ImageCredential}
                  alt="Credential"
                  className={`img-fluid rounded ${styles.credentialImage}`}
                />
                <div className={styles.hoverText}>View Credential</div>
              </div>
            </a>
            <Button
              href="https://www.credential.net/dd705ce7-f66c-456a-b07d-e8712cd7287c#gs.cubcle"
              target="_blank"
              rel="noopener noreferrer"
              variant="outline-primary btn-lg text-white my-2"
              className={`mt-3 ${styles.mobileButton}`}
            >
              View Credential
            </Button>
          </Container>
        </Modal.Body>
      </Modal>
    </>
  );
};

export default Credential;
