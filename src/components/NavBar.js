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
} from '@fortawesome/free-solid-svg-icons';
import useClickOutsideToggle from '../hooks/OutsideClickHandler';

const NavBar = () => {
  const { expanded, setExpanded, ref } = useClickOutsideToggle();

  return (
    <Navbar
      ref={ref}
      fixed="top"
      bg="dark"
      variant="dark"
      expand="lg"
      className="py-1"
      expanded={expanded}
    >
      <Container fluid>
        <Navbar.Brand>
          <span className="text-light">Linus Johansson</span>
        </Navbar.Brand>
        <Navbar.Toggle
          aria-controls="navbar-nav"
          onClick={() => setExpanded(!expanded)}
        />
        <Navbar.Collapse id="navbar-nav">
          <Nav className="ms-auto">
            {[
              {
                id: 'about-me',
                icon: faUser,
                label: 'About Me',
              },
              {
                id: 'education',
                icon: faGraduationCap,
                label: 'Education',
              },
              {
                id: 'skills',
                icon: faCogs,
                label: 'Skills',
              },
              {
                id: 'work-experience',
                icon: faBriefcase,
                label: 'Experience',
              },
              {
                id: 'portfolio',
                icon: faProjectDiagram,
                label: 'Projects',
              },
              {
                id: 'contact',
                icon: faEnvelope,
                label: 'Contact',
              },
            ].map(({ id, icon, label }) => (
              <Nav.Link key={id} href={`#${id}`}>
                <FontAwesomeIcon icon={icon} className="me-2" />
                {label}
              </Nav.Link>
            ))}
          </Nav>
          <Nav className="mr-auto">
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
            ].map(({ id, icon, href }) => (
              <Nav.Link
                key={id}
                href={href}
                target="_blank"
                className="text-light"
              >
                <FontAwesomeIcon icon={icon} size="lg" />
              </Nav.Link>
            ))}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default NavBar;
