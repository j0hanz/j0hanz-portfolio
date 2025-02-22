import React, { useState, useCallback, useRef, memo } from 'react';
import {
  Nav,
  Container,
  OverlayTrigger,
  Tooltip,
  Offcanvas,
} from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { TbLayoutSidebarRightExpandFilled } from 'react-icons/tb';
import styles from './styles/NavBar.module.css';
import ModalCv from './ModalCv';
import navLogo from '@/assets/imgBg.webp';
import appStyles from '@/App.module.css';
import { socialLinks } from '@/data/socialLinks';
import { navLinks } from '@/data/navLinks';
import Button from '@/components/Button';
import useClickOutside from '@/hooks/useClickOutside';

const NavBar: React.FC = () => {
  const [showModal, setShowModal] = useState<boolean>(false);
  const [showOffcanvas, setShowOffcanvas] = useState<boolean>(false);
  const offcanvasRef = useRef<HTMLDivElement>(null);

  // Handlers for opening and closing the modal
  const handleModalOpen = useCallback((): void => setShowModal(true), []);
  const handleModalClose = useCallback((): void => setShowModal(false), []);

  // Handlers for opening and closing the offcanvas
  const handleOffcanvasOpen = useCallback(
    (): void => setShowOffcanvas(true),
    [],
  );
  const handleOffcanvasClose = useCallback(
    (): void => setShowOffcanvas(false),
    [],
  );

  // Use custom hook to detect clicks outside the offcanvas
  useClickOutside(offcanvasRef, handleOffcanvasClose, `.${styles.navLink}`);

  // Component for the navigation logo
  const NavLogo: React.FC = () => (
    <Nav.Link href="#hero" className="position-relative">
      <img
        src={navLogo}
        className={`position-absolute translate-middle-y top-0 start-0 ${styles.navLogo}`}
        alt="Linus Johansson"
      />
    </Nav.Link>
  );

  interface NavbarOffcanvasProps {
    handleModalOpen: () => void;
    handleOffcanvasClose: () => void;
  }

  // Component for the offcanvas menu
  const NavbarOffcanvas: React.FC<NavbarOffcanvasProps> = ({
    handleModalOpen,
    handleOffcanvasClose,
  }) => (
    <Offcanvas
      ref={offcanvasRef}
      show={showOffcanvas}
      onHide={handleOffcanvasClose}
      placement="end"
      className={styles.customOffcanvas}
      data-bs-theme="dark"
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
        <SocialLinks handleModalOpen={handleModalOpen} />
      </Offcanvas.Body>
    </Offcanvas>
  );

  // Component for the navigation links
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

  interface SocialLinksProps {
    handleModalOpen: () => void;
  }

  // Component for the social links
  const SocialLinks: React.FC<SocialLinksProps> = ({ handleModalOpen }) => (
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
              onClick={id === 'download-pdf' ? handleModalOpen : onClick}
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

  return (
    <>
      <Container fluid>
        <div className={styles.navContainer}>
          <Button onClick={handleOffcanvasOpen} className={styles.navToggle}>
            <TbLayoutSidebarRightExpandFilled
              className={styles.navToggleIcon}
            />
          </Button>
          <NavbarOffcanvas
            handleModalOpen={handleModalOpen}
            handleOffcanvasClose={handleOffcanvasClose}
          />
        </div>
      </Container>
      <ModalCv show={showModal} handleClose={handleModalClose} />
    </>
  );
};

export default memo(NavBar);
