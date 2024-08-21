import React from 'react';
import { Container, Row, Col, Card } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faBriefcase,
  faBuilding,
  faCalendarAlt,
} from '@fortawesome/free-solid-svg-icons';
import styles from './styles/WorkExperience.module.css';

const experiences = [
  {
    title: 'Assistant Store Manager',
    workplace: 'Webhallen',
    duration: 'March 2022 - February 2024',
    description:
      'Managed store operations and staff in the absence of the store manager, trained new employees, and handled monthly reports and various administrative tasks.',
  },
  {
    title: 'Interim Store Manager & Complaints Manager',
    workplace: 'Webhallen',
    duration: 'January 2016 - March 2022',
    description:
      'Supervised staff, created work schedules, resolved customer complaints, coordinated with suppliers, and reported sales statistics, ensuring smooth overall store operations.',
  },
  {
    title: 'Delivery Employee',
    workplace: 'Sängbutiken',
    duration: '2011 - 2016',
    description:
      'Delivered and assembled beds, ensuring customer satisfaction.',
  },
  {
    title: 'Warehouse Worker',
    workplace: 'House of Saki',
    duration: '2014 - 2016',
    description:
      'Handled goods receipt and shipping, ensuring accurate item selection and order fulfillment according to the packing list.',
  },
];

// ExperienceCard Component
const ExperienceCard = ({ experience }) => (
  <Col md={6} className="mb-4">
    <Card className={`h-100 ${styles.experienceCard}`}>
      <Card.Body>
        <Card.Title className="d-flex align-items-center mb-3">
          <FontAwesomeIcon
            icon={faBriefcase}
            className={styles.experienceIcon}
          />
          <span>{experience.title}</span>
        </Card.Title>
        <Card.Subtitle className="mb-1 text-muted d-flex align-items-center">
          <FontAwesomeIcon
            icon={faBuilding}
            className={styles.experienceIcon}
          />
          <span>{experience.workplace}</span>
        </Card.Subtitle>
        <Card.Text className="mb-3 text-muted d-flex align-items-center">
          <FontAwesomeIcon
            icon={faCalendarAlt}
            className={styles.experienceIcon}
          />
          <span>{experience.duration}</span>
        </Card.Text>
        <Card.Text className={styles.description}>
          {experience.description}
        </Card.Text>
      </Card.Body>
    </Card>
  </Col>
);

// WorkExperience Component
const WorkExperience = () => (
  <section id="work-experience">
    <Container className="px-0">
      <h2 className="d-flex justify-content-center align-items-center">
        <FontAwesomeIcon icon={faBriefcase} className="me-3" />
        Work Experience
      </h2>
      <Row className="mt-4 mx-auto">
        {experiences.map((experience, index) => (
          <ExperienceCard key={index} experience={experience} />
        ))}
      </Row>
    </Container>
  </section>
);

export default WorkExperience;
