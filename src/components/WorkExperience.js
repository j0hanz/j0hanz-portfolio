import React from 'react';
import { Container, Row, Col, Card } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBriefcase } from '@fortawesome/free-solid-svg-icons';

const experiences = [
  {
    title: 'Assistant Store Manager',
    workplace: 'Webhallen',
    duration: 'March 2022 - February 2024',
    description: [
      'Managed store operations and staff in the absence of the store manager, trained new employees, and handled monthly reports and various administrative tasks.',
    ],
  },
  {
    title: 'Interim Store Manager & Complaints Manager',
    workplace: 'Webhallen',
    duration: 'January 2016 - March 2022',
    description: [
      'Supervised staff, created work schedules, resolved customer complaints, coordinated with suppliers, and reported sales statistics, ensuring smooth overall store operations.',
    ],
  },
  {
    title: 'Delivery Employee',
    workplace: 'Sängbutiken',
    duration: '2011 - 2016',
    description: [
      'Delivered and assembled beds, ensuring customer satisfaction.',
    ],
  },
  {
    title: 'Warehouse Worker',
    workplace: 'House of Saki',
    duration: '2014 - 2016',
    description: [
      'Handled goods receipt and shipping, ensuring accurate item selection and order fulfillment according to the packing list.',
    ],
  },
];

// Functional component ExperienceCard wrapped with React.memo for performance optimization
const ExperienceCard = React.memo(({ experience }) => (
  <Col md={6} className="mb-3">
    <Card className="shadow">
      <Card.Body>
        <Card.Title>{experience.title}</Card.Title>
        <Card.Text>{experience.workplace}</Card.Text>
        <Card.Subtitle className="mb-2 text-black-50">
          {experience.duration}
        </Card.Subtitle>
        <Card.Text>{experience.description}</Card.Text>
      </Card.Body>
    </Card>
  </Col>
));

// Functional component WorkExperience wrapped with React.memo for performance optimization
const WorkExperience = React.memo(() => {
  const experienceCards = experiences.map((experience, index) => (
    <ExperienceCard key={index} experience={experience} />
  ));

  return (
    <section id="work-experience" className="py-5" aria-label="Work Experience">
      <Container className="px-0">
        <h2 className="d-flex justify-content-center align-items-center">
          <FontAwesomeIcon icon={faBriefcase} size="sm" className="me-2" />
          Work Experience
        </h2>
        <Row className="mt-4 mx-auto">{experienceCards}</Row>
      </Container>
    </section>
  );
});

export default WorkExperience;
