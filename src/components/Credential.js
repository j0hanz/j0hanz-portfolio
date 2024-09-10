import React, { useState, useEffect } from 'react';
import { Modal, Container, Button } from 'react-bootstrap';
import ImageCredential from '../assets/Credential.png';
import styles from './styles/Credential.module.css';
import Spinner from './Spinner';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faScroll } from '@fortawesome/free-solid-svg-icons';

const Credential = ({ show, handleClose }) => {
  const [loading, setLoading] = useState(true);

  // Handle image loading
  useEffect(() => {
    const image = new Image();
    image.src = ImageCredential;
    image.onload = () => {
      setTimeout(() => {
        setLoading(false);
      }, 2500);
    };
  }, []);

  return (
    <Modal show={show} onHide={handleClose} centered>
      <Modal.Header
        closeButton
        closeVariant="white"
        className="bg-dark text-light border-0"
      ></Modal.Header>
      <Modal.Body className="bg-dark text-light p-0">
        <Container className="text-center">
          {loading ? (
            <Spinner />
          ) : (
            <>
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
              <Modal.Footer className="d-flex justify-content-center bg-dark border-0">
                <Button
                  href="https://www.credential.net/dd705ce7-f66c-456a-b07d-e8712cd7287c#gs.cubcle"
                  target="_blank"
                  rel="noopener noreferrer"
                  variant="outline-secondary text-light"
                  className={styles.customButton}
                >
                  <FontAwesomeIcon
                    icon={faScroll}
                    className={styles.buttonIcon}
                  />
                  <span className={styles.buttonText}>View Credential</span>
                </Button>
              </Modal.Footer>
            </>
          )}
        </Container>
      </Modal.Body>
    </Modal>
  );
};

export default Credential;
