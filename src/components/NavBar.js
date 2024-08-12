import React from 'react';
import { Navbar, Nav, Container } from 'react-bootstrap';
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
import Cv from '../assets/Linus_Johansson_CV.pdf';

const NavBar = () => {
  const { expanded, setExpanded, ref } = useClickOutsideToggle();

  return (
    <Navbar
      ref={ref}
      fixed="top"
      bg="dark"
      variant="dark"
      expand="lg"
      className={`${styles.customNavbar} py-1`}
      expanded={expanded}
    >
      <Container fluid>
        <Navbar.Brand className={styles.navbarBrand}>
          <span className="text-light">Linus Johansson</span>
        </Navbar.Brand>
        <Navbar.Toggle
          aria-controls="navbar-nav"
          onClick={() => setExpanded(!expanded)}
          className={styles.customToggle}
        >
          <FontAwesomeIcon icon={faBars} size="lg" className={styles.navIcon} />
        </Navbar.Toggle>
        <Navbar.Collapse id="navbar-nav" className={styles.navbarCollapse}>
          <Nav className="ms-auto">
            {[
              { id: 'about-me', icon: faUser, label: 'About Me' },
              { id: 'education', icon: faGraduationCap, label: 'Education' },
              { id: 'skills', icon: faCogs, label: 'Skills' },
              { id: 'work-experience', icon: faBriefcase, label: 'Experience' },
              { id: 'portfolio', icon: faProjectDiagram, label: 'Projects' },
              { id: 'contact', icon: faEnvelope, label: 'Contact' },
            ].map(({ id, icon, label }) => (
              <Nav.Link key={id} href={`#${id}`} className={styles.navLink}>
                <FontAwesomeIcon icon={icon} className={styles.navIcon} />{' '}
                {label}
              </Nav.Link>
            ))}
          </Nav>
          <Nav className="ml-auto">
            {[
              {
                id: 'linkedin',
                icon: faLinkedin,
                href: 'https://www.linkedin.com/in/linus-johansson-9b1a302a0/',
              },
              {
                id: 'github',
                icon: faGithub,
                href: 'https://github.com/j0hanz',
              },
              {
                id: 'download-pdf',
                icon: faFilePdf,
                href: Cv,
                download: true,
                label: 'CV',
              },
            ].map(({ id, icon, href, download, label }) => (
              <Nav.Link
                key={id}
                href={href}
                target={download ? '_self' : '_blank'}
                className={styles.navLink}
                download={download}
              >
                <FontAwesomeIcon icon={icon} size="lg" className="me-2" />
                {label && <span>{label}</span>}
              </Nav.Link>
            ))}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default NavBar;
