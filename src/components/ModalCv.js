import React from 'react';
import { Modal, Button, Container } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFilePdf, faChevronRight } from '@fortawesome/free-solid-svg-icons';
import Cv_se from '../assets/Linus_Johansson_CV_sv.pdf';
import Cv_en from '../assets/Linus_Johansson_CV_en.pdf';
import styles from './styles/ModalCv.module.css';

const ModalCv = ({ show, handleClose }) => {
  const handleDownload = (cv) => {
    const link = document.createElement('a');
    link.href = cv;
    link.download =
      cv === Cv_se ? 'Linus_Johansson_CV.pdf' : 'Linus_Johansson_CV_Eng.pdf';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    handleClose();
  };

  return (
    <Modal show={show} onHide={handleClose} centered>
      <Modal.Header
        closeButton
        closeVariant="white"
        className="bg-dark text-light border-0"
      ></Modal.Header>
      <Modal.Body className="bg-dark text-light p-0">
        <Container className="text-center">
          <h4 className="mb-4">Choose Language</h4>
          <p>
            Please select the language version of the CV you'd like to download:
          </p>
          <div className="d-flex flex-column align-items-center my-4">
            <Button
              onClick={() => handleDownload(Cv_se)}
              variant="outline-light"
              className={`mb-3 ${styles.customButton}`}
            >
              <FontAwesomeIcon icon={faFilePdf} className="me-1" />
              Swedish CV
              <FontAwesomeIcon icon={faChevronRight} className="ms-1" />
            </Button>
            <Button
              onClick={() => handleDownload(Cv_en)}
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
