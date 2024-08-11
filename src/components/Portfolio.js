import React from 'react'; // Importing React library
import { Container, Row, Col, Card, Button } from 'react-bootstrap'; // Importing components from react-bootstrap
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'; // Importing FontAwesomeIcon component
import { faProjectDiagram } from '@fortawesome/free-solid-svg-icons'; // Importing specific icon from FontAwesome

// Array of project objects containing title, description, GitHub link, and demo link
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

// Functional component Portfolio
const Portfolio = () => (
  // Section element with id and classes for styling
  <section id="portfolio" className="portfolio-section py-5">
    {/* Bootstrap container with no horizontal padding */}
    <Container className="px-0">
      {/* Heading with FontAwesome icon and centered text */}
      <h2 className="text-center">
        <FontAwesomeIcon icon={faProjectDiagram} size="sm" className="me-2" />
        Projects
      </h2>
      {/* Bootstrap row with top margin and centered horizontally */}
      <Row className="mt-4 mx-auto">
        {/* Mapping through the projects array to render each project */}
        {projects.map(({ title, description, github, demo }, index) => (
          // Bootstrap column with medium size 6 and bottom margin
          <Col md={6} key={index} className="mb-4">
            {/* Bootstrap card with shadow, dark background, and light text */}
            <Card className="shadow">
              <Card.Body>
                {/* Card title with project title */}
                <Card.Title className="mb-3">{title}</Card.Title>
                {/* Card text with project description */}
                <Card.Text>{description}</Card.Text>
                {/* Button linking to GitHub repository */}
                <Button
                  variant="outline-dark float-start"
                  href={github}
                  target="_blank"
                  className="me-2"
                >
                  GitHub
                </Button>
                {/* Button linking to live demo */}
                <Button
                  variant="outline-primary float-end"
                  href={demo}
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

// Exporting the Portfolio component as default export
export default Portfolio;
