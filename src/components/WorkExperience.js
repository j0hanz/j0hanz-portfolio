import React from 'react';
import { Container, Row, Col, Card } from 'react-bootstrap';

const experiences = [
  {
    title: 'Frontend Developer at XYZ Corp',
    duration: 'Jan 2022 - Present',
    description: 'Developed and maintained web applications using React...',
  },
  {
    title: 'Backend Developer at ABC Ltd',
    duration: 'Jun 2020 - Dec 2021',
    description: 'Worked on API development and database management...',
  },
];

const WorkExperience = () => (
  <section id="work-experience" className="experience-section py-5 text-light">
    <Container>
      <h2 className="text-center">Experience</h2>
      <Row className="mt-4">
        {experiences.map((experience, index) => (
          <Col md={6} key={index} className="mb-4">
            <Card className="shadow bg-secondary text-light">
              <Card.Body>
                <Card.Title>{experience.title}</Card.Title>
                <Card.Subtitle className="mb-2 text-muted">
                  {experience.duration}
                </Card.Subtitle>
                <Card.Text>{experience.description}</Card.Text>
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>
    </Container>
  </section>
);

export default WorkExperience;
