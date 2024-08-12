import React from 'react'; // Importing React library
import { Navbar, Nav, Container } from 'react-bootstrap'; // Importing components from react-bootstrap
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'; // Importing FontAwesomeIcon component
import { faLinkedin, faGithub } from '@fortawesome/free-brands-svg-icons'; // Importing specific icons from FontAwesome
import {
  faUser,
  faCogs,
  faBriefcase,
  faProjectDiagram,
  faEnvelope,
  faGraduationCap,
  faFilePdf,
} from '@fortawesome/free-solid-svg-icons'; // Importing specific icons from FontAwesome
import useClickOutsideToggle from '../hooks/OutsideClickHandler'; // Importing custom hook for handling outside click
import styles from './styles/NavBar.module.css'; // Importing CSS module for styling
import Cv from '../assets/Linus_Johansson_CV.pdf'; // Importing the PDF file

// Functional component NavBar
const NavBar = () => {
  const { expanded, setExpanded, ref } = useClickOutsideToggle(); // Destructuring expanded state, setExpanded function, and ref from custom hook

  return (
    <Navbar
      ref={ref} // Reference for detecting outside clicks
      fixed="top" // Fixing the navbar at the top
      bg="dark" // Setting background color to dark
      variant="dark" // Setting variant to dark
      expand="lg" // Enabling navbar to expand on large screens
      className="py-1" // Adding padding to the navbar
      expanded={expanded} // Controlling the expanded state of the navbar
    >
      <Container fluid>
        <Navbar.Brand>
          <span className="text-light">Linus Johansson</span>
        </Navbar.Brand>
        <Navbar.Toggle
          aria-controls="navbar-nav" // ARIA attribute for accessibility
          onClick={() => setExpanded(!expanded)} // Toggling the expanded state on click
        />
        <Navbar.Collapse id="navbar-nav">
          <Nav className="ms-auto">
            {[
              { id: 'about-me', icon: faUser, label: 'About Me' },
              { id: 'education', icon: faGraduationCap, label: 'Education' },
              { id: 'skills', icon: faCogs, label: 'Skills' },
              { id: 'work-experience', icon: faBriefcase, label: 'Experience' },
              { id: 'portfolio', icon: faProjectDiagram, label: 'Projects' },
              { id: 'contact', icon: faEnvelope, label: 'Contact' },
            ].map(({ id, icon, label }) => (
              <Nav.Link key={id} href={`#${id}`}>
                <FontAwesomeIcon icon={icon} className={styles.navIcon} />{' '}
                {label}
              </Nav.Link>
            ))}
          </Nav>
          <Nav className="mr-auto">
            {[
              {
                id: 'linkedin', // ID for the link
                icon: faLinkedin, // Icon for the link
                href: 'https://www.linkedin.com/in/linus-johansson-9b1a302a0/', // URL for the link
              },
              {
                id: 'github',
                icon: faGithub,
                href: 'https://github.com/j0hanz',
              },
              {
                id: 'download-pdf',
                icon: faFilePdf, // Icon for the PDF download
                href: Cv, // Use the imported Cv directly as href
                download: true, // Ensures the file is downloaded
              },
            ].map(({ id, icon, href, download, label }) => (
              <Nav.Link
                key={id}
                href={href}
                target={download ? '_self' : '_blank'} // Open in the same tab if downloading
                className="text-light" // Setting text color to light
                download={download} // Adding download attribute if necessary
              >
                <FontAwesomeIcon icon={icon} size="lg" /> {/* Icon */}
                {label && <span className="ms-2">{label}</span>} {/* Label */}
              </Nav.Link>
            ))}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

// Exporting the NavBar component as default export
export default NavBar;
