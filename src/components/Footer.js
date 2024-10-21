import React, { useState } from 'react';
import { Container, Row, Col, OverlayTrigger, Tooltip } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faLinkedinIn,
  faGithub,
  faCreativeCommons,
} from '@fortawesome/free-brands-svg-icons';
import { faEnvelope, faCode, faAward } from '@fortawesome/free-solid-svg-icons';
import { faFilePdf } from '@fortawesome/free-regular-svg-icons';
import styles from './styles/Footer.module.css';
import ModalCv from './ModalCv';
import appStyles from '../App.module.css';

const Footer = () => {
  /* State to manage the visibility of the CV modal */
  const [showModal, setShowModal] = useState(false);

  /* Opens the CV modal */
  const handleModalOpen = () => setShowModal(true);

  /* Closes the CV modal */
  const handleModalClose = () => setShowModal(false);

  return (
    <footer className={styles.footerBg}>
      <Container
        fluid
        className={`${appStyles.sectionContainer} ${appStyles.cardBgImage}`}
      >
        <Row className="mx-auto">
          <Col sm={6} className="mb-sm-0">
            <h5 className={styles.footerLinkHeader}>Contact Details</h5>
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
          </Col>
          <Col sm={6} className="text-sm-end my-1">
            <p className="d-flex align-items-center justify-content-sm-end">
              <FontAwesomeIcon
                icon={faCreativeCommons}
                className={styles.footerIcon}
              />
              <small className={styles.copyrightText}>
                2024 Linus Johansson
              </small>
            </p>
            <div className="mt-4 mt-sm-0 mx-auto">
              <Row className="justify-content-sm-end">
                <Col xs="auto" className="mb-2 mb-sm-0">
                  <OverlayTrigger
                    placement="top"
                    overlay={
                      <Tooltip
                        id="tooltip-linkedin"
                        className={appStyles.customTooltip}
                      >
                        LinkedIn Profile
                      </Tooltip>
                    }
                  >
                    <a
                      href="https://www.linkedin.com/in/linus-johansson-software-dev/"
                      rel="noopener noreferrer"
                      target="_blank"
                      aria-label="LinkedIn Profile"
                    >
                      <FontAwesomeIcon
                        icon={faLinkedinIn}
                        size="lg"
                        className={`${styles.footerIcon} ${styles.linkedinIcon}`}
                      />
                    </a>
                  </OverlayTrigger>
                </Col>
                <Col xs="auto" className="mb-2 mb-sm-0">
                  <OverlayTrigger
                    placement="top"
                    overlay={
                      <Tooltip
                        id="tooltip-github"
                        className={appStyles.customTooltip}
                      >
                        GitHub Profile
                      </Tooltip>
                    }
                  >
                    <a
                      href="https://github.com/j0hanz"
                      rel="noopener noreferrer"
                      target="_blank"
                      aria-label="GitHub Profile"
                    >
                      <FontAwesomeIcon
                        icon={faGithub}
                        size="lg"
                        className={`${styles.footerIcon} ${styles.githubIcon}`}
                      />
                    </a>
                  </OverlayTrigger>
                </Col>
                <Col xs="auto" className="mb-2 mb-sm-0">
                  <OverlayTrigger
                    placement="top"
                    overlay={
                      <Tooltip
                        id="tooltip-pdf"
                        className={appStyles.customTooltip}
                      >
                        Download CV
                      </Tooltip>
                    }
                  >
                    <a
                      onClick={handleModalOpen}
                      style={{ cursor: 'pointer' }}
                      aria-label="Download CV"
                    >
                      <FontAwesomeIcon
                        icon={faFilePdf}
                        size="lg"
                        className={`${styles.footerIcon} ${styles.pdfIcon}`}
                      />
                    </a>
                  </OverlayTrigger>
                </Col>
                <Col xs="auto" className="mb-2 mb-sm-0">
                  <OverlayTrigger
                    placement="top"
                    overlay={
                      <Tooltip
                        id="tooltip-certificate"
                        className={appStyles.customTooltip}
                      >
                        Certificate
                      </Tooltip>
                    }
                  >
                    <a
                      href="https://www.credential.net/dd705ce7-f66c-456a-b07d-e8712cd7287c#gs.cubcle"
                      rel="noopener noreferrer"
                      target="_blank"
                      aria-label="Certificate"
                    >
                      <FontAwesomeIcon
                        icon={faAward}
                        size="lg"
                        className={`${styles.footerIcon} ${styles.certificateIcon}`}
                      />
                    </a>
                  </OverlayTrigger>
                </Col>
                <Col xs="auto" className="px-2">
                  <OverlayTrigger
                    placement="top"
                    overlay={
                      <Tooltip
                        id="tooltip-code"
                        className={appStyles.customTooltip}
                      >
                        Source Code
                      </Tooltip>
                    }
                  >
                    <a
                      href="https://github.com/j0hanz/j0hanz-portfolio"
                      rel="noopener noreferrer"
                      target="_blank"
                      aria-label="Source Code"
                    >
                      <FontAwesomeIcon
                        icon={faCode}
                        size="lg"
                        className={`${styles.footerIcon} ${styles.sourceCodeIcon}`}
                      />
                    </a>
                  </OverlayTrigger>
                </Col>
              </Row>
            </div>
          </Col>
        </Row>
      </Container>
      <ModalCv show={showModal} handleClose={handleModalClose} />
    </footer>
  );
};

export default Footer;
