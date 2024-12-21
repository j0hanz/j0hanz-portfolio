import React from 'react';
import { Modal, Container } from 'react-bootstrap';
import ProfileImage from '../assets/image_me.webp';
import styles from './styles/ImageModal.module.css';
import appStyles from '../App.module.css';
import { HiXMark } from 'react-icons/hi2';
import Spinner from './Spinner';
import useLoading from '../hooks/useLoading';

const ImageModal = ({ show, handleClose }) => {
  /* Use custom hook to check if the image is loading */
  const loading = useLoading(ProfileImage);

  return (
    <Modal show={show} onHide={handleClose} centered>
      <Modal.Body className={styles.imageModalBody}>
        <button className={appStyles.closeButton} onClick={handleClose}>
          <HiXMark className={appStyles.xMark} />
        </button>
        <Container className="p-0 text-center">
          {loading ? (
            <Spinner />
          ) : (
            <img
              src={ProfileImage}
              alt="Linus Johansson"
              className={styles.fullScreenImage}
            />
          )}
        </Container>
      </Modal.Body>
    </Modal>
  );
};

export default ImageModal;
