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
} from '@fortawesome/free-solid-svg-icons'; // Importing specific icons from FontAwesome
import useClickOutsideToggle from '../hooks/OutsideClickHandler'; // Importing custom hook for handling outside click
import styles from './styles/NavBar.module.css'; // Importing CSS module for styling

// Functional component NavBar
const NavBar = () => {
  // Destructuring expanded state, setExpanded function, and ref from custom hook
  const { expanded, setExpanded, ref } = useClickOutsideToggle();

  return (
    // Navbar component from react-bootstrap with various props for styling and behavior
    <Navbar
      ref={ref} // Reference for detecting outside clicks
      fixed="top" // Fixing the navbar at the top
      bg="dark" // Setting background color to dark
      variant="dark" // Setting variant to dark
      expand="lg" // Enabling navbar to expand on large screens
      className="py-1" // Adding padding to the navbar
      expanded={expanded} // Controlling the expanded state of the navbar
    >
      {/* Bootstrap container with fluid width */}
      <Container fluid>
        {/* Navbar brand with text */}
        <Navbar.Brand>
          <span className="text-light">Linus Johansson</span>
        </Navbar.Brand>
        {/* Navbar toggle button for collapsing/expanding the navbar */}
        <Navbar.Toggle
          aria-controls="navbar-nav" // ARIA attribute for accessibility
          onClick={() => setExpanded(!expanded)} // Toggling the expanded state on click
        />
        {/* Navbar collapse component for collapsible content */}
        <Navbar.Collapse id="navbar-nav">
          {/* Bootstrap nav component aligned to the right */}
          <Nav className="ms-auto">
            {/* Mapping through an array of navigation items */}
            {[
              {
                id: 'about-me', // ID for the section
                icon: faUser, // Icon for the section
                label: 'About Me', // Label for the section
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
              // Nav link for each navigation item
              <Nav.Link key={id} href={`#${id}`}>
                <FontAwesomeIcon icon={icon} className={styles.navIcon} />{' '}
                {/* Icon */}
                {label} {/* Label */}
              </Nav.Link>
            ))}
          </Nav>
          {/* Bootstrap nav component aligned to the left */}
          <Nav className="mr-auto">
            {/* Mapping through an array of social media links */}
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
            ].map(({ id, icon, href }) => (
              // Nav link for each social media link
              <Nav.Link
                key={id}
                href={href}
                target="_blank" // Opening the link in a new tab
                className="text-light" // Setting text color to light
              >
                <FontAwesomeIcon icon={icon} size="lg" /> {/* Icon */}
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
