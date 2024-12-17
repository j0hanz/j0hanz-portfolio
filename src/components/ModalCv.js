import React, { useCallback } from 'react';
import { Modal, Container } from 'react-bootstrap';
import Cv_se from '../assets/Linus_Johansson_CV_sv.pdf';
import Cv_en from '../assets/Linus_Johansson_CV_en.pdf';
import styles from './styles/ModalCv.module.css';
import appStyles from '../App.module.css';
import { HiXMark } from 'react-icons/hi2';

const ModalCv = ({ show, handleClose }) => {
  const handleDownload = useCallback(
    (cv, fileName) => {
      try {
        const link = document.createElement('a');
        link.href = cv;
        link.download = fileName;
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        handleClose();
      } catch (error) {
        console.error('Download failed:', error);
      }
    },
    [handleClose]
  );

  return (
    <Modal show={show} onHide={handleClose} centered className={styles.modalCv}>
      <Modal.Body className={styles.modalCvBody}>
        <button className={appStyles.closeButton} onClick={handleClose}>
          <HiXMark className={appStyles.xMark} />
        </button>
        <Container className="text-center">
          <h4 className={`${styles.modalCvTitle} mb-4`}>Choose Language</h4>
          <div
            className={`d-flex justify-content-between ${styles.flagContainer}`}
          >
            <span
              className={`fi fi-se ${styles.flagIcon}`}
              onClick={() => handleDownload(Cv_se, 'Linus_Johansson_CV_sv.pdf')}
            ></span>
            <span
              className={`fi fi-gb ${styles.flagIcon}`}
              onClick={() => handleDownload(Cv_en, 'Linus_Johansson_CV_en.pdf')}
            ></span>
          </div>
        </Container>
      </Modal.Body>
    </Modal>
  );
};

export default ModalCv;
