import React from 'react';
import {
  Container,
  Row,
  Col,
  Card,
  Button,
  OverlayTrigger,
  Tooltip,
} from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faGithub } from '@fortawesome/free-brands-svg-icons';
import { faProjectDiagram, faRocket } from '@fortawesome/free-solid-svg-icons';
import styles from './styles/Portfolio.module.css';

const projects = [
  {
    title: 'Tech Corner',
    description:
      'A community blog and news site for tech enthusiasts to share and engage with the latest in technology.',
    github: 'https://github.com/j0hanz/tech-corner-website',
    demo: 'https://tech-corner-web-70b84e69e118.herokuapp.com/about/',
  },
  {
    title: 'Blog Beat',
    description:
      'An interactive platform for reading, writing, and engaging with blog posts, designed for bloggers and readers.',
    github: 'https://github.com/j0hanz/blog-beat-web',
    demo: 'https://blog-beat-17c62545ca2a.herokuapp.com/',
  },
  {
    title: 'Pick my Spell',
    description:
      'A fun spelling quiz game where users pick the correct word within 10 seconds, perfect for improving spelling skills.',
    github: 'https://github.com/j0hanz/PICK-my-SPELL',
    demo: 'https://j0hanz.github.io/PICK-my-SPELL/',
  },
  {
    title: 'Fix my Spell',
    description:
      'A console-based game to correct misspelled words, designed to boost spelling and vocabulary in a playful way.',
    github: 'https://github.com/j0hanz/FIX-my-SPELL',
    demo: 'https://fix-my-spell-7e3aef96045e.herokuapp.com/',
  },
  {
    title: 'Corner',
    description:
      'Corner is an upgraded version of Blog Beat, offering more features, better customization, and an improved user experience.',
    github: 'https://github.com/j0hanz/corner',
    demo: '', // No demo link available
  },
];

// Functional component Portfolio
const Portfolio = () => (
  <section id="portfolio" className="py-4">
    <Container className="px-0">
      <h2 className="d-flex justify-content-center align-items-center">
        <FontAwesomeIcon icon={faProjectDiagram} className="me-2" />
        Projects
      </h2>
      <Row className="mt-4 mx-auto">
        {projects.map(({ title, description, github, demo }, index) => (
          <Col md={6} key={index} className="mb-4">
            <Card className={`h-100 ${styles.projectCard}`}>
              <Card.Body>
                <Card.Title className="mb-3">{title}</Card.Title>
                <Card.Text className={styles.description}>
                  {description}
                </Card.Text>
                <div className="d-flex justify-content-between">
                  <Button
                    variant="outline-dark"
                    href={github}
                    target="_blank"
                    className={styles.customButton}
                  >
                    <FontAwesomeIcon
                      icon={faGithub}
                      className={styles.buttonIcon}
                    />
                    <span className={styles.buttonText}>GitHub</span>
                  </Button>
                  {demo ? (
                    <Button
                      variant="outline-primary"
                      href={demo}
                      target="_blank"
                      className={styles.customButton}
                    >
                      <FontAwesomeIcon
                        icon={faRocket}
                        className={styles.buttonIcon}
                      />
                      <span className={styles.buttonText}>Live Demo</span>
                    </Button>
                  ) : (
                    <OverlayTrigger
                      placement="bottom"
                      overlay={
                        <Tooltip id={`tooltip-top`}>Coming soon!</Tooltip>
                      }
                    >
                      <span className="d-inline-block">
                        <Button
                          variant="outline-secondary"
                          disabled
                          className={styles.customButton}
                        >
                          <FontAwesomeIcon
                            icon={faRocket}
                            className={styles.buttonIcon}
                          />
                          <span className={styles.buttonText}>Live Demo</span>
                        </Button>
                      </span>
                    </OverlayTrigger>
                  )}
                </div>
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>
    </Container>
  </section>
);

export default Portfolio;
