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

const NavBar = () => (
  <Navbar fixed="top" bg="dark" variant="dark" expand="lg" className="py-1">
    <Container fluid>
      <Navbar.Brand>
        <span className="text-light">Linus Johansson</span>
      </Navbar.Brand>
      <Navbar.Toggle aria-controls="navbar-nav" />
      <Navbar.Collapse id="navbar-nav">
        <Nav className="ms-auto">
          <Nav.Link href="#about-me">
            <FontAwesomeIcon icon={faUser} className="me-2" />
            About Me
          </Nav.Link>
          <Nav.Link href="#skills">
            <FontAwesomeIcon icon={faCogs} className="me-2" />
            Skills
          </Nav.Link>
          <Nav.Link href="#work-experience">
            <FontAwesomeIcon icon={faBriefcase} className="me-2" />
            Experience
          </Nav.Link>
          <Nav.Link href="#education">
            <FontAwesomeIcon icon={faGraduationCap} className="me-2" />
            Education
          </Nav.Link>
          <Nav.Link href="#portfolio">
            <FontAwesomeIcon icon={faProjectDiagram} className="me-2" />
            Projects
          </Nav.Link>
          <Nav.Link href="#contact">
            <FontAwesomeIcon icon={faEnvelope} className="me-2" />
            Contact
          </Nav.Link>
        </Nav>
        <Nav className="mr-auto">
          <Nav.Link
            href="https://www.linkedin.com/in/linus-johansson-9b1a302a0/"
            target="_blank"
            className="text-light"
          >
            <FontAwesomeIcon icon={faLinkedin} size="lg" />
          </Nav.Link>
          <Nav.Link
            href="https://github.com/j0hanz"
            target="_blank"
            className="text-light"
          >
            <FontAwesomeIcon icon={faGithub} size="lg" />
          </Nav.Link>
        </Nav>
      </Navbar.Collapse>
    </Container>
  </Navbar>
);

export default NavBar;
