import React, { useState } from 'react';
import {
  Nav,
  Container,
  OverlayTrigger,
  Tooltip,
  Offcanvas,
} from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { HiOutlineBars3 } from 'react-icons/hi2';
import styles from './styles/NavBar.module.css';
import ModalCv from './ModalCv';
import navLogo from '@/assets/imgBg.webp';
import appStyles from '@/App.module.css';
import { socialLinks } from '@/data/socialLinks';
import { navLinks } from '@/data/navLinks';
import Button from '@/components/Button';
import useNavLinkClose from '@/hooks/useNavLinkClose';

// Navbar component with Offcanvas menu
const NavBar: React.FC = () => {
  // Modal state
  const [showModal, setShowModal] = useState(false);
  const openModal = () => setShowModal(true);
  const closeModal = () => setShowModal(false);

  // Offcanvas state
  const [showOffcanvas, setShowOffcanvas] = useState(false);
  const openOffcanvas = () => setShowOffcanvas(true);
  const closeOffcanvas = () => setShowOffcanvas(false);

  // Close Offcanvas on nav link click
  useNavLinkClose(showOffcanvas, `.${styles.navLink}`, closeOffcanvas);

  // Logo
  const NavLogo: React.FC = () => (
    <Nav.Link href="#hero" className="position-relative">
      <img
        src={navLogo}
        alt="Linus Johansson"
        className={`position-absolute translate-middle-y top-0 start-0 ${styles.navLogo}`}
      />
    </Nav.Link>
  );

  // Nav links
  const NavLinks: React.FC = () => (
    <Nav className={`${styles.customOffcanvasNav} ${appStyles.cardBgImage}`}>
      {navLinks.map(({ id, icon: Icon, label }) => (
        <Nav.Link key={id} href={`#${id}`} className={styles.navLink}>
          <Icon className={`${styles.navIcon} me-3`} />
          <span className={styles.navLinkText}>{label}</span>
        </Nav.Link>
      ))}
    </Nav>
  );

  // Social links
  interface SocialLinksProps {
    openModal: () => void;
  }

  const SocialLinks: React.FC<SocialLinksProps> = ({ openModal }) => (
    <div className={styles.customOffcanvasSocialLinks}>
      <Nav className="d-flex flex-row justify-content-between">
        {socialLinks.map(({ id, icon, href, onClick, tooltip, iconClass }) => (
          <OverlayTrigger
            key={id}
            placement="top"
            overlay={
              <Tooltip id={`tooltip-${id}`} className={appStyles.customTooltip}>
                {tooltip}
              </Tooltip>
            }
          >
            <Nav.Link
              href={href}
              onClick={id === 'download-pdf' ? openModal : onClick}
              target={href ? '_blank' : undefined}
              className={styles.socialLink}
            >
              <FontAwesomeIcon
                icon={icon}
                className={`${appStyles.socialIcon} ${iconClass}`}
              />
            </Nav.Link>
          </OverlayTrigger>
        ))}
      </Nav>
    </div>
  );

  // Offcanvas menu
  const OffcanvasMenu: React.FC = () => (
    <Offcanvas
      show={showOffcanvas}
      onHide={closeOffcanvas}
      placement="end"
      backdrop
      data-bs-theme="dark"
      className={styles.customOffcanvas}
    >
      <Offcanvas.Header closeButton className={styles.customOffcanvasHeader}>
        <NavLogo />
        <Offcanvas.Title
          id="offcanvasNavbarLabel"
          className={styles.offcanvasTitle}
        >
          Menu
        </Offcanvas.Title>
      </Offcanvas.Header>
      <Offcanvas.Body className={styles.customOffcanvasBody}>
        <NavLinks />
        <hr className="my-2" />
        <SocialLinks openModal={openModal} />
      </Offcanvas.Body>
    </Offcanvas>
  );

  return (
    <>
      <Container fluid>
        <div className={styles.navContainer}>
          <div
            onClick={openOffcanvas}
            className={styles.navToggle}
            role="button"
            aria-label="Toggle navigation"
            tabIndex={0}
            onKeyDown={(e) => {
              if (e.key === 'Enter' || e.key === ' ') {
                openOffcanvas();
              }
            }}
          >
            <HiOutlineBars3 className={styles.navToggleIcon} />
          </div>
          <OffcanvasMenu />
        </div>
      </Container>

      <ModalCv show={showModal} handleClose={closeModal} />
    </>
  );
};

export default NavBar;
