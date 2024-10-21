import React, { useCallback } from 'react';
import { Modal, Button, Container } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFilePdf, faTimes } from '@fortawesome/free-solid-svg-icons'; // Import faTimes
import Cv_se from '../assets/Linus_Johansson_CV_sv.pdf';
import Cv_en from '../assets/Linus_Johansson_CV_en.pdf';
import styles from './styles/ModalCv.module.css';
import appStyles from '../App.module.css';

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
      <Modal.Body className={appStyles.modalBody}>
        <Button className={appStyles.closeButton} onClick={handleClose}>
          <FontAwesomeIcon icon={faTimes} />
        </Button>
        <Container className="text-center">
          <h4 className="mb-4">Choose Language</h4>
          <p>
            Please select the language version of the CV you'd like to download:
          </p>
          <div className="d-flex flex-column align-items-center mt-4">
            <Button
              onClick={() => handleDownload(Cv_se, 'Linus_Johansson_CV_sv.pdf')}
              className={`mb-3 ${appStyles.customButtonLight} ${styles.cvButton}`}
            >
              <FontAwesomeIcon
                icon={faFilePdf}
                className={appStyles.buttonIcon}
              />
              <span className={appStyles.buttonText}>Swedish CV</span>
            </Button>
            <Button
              onClick={() => handleDownload(Cv_en, 'Linus_Johansson_CV_en.pdf')}
              className={`${appStyles.customButtonLight} ${styles.cvButton}`}
            >
              <FontAwesomeIcon
                icon={faFilePdf}
                className={appStyles.buttonIcon}
              />
              <span className={appStyles.buttonText}>English CV</span>
            </Button>
          </div>
        </Container>
      </Modal.Body>
    </Modal>
  );
};

export default ModalCv;
