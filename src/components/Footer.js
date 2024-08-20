import React from 'react';
import { Container, Row, Col, OverlayTrigger, Tooltip } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faLinkedin, faGithub } from '@fortawesome/free-brands-svg-icons';
import {
  faEnvelope,
  faPhone,
  faFilePdf,
  faCode,
} from '@fortawesome/free-solid-svg-icons';
import Cv from '../assets/Linus_Johansson_CV.pdf';
import styles from './styles/Footer.module.css';

const Footer = () => (
  <footer className="py-3 bg-dark text-light">
    <Container>
      <Row className="mx-auto">
        <Col md={6} className="mb-1 mb-md-0">
          <h5>Contact Details</h5>
          <p>
            <FontAwesomeIcon icon={faEnvelope} className={styles.footerIcon} />
            <a
              href="mailto:l.johansson93@outlook.com"
              className="text-light text-decoration-none"
            >
              l.johansson93@outlook.com
            </a>
          </p>
          <p>
            <FontAwesomeIcon icon={faPhone} className={styles.footerIcon} />
            <a
              href="tel:+46705292674"
              className="text-light text-decoration-none"
            >
              +46 70 529 26 74
            </a>
          </p>
        </Col>
        <Col md={6} className="text-md-end">
          <p>&copy; 2024 Linus Johansson. All rights reserved.</p>
          <div>
            <OverlayTrigger
              placement="bottom"
              overlay={
                <Tooltip id="tooltip-linkedin">LinkedIn Profile</Tooltip>
              }
            >
              <a
                className="text-light me-3"
                href="https://www.linkedin.com/in/linus-johansson-software-dev/"
                rel="noopener noreferrer"
                target="_blank"
              >
                <FontAwesomeIcon icon={faLinkedin} size="xl" />
              </a>
            </OverlayTrigger>
            <OverlayTrigger
              placement="bottom"
              overlay={<Tooltip id="tooltip-github">GitHub Profile</Tooltip>}
            >
              <a
                className="text-light me-3"
                href="https://github.com/j0hanz"
                rel="noopener noreferrer"
                target="_blank"
              >
                <FontAwesomeIcon icon={faGithub} size="xl" />
              </a>
            </OverlayTrigger>
            <OverlayTrigger
              placement="bottom"
              overlay={<Tooltip id="tooltip-pdf">Download CV</Tooltip>}
            >
              <a className="text-light me-3" href={Cv} download={true}>
                <FontAwesomeIcon icon={faFilePdf} size="xl" />
              </a>
            </OverlayTrigger>
            <OverlayTrigger
              placement="bottom"
              overlay={<Tooltip id="tooltip-code">Source Code</Tooltip>}
            >
              <a
                className="text-light"
                href="https://github.com/j0hanz/j0hanz-portfolio"
                rel="noopener noreferrer"
                target="_blank"
              >
                <FontAwesomeIcon icon={faCode} />
              </a>
            </OverlayTrigger>
          </div>
        </Col>
      </Row>
    </Container>
  </footer>
);

export default Footer;
