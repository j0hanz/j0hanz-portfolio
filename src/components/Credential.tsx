import { FC, memo } from 'react';
import { Modal, Container } from 'react-bootstrap';
import ImageCredential from '@/assets/Credential.webp';
import { HiXMark, HiArrowTopRightOnSquare } from 'react-icons/hi2';
import styles from './styles/Credential.module.css';
import appStyles from '@/App.module.css';
import Spinner from './Spinner';
import useLoading from '@/hooks/useLoading';

interface CredentialProps {
  show: boolean;
  handleClose: () => void;
}

// Component for displaying a credential
const Credential: FC<CredentialProps> = ({ show, handleClose }) => {
  const loading = useLoading();

  return (
    <Modal show={show} onHide={handleClose} centered>
      <Modal.Body className={styles.credentialBody}>
        <button className={appStyles.closeButton} onClick={handleClose}>
          <HiXMark className={appStyles.xMark} />
        </button>
        <Container className="text-center px-0">
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
                  className={styles.credentialImage}
                />
                <div className={styles.hoverText}>
                  <HiArrowTopRightOnSquare className={styles.hoverTextIcon} />
                  View Credential
                </div>
              </div>
            </a>
          )}
        </Container>
      </Modal.Body>
    </Modal>
  );
};

export default memo(Credential);
