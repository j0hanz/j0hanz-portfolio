import React from 'react';
import { Container, Row, Col, Card } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBriefcase } from '@fortawesome/free-solid-svg-icons';

const experiences = [
  {
    title: 'Assistant Store Manager',
    duration: 'March 2022 - February 2024',
    description: [
      'Managed store operations and staff in the absence of the manager, trained new employees, and handled monthly reports and various tasks.',
    ],
  },
  {
    title: 'Interim Store Manager & Complaints Manager',
    duration: 'January 2016 - March 2022',
    description: [
      'Oversaw staff, created work schedules, resolved customer complaints, coordinated with suppliers, and reported sales statistics while managing overall store operations.',
    ],
  },
  {
    title: 'Delivery & Warehouse Staff',
    duration: '2011 - 2016',
    description: [
      'Delivered and assembled furniture, managed goods reception and inspection, handled complaints and returns, dispatched goods, and picked items based on order slips.',
    ],
  },
];

const WorkExperience = () => (
  <section id="work-experience" className="py-5 text-light">
    <Container className="px-0">
      <h2>
        <FontAwesomeIcon icon={faBriefcase} size="sm" className="me-2" />
        Work Experience
      </h2>
      <Row className="mt-4 mx-auto">
        {experiences.map((experience, index) => (
          <Col md={6} className="mb-4" key={index}>
            <Card className="shadow bg-dark text-light">
              <Card.Body>
                <Card.Title>{experience.title}</Card.Title>
                <Card.Subtitle className="mb-2 text-white-50">
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
