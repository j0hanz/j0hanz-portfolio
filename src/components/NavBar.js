import React, { useState, useCallback } from 'react';
import {
  Navbar,
  Nav,
  Container,
  OverlayTrigger,
  Tooltip,
} from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faLinkedin, faGithub } from '@fortawesome/free-brands-svg-icons';
import {
  faUser,
  faCogs,
  faBriefcase,
  faProjectDiagram,
  faEnvelope,
  faGraduationCap,
  faFilePdf,
  faBars,
} from '@fortawesome/free-solid-svg-icons';
import useClickOutsideToggle from '../hooks/OutsideClickHandler';
import styles from './styles/NavBar.module.css';
import ModalCv from './ModalCv';

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
      icon: faLinkedin,
      href: 'https://www.linkedin.com/in/linus-johansson-software-dev/',
      tooltip: 'LinkedIn Profile',
    },
    {
      id: 'github',
      icon: faGithub,
      href: 'https://github.com/j0hanz',
      tooltip: 'GitHub Profile',
    },
    {
      id: 'download-pdf',
      icon: faFilePdf,
      onClick: handleModalOpen,
      tooltip: 'Download CV',
    },
  ];

  return (
    <>
      <Navbar
        ref={ref}
        fixed="top"
        variant="dark"
        expand="lg"
        className={`${styles.customNavbar} py-1`}
        expanded={expanded}
      >
        <Container fluid className="px-2">
          <Navbar.Brand className={styles.navbarBrand}>
            <Nav.Link href="#hero" className={styles.nameNav}>
              Linus Johansson
            </Nav.Link>
          </Navbar.Brand>
          <Navbar.Toggle
            aria-controls="navbar-nav"
            onClick={() => setExpanded(!expanded)}
            className={styles.customToggle}
          >
            <FontAwesomeIcon icon={faBars} className={styles.navToggle} />
          </Navbar.Toggle>
          <Navbar.Collapse id="navbar-nav">
            <Nav className="ms-auto my-1 my-lg-0">
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
              {socialLinks.map(({ id, icon, href, onClick, tooltip }) => (
                <OverlayTrigger
                  key={id}
                  placement="bottom"
                  overlay={<Tooltip id={`tooltip-${id}`}>{tooltip}</Tooltip>}
                >
                  <Nav.Link
                    href={href}
                    onClick={onClick}
                    target={href ? '_blank' : undefined}
                    className="mx-0 mx-lg-0 me-5 me-lg-0 mt-2 mt-lg-0"
                  >
                    <FontAwesomeIcon icon={icon} size="lg" />
                  </Nav.Link>
                </OverlayTrigger>
              ))}
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
      <ModalCv show={showModal} handleClose={handleModalClose} />
    </>
  );
};

export default NavBar;
