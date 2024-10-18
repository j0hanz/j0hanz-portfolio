import React, { useState, useCallback } from 'react';
import {
  Navbar,
  Nav,
  Container,
  OverlayTrigger,
  Tooltip,
} from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faLinkedinIn, faGithub } from '@fortawesome/free-brands-svg-icons';
import {
  faUser,
  faCogs,
  faBriefcase,
  faProjectDiagram,
  faEnvelope,
  faGraduationCap,
  faBars,
} from '@fortawesome/free-solid-svg-icons';
import { faFilePdf } from '@fortawesome/free-regular-svg-icons';
import useClickOutsideToggle from '../hooks/OutsideClickHandler';
import styles from './styles/NavBar.module.css';
import ModalCv from './ModalCv';
import navLogo from '../assets/imgBg.png';
import appStyles from '../App.module.css';

const NavBar = () => {
  /* Custom hook to handle the navbar's expanded state and detect clicks outside */
  const { expanded, setExpanded, ref } = useClickOutsideToggle();

  /* State to manage the visibility of the CV modal */
  const [showModal, setShowModal] = useState(false);

  /* Handles opening the CV modal */
  const handleModalOpen = useCallback(() => setShowModal(true), []);

  /* Handles closing the CV modal */
  const handleModalClose = useCallback(() => setShowModal(false), []);

  const navLinks = [
    { id: 'about-me', icon: faUser, label: 'About Me' },
    { id: 'education', icon: faGraduationCap, label: 'Education' },
    { id: 'skills', icon: faCogs, label: 'Skills' },
    { id: 'work-experience', icon: faBriefcase, label: 'Experience' },
    { id: 'portfolio', icon: faProjectDiagram, label: 'Projects' },
    { id: 'contact', icon: faEnvelope, label: 'Contact' },
  ];

  const socialLinks = [
    {
      id: 'linkedin',
      icon: faLinkedinIn,
      href: 'https://www.linkedin.com/in/linus-johansson-software-dev/',
      tooltip: 'LinkedIn Profile',
      iconClass: styles.linkedinIcon,
    },
    {
      id: 'github',
      icon: faGithub,
      href: 'https://github.com/j0hanz',
      tooltip: 'GitHub Profile',
      iconClass: styles.githubIcon,
    },
    {
      id: 'download-pdf',
      icon: faFilePdf,
      onClick: handleModalOpen,
      tooltip: 'Download CV',
      iconClass: styles.pdfIcon,
    },
  ];

  return (
    <>
      <Navbar
        ref={ref}
        fixed="top"
        variant="dark"
        expand="lg"
        className={styles.customNavbar}
        expanded={expanded}
      >
        <Container fluid className="px-2">
          <Nav.Link href="#hero" className="position-relative">
            <img
              src={navLogo}
              className={`position-absolute translate-middle-y top-0 start-0 ${styles.navLogo}`}
              alt="Linus Johansson"
            />
          </Nav.Link>
          <Navbar.Toggle
            aria-controls="navbar-nav"
            onClick={() => setExpanded(!expanded)}
            className={styles.customToggle}
          >
            <FontAwesomeIcon icon={faBars} className={styles.navIconToggle} />
          </Navbar.Toggle>
          <Navbar.Collapse id="navbar-nav">
            <Nav className={`ms-auto my-2 my-lg-0 ${appStyles.cardBgImage}`}>
              {navLinks.map(({ id, icon, label }) => (
                <Nav.Link
                  key={id}
                  href={`#${id}`}
                  className={`${styles.navLink} my-1 my-lg-0`}
                >
                  <FontAwesomeIcon
                    icon={icon}
                    className={`${styles.navIcon} me-2`}
                    fixedWidth
                  />
                  <span className={styles.navLink}>{label}</span>
                </Nav.Link>
              ))}
            </Nav>

            <Nav className="d-flex flex-row justify-content-start">
              {socialLinks.map(
                ({ id, icon, href, onClick, tooltip, iconClass }) => (
                  <OverlayTrigger
                    key={id}
                    placement="bottom"
                    overlay={<Tooltip id={`tooltip-${id}`}>{tooltip}</Tooltip>}
                  >
                    <Nav.Link
                      href={href}
                      onClick={onClick}
                      target={href ? '_blank' : undefined}
                      className="mx-0 mx-lg-0 me-5 me-lg-1 mt-2 mt-lg-0"
                    >
                      <FontAwesomeIcon
                        icon={icon}
                        size="lg"
                        className={`${styles.socialIcon} ${iconClass}`}
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
