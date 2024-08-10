import React from 'react'; // Importing React library
import { Container, Row, Col } from 'react-bootstrap'; // Importing components from react-bootstrap
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'; // Importing FontAwesomeIcon component
import { faLinkedin, faGithub } from '@fortawesome/free-brands-svg-icons'; // Importing specific icons from FontAwesome

// Functional component Footer
const Footer = () => (
  // Footer element with padding, dark background, and light text
  <footer className="py-3 bg-dark text-light">
    {/* Bootstrap container with no horizontal padding */}
    <Container className="px-0">
      {/* Bootstrap row centered horizontally with text centered */}
      <Row className="text-center mx-auto">
        {/* Bootstrap column */}
        <Col>
          {/* Paragraph with copyright information */}
          <p>&copy; 2024 Linus Johansson. All rights reserved.</p>
          {/* Div containing social media links */}
          <div>
            {/* LinkedIn link with FontAwesome icon */}
            <a
              className="text-light mx-2"
              href="https://www.linkedin.com/in/linus-johansson-9b1a302a0/"
              rel="noopener noreferrer"
              target="_blank"
            >
              <FontAwesomeIcon icon={faLinkedin} size="lg" />
            </a>
            {/* GitHub link with FontAwesome icon */}
            <a
              className="text-light mx-2"
              href="https://github.com/j0hanz"
              rel="noopener noreferrer"
              target="_blank"
            >
              <FontAwesomeIcon icon={faGithub} size="lg" />
            </a>
          </div>
        </Col>
      </Row>
    </Container>
  </footer>
);

// Exporting the Footer component as default export
export default Footer;
