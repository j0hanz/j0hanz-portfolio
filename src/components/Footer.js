import React, { useState } from 'react';
import { Container, Row, Col, OverlayTrigger, Tooltip } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCreativeCommons } from '@fortawesome/free-brands-svg-icons';
import { faEnvelope } from '@fortawesome/free-solid-svg-icons';
import styles from './styles/Footer.module.css';
import ModalCv from './ModalCv';
import appStyles from '../App.module.css';
import { socialLinks } from '../data/socialLinks';

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
        <Row className="d-flex justify-content-center align-items-center mx-auto">
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
              <small className={appStyles.copyrightText}>
                2024 Linus Johansson
              </small>
            </p>
            <div className="mt-4 mt-sm-0 mx-auto">
              <Row className="d-flex justify-content-sm-end flex-row justify-content-between">
                {socialLinks.map(
                  ({ id, icon, href, onClick, tooltip, iconClass }) => (
                    <Col xs="auto" className="mb-2 mb-sm-0" key={id}>
                      <OverlayTrigger
                        placement="top"
                        overlay={
                          <Tooltip
                            id={`tooltip-${id}`}
                            className={appStyles.customTooltip}
                          >
                            {tooltip}
                          </Tooltip>
                        }
                      >
                        <a
                          href={href}
                          onClick={
                            id === 'download-pdf' ? handleModalOpen : onClick
                          }
                          target={href ? '_blank' : undefined}
                          rel="noopener noreferrer"
                          aria-label={tooltip}
                          style={{ cursor: href ? 'pointer' : 'default' }}
                        >
                          <FontAwesomeIcon
                            icon={icon}
                            size="lg"
                            className={iconClass}
                          />
                        </a>
                      </OverlayTrigger>
                    </Col>
                  )
                )}
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
