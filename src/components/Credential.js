import React, { useState, useEffect } from 'react';
import { Modal, Container, Button } from 'react-bootstrap';
import ImageCredential from '../assets/Credential.png';
import styles from './styles/Credential.module.css';
import Spinner from './Spinner';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTimes } from '@fortawesome/free-solid-svg-icons';
import appStyles from '../App.module.css';

const Credential = ({ show, handleClose }) => {
  /* State to manage the loading state of the credential image */
  const [loading, setLoading] = useState(true);

  /* Effect to load the image and simulate a delay before displaying it */
  useEffect(() => {
    const image = new Image();
    image.src = ImageCredential;
    image.onload = () => {
      setTimeout(() => setLoading(false), 2500); // Simulates loading delay
    };
  }, []);

  return (
    <Modal show={show} onHide={handleClose} centered>
      <Modal.Body className={appStyles.modalBody}>
        <Button className={appStyles.closeButton} onClick={handleClose}>
          <FontAwesomeIcon icon={faTimes} />
        </Button>
        <Container className="text-center">
          {loading ? (
            <Spinner />
          ) : (
            <a
              href="https://www.credential.net/dd705ce7-f66c-456a-b07d-e8712cd7287c#gs.cubcle"
              target="_blank"
              rel="noopener noreferrer"
              className={styles.credentialLink}
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
          )}
        </Container>
      </Modal.Body>
    </Modal>
  );
};

export default Credential;
