import React, { useCallback } from 'react';
import { Modal, Button, Container } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faFilePdf,
  faChevronRight,
  faTimes,
} from '@fortawesome/free-solid-svg-icons'; // Import faTimes
import Cv_se from '../assets/Linus_Johansson_CV_sv.pdf';
import Cv_en from '../assets/Linus_Johansson_CV_en.pdf';
import styles from './styles/ModalCv.module.css';

const ModalCv = ({ show, handleClose }) => {
  /* Handles the download of the selected CV by creating a link element and triggering the download */
  const handleDownload = useCallback(
    (cv, fileName) => {
      const link = document.createElement('a');
      link.href = cv;
      link.download = fileName;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      handleClose();
    },
    [handleClose]
  );

  return (
    <Modal show={show} onHide={handleClose} centered>
      <Modal.Body className={`text-light p-4 ${styles.modalBody}`}>
        <button className={styles.closeButton} onClick={handleClose}>
          <FontAwesomeIcon icon={faTimes} />
        </button>
        <Container className="text-center">
          <h4 className="mb-4">Choose Language</h4>
          <p>
            Please select the language version of the CV you'd like to download:
          </p>
          <div className="d-flex flex-column align-items-center mt-4">
            <Button
              onClick={() => handleDownload(Cv_se, 'Linus_Johansson_CV_sv.pdf')}
              variant="outline-light"
              className={`mb-3 ${styles.customButton}`}
            >
              <FontAwesomeIcon icon={faFilePdf} className="me-1" />
              Swedish CV
              <FontAwesomeIcon icon={faChevronRight} className="ms-1" />
            </Button>
            <Button
              onClick={() => handleDownload(Cv_en, 'Linus_Johansson_CV_en.pdf')}
              variant="outline-light"
              className={styles.customButton}
            >
              <FontAwesomeIcon icon={faFilePdf} className="me-1" />
              English CV
              <FontAwesomeIcon icon={faChevronRight} className="ms-1" />
            </Button>
          </div>
        </Container>
      </Modal.Body>
    </Modal>
  );
};

export default ModalCv;
