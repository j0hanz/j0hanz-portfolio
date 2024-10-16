import React, { useState } from 'react';
import { Container, Row, Col, OverlayTrigger, Tooltip } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faLinkedin,
  faGithub,
  faCreativeCommons,
} from '@fortawesome/free-brands-svg-icons';
import {
  faEnvelope,
  faPhone,
  faFilePdf,
  faCode,
  faAward,
} from '@fortawesome/free-solid-svg-icons';
import styles from './styles/Footer.module.css';
import ModalCv from './ModalCv';

const Footer = () => {
  /* State to manage the visibility of the CV modal */
  const [showModal, setShowModal] = useState(false);

  /* Opens the CV modal */
  const handleModalOpen = () => setShowModal(true);

  /* Closes the CV modal */
  const handleModalClose = () => setShowModal(false);

  return (
    <footer className={`py-3 ${styles.footerBg}`}>
      <Container fluid className="px-2">
        <Row className="mx-auto">
          <Col md={6} className="mb-md-0">
            <h5 className={styles.footerLink}>Contact Details</h5>
            <p>
              <FontAwesomeIcon
                icon={faEnvelope}
                size="sm"
                className={styles.footerIcon}
              />
              <a
                href="mailto:l.johansson93@outlook.com"
                className={`${styles.footerLink} text-decoration-none`}
              >
                l.johansson93@outlook.com
              </a>
            </p>
            <p>
              <FontAwesomeIcon
                icon={faPhone}
                size="sm"
                className={styles.footerIcon}
              />
              <a
                href="tel:+46705292674"
                className={`${styles.footerLink} text-decoration-none`}
              >
                +46 70 529 26 74
              </a>
            </p>
          </Col>
          <Col md={6} className="text-md-end my-1">
            <p className="d-flex align-items-center justify-content-md-end">
              <span className={styles.copyrightText}>
                <FontAwesomeIcon
                  icon={faCreativeCommons}
                  className={styles.footerIcon}
                />
                2024 Linus Johansson
              </span>
            </p>
            <div>
              <OverlayTrigger
                placement="bottom"
                overlay={
                  <Tooltip id="tooltip-linkedin">LinkedIn Profile</Tooltip>
                }
              >
                <a
                  className={`${styles.footerLink} me-4`}
                  href="https://www.linkedin.com/in/linus-johansson-software-dev/"
                  rel="noopener noreferrer"
                  target="_blank"
                  aria-label="LinkedIn Profile"
                >
                  <FontAwesomeIcon icon={faLinkedin} size="lg" />
                </a>
              </OverlayTrigger>

              <OverlayTrigger
                placement="bottom"
                overlay={<Tooltip id="tooltip-github">GitHub Profile</Tooltip>}
              >
                <a
                  className={`${styles.footerLink} me-4`}
                  href="https://github.com/j0hanz"
                  rel="noopener noreferrer"
                  target="_blank"
                  aria-label="GitHub Profile"
                >
                  <FontAwesomeIcon icon={faGithub} size="lg" />
                </a>
              </OverlayTrigger>

              <OverlayTrigger
                placement="bottom"
                overlay={<Tooltip id="tooltip-pdf">Download CV</Tooltip>}
              >
                <a
                  className={`${styles.footerLink} me-4`}
                  onClick={handleModalOpen}
                  style={{ cursor: 'pointer' }}
                  aria-label="Download CV"
                >
                  <FontAwesomeIcon icon={faFilePdf} size="lg" />
                </a>
              </OverlayTrigger>

              <OverlayTrigger
                placement="bottom"
                overlay={
                  <Tooltip id="tooltip-certificate">Certificate</Tooltip>
                }
              >
                <a
                  className={`${styles.footerLink} me-4`}
                  href="https://www.credential.net/dd705ce7-f66c-456a-b07d-e8712cd7287c#gs.cubcle"
                  rel="noopener noreferrer"
                  target="_blank"
                  aria-label="Certificate"
                >
                  <FontAwesomeIcon icon={faAward} size="lg" />
                </a>
              </OverlayTrigger>

              <OverlayTrigger
                placement="bottom"
                overlay={<Tooltip id="tooltip-code">Source Code</Tooltip>}
              >
                <a
                  className={styles.footerLink}
                  href="https://github.com/j0hanz/j0hanz-portfolio"
                  rel="noopener noreferrer"
                  target="_blank"
                  aria-label="Source Code"
                >
                  <FontAwesomeIcon icon={faCode} size="lg" />
                </a>
              </OverlayTrigger>
            </div>
          </Col>
        </Row>
      </Container>
      <ModalCv show={showModal} handleClose={handleModalClose} />
    </footer>
  );
};

export default Footer;
