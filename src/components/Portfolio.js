import React from 'react';
import { Container, Row, Col, Card, Button } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faProjectDiagram } from '@fortawesome/free-solid-svg-icons';

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
];

const Portfolio = () => (
  <section id="portfolio" className="portfolio-section py-5 text-light">
    <Container className="px-0">
      <h2 className="text-center">
        <FontAwesomeIcon icon={faProjectDiagram} size="sm" className="me-2" />
        Projects
      </h2>
      <Row className="mt-4 mx-auto">
        {projects.map((project, index) => (
          <Col md={6} key={index} className="mb-4">
            <Card className="shadow bg-dark text-light">
              <Card.Body>
                <Card.Title>{project.title}</Card.Title>
                <Card.Text>{project.description}</Card.Text>
                <Button
                  variant="outline-light"
                  href={project.github}
                  target="_blank"
                  className="me-2"
                >
                  GitHub
                </Button>
                <Button
                  variant="outline-primary text-white"
                  href={project.demo}
                  target="_blank"
                >
                  Live Demo
                </Button>
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>
    </Container>
  </section>
);

export default Portfolio;
