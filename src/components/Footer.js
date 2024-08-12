import React from 'react'; // Importing React library
import { Container, Row, Col } from 'react-bootstrap'; // Importing components from react-bootstrap
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'; // Importing FontAwesomeIcon component
import { faLinkedin, faGithub } from '@fortawesome/free-brands-svg-icons'; // Importing specific icons from FontAwesome
import {
  faEnvelope,
  faPhone,
  faFilePdf,
} from '@fortawesome/free-solid-svg-icons'; // Importing specific icons from FontAwesome
import Cv from '../assets/Linus_Johansson_CV.pdf'; // Importing the PDF file

// Functional component Footer
const Footer = () => (
  // Footer element with padding, dark background, and light text
  <footer className="py-3 bg-dark text-light">
    {/* Bootstrap container with no horizontal padding */}
    <Container fluid className="px-0">
      {/* Bootstrap row centered horizontally with text centered */}
      <Row className="text-center mx-auto">
        {/* Bootstrap column for contact details and social media links */}
        <Col md={6}>
          <h5>Contact Details</h5>
          <p>
            <FontAwesomeIcon icon={faEnvelope} className="me-2" />
            golfarenlj@gmail.com
          </p>
          <p>
            <FontAwesomeIcon icon={faPhone} className="me-2" />
            +46 70 529 26 74
          </p>
        </Col>
        {/* Bootstrap column for copyright information */}
        <Col md={6}>
          <p>&copy; 2024 Linus Johansson. All rights reserved.</p>
          <div>
            {/* LinkedIn link with FontAwesome icon */}
            <a
              className="text-light"
              href="https://www.linkedin.com/in/linus-johansson-9b1a302a0/"
              rel="noopener noreferrer"
              target="_blank"
            >
              <FontAwesomeIcon icon={faLinkedin} size="2x" />
            </a>
            {/* GitHub link with FontAwesome icon */}
            <a
              className="text-light mx-4"
              href="https://github.com/j0hanz"
              rel="noopener noreferrer"
              target="_blank"
            >
              <FontAwesomeIcon icon={faGithub} size="2x" />
            </a>
            <a
              className="text-light"
              id="download-pdf"
              href={Cv} // Use the imported Cv directly as href
              download={true} // Ensures the file is downloaded
            >
              <FontAwesomeIcon icon={faFilePdf} size="2x" />
            </a>
          </div>
        </Col>
      </Row>
    </Container>
  </footer>
);

// Exporting the Footer component as default export
export default Footer;
