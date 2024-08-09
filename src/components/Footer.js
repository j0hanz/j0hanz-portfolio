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
              href="https://www.linkedin.com/in/linus-johansson-9b1a302a0/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-light mx-2"
            >
              <FontAwesomeIcon icon={faLinkedin} size="lg" />
            </a>
            <a
              href="https://github.com/j0hanz"
              target="_blank"
              rel="noopener noreferrer"
              className="text-light mx-2"
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
