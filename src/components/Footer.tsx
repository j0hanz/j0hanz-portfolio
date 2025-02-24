import { useState, FC } from 'react';
import { Container, Row, Col, OverlayTrigger, Tooltip } from 'react-bootstrap';
import { HiOutlineEnvelope } from 'react-icons/hi2';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCreativeCommons } from '@fortawesome/free-brands-svg-icons';
import styles from './styles/Footer.module.css';
import ModalCv from './ModalCv';
import appStyles from '../App.module.css';
import { socialLinks } from '../data/socialLinks';

const Footer: FC = () => {
  const [showModal, setShowModal] = useState<boolean>(false);

  // Handlers for opening and closing the modal
  const handleModalOpen = (): void => setShowModal(true);
  const handleModalClose = (): void => setShowModal(false);

  return (
    <footer className={styles.footerBg}>
      <Container fluid className={appStyles.cardBgImage}>
        <Row className="mx-auto">
          <Col sm={6}>
            <div className={`pb-3 ${styles.footerLinkHeader}`}>
              Contact Details
            </div>
            <HiOutlineEnvelope className={styles.footerIcon} />
            <a
              href="mailto:l.johansson93@outlook.com"
              className={`${styles.footerLink} text-decoration-none`}
            >
              l.johansson93@outlook.com
            </a>
          </Col>
          <Col sm={6} className="text-sm-end mt-2">
            <div className="d-flex align-items-center justify-content-sm-end pb-3">
              <FontAwesomeIcon
                icon={faCreativeCommons}
                className={styles.footerIcon}
              />
              <small className={appStyles.copyrightText}>Copyright 2025</small>
            </div>
            <div className="mt-4 mt-sm-0">
              <Row
                className={`${styles.footerSocialIcons} d-flex justify-content-sm-end flex-row justify-content-between`}
              >
                {socialLinks.map(
                  ({
                    id,
                    icon,
                    href,
                    onClick,
                    tooltip,
                    iconClass,
                  }: {
                    id: string;
                    icon: any;
                    href?: string;
                    onClick?: () => void;
                    tooltip: string;
                    iconClass: string;
                  }) => (
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
                  ),
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
