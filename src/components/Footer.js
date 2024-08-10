import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faLinkedin, faGithub } from '@fortawesome/free-brands-svg-icons';

const Footer = () => (
  <footer className="py-3 bg-dark text-light">
    <Container className="px-0">
      <Row className="text-center mx-auto">
        <Col>
          <p>&copy; 2024 Linus Johansson. All rights reserved.</p>
          <div>
            <a
              className="text-light mx-2"
              href="https://www.linkedin.com/in/linus-johansson-9b1a302a0/"
              rel="noopener noreferrer"
              target="_blank"
            >
              <FontAwesomeIcon icon={faLinkedin} size="lg" />
            </a>
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

export default Footer;
