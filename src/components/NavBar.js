import React, { useState, useCallback } from 'react';
import {
  Navbar,
  Nav,
  Container,
  OverlayTrigger,
  Tooltip,
} from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBarsStaggered, faXmark } from '@fortawesome/free-solid-svg-icons';
import useClickOutsideToggle from '../hooks/OutsideClickHandler';
import styles from './styles/NavBar.module.css';
import ModalCv from './ModalCv';
import navLogo from '../assets/imgBg.webp';
import appStyles from '../App.module.css';
import { socialLinks } from '../data/socialLinks';
import { navLinks } from '../data/navLinks';

const NavBar = () => {
  /* Custom hook to handle the navbar's expanded state and detect clicks outside */
  const { expanded, setExpanded, ref } = useClickOutsideToggle(() => {
    setIsMenuOpen(false);
    setExpanded(false);
  });

  /* State to manage the visibility of the navbar */
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  /* State to manage the visibility of the CV modal */
  const [showModal, setShowModal] = useState(false);

  /* Handles opening the CV modal */
  const handleModalOpen = useCallback(() => setShowModal(true), []);

  /* Handles closing the CV modal */
  const handleModalClose = useCallback(() => setShowModal(false), []);

  /* Handles closing the navbar when a navlink is clicked */
  const handleNavLinkClick = () => {
    setExpanded(false);
    setIsMenuOpen(false);
  };

  return (
    <>
      <Navbar
        ref={ref}
        fixed="top"
        variant="dark"
        expand="lg"
        className={`${styles.customNavbar} px-0 py-2`}
        expanded={expanded}
      >
        <Container fluid className="pe-1">
          <Nav.Link href="#hero" className="position-relative">
            <img
              src={navLogo}
              className={`position-absolute translate-middle-y top-0 start-0 ${styles.navLogo}`}
              alt="Linus Johansson"
            />
          </Nav.Link>
          <Navbar.Toggle
            aria-controls="navbar-nav"
            onClick={() => {
              setExpanded(!expanded);
              setIsMenuOpen(!isMenuOpen);
            }}
            className={styles.customToggle}
          >
            <FontAwesomeIcon
              icon={isMenuOpen ? faXmark : faBarsStaggered}
              className={`${styles.navIconToggle} ${isMenuOpen ? styles.open : ''}`}
            />
          </Navbar.Toggle>
          <Navbar.Collapse id="navbar-nav">
            <Nav className={`ms-auto my-1 my-lg-0 ${appStyles.cardBgImage}`}>
              {navLinks.map(({ id, icon: Icon, label }) => (
                <Nav.Link
                  key={id}
                  href={`#${id}`}
                  className={`${styles.navLink} my-2 my-lg-0 ms-lg-2`}
                  onClick={handleNavLinkClick}
                >
                  <Icon className={`${styles.navIcon} me-lg-2 me-3`} />
                  <span className={styles.navLinkText}>{label}</span>
                </Nav.Link>
              ))}
            </Nav>
            <Nav className="d-flex flex-row justify-content-between justify-content-sm-start ms-lg-2">
              {socialLinks.map(
                ({ id, icon, href, onClick, tooltip, iconClass }) => (
                  <OverlayTrigger
                    key={id}
                    placement="bottom"
                    overlay={
                      <Tooltip
                        id={`tooltip-${id}`}
                        className={appStyles.customTooltip}
                      >
                        {tooltip}
                      </Tooltip>
                    }
                  >
                    <Nav.Link
                      href={href}
                      onClick={
                        id === 'download-pdf' ? handleModalOpen : onClick
                      }
                      target={href ? '_blank' : undefined}
                      className={`ms-lg-0 ms-1 me-lg-0 me-sm-5 me-2 mt-3 mt-lg-0 ${id === 'certificate' || id === 'source-code' ? 'd-lg-none' : ''}`}
                    >
                      <FontAwesomeIcon
                        icon={icon}
                        className={`${appStyles.socialIcon} ${iconClass} px-0`}
                      />
                    </Nav.Link>
                  </OverlayTrigger>
                )
              )}
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
      <ModalCv show={showModal} handleClose={handleModalClose} />
    </>
  );
};

export default NavBar;
