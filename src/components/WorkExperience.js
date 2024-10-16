import React from 'react';
import { Container, Row, Col, Card } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faBriefcase,
  faBuilding,
  faCalendarAlt,
} from '@fortawesome/free-solid-svg-icons';
import styles from './styles/WorkExperience.module.css';
import appStyles from '../App.module.css';

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
    description: 'Delivery and assembly of beds at customer locations.',
  },
  {
    title: 'Warehouse Worker',
    workplace: 'House of Saki',
    duration: '2014 - 2016',
    description:
      'Handled goods receipt and shipping, ensuring accurate item selection and order fulfillment according to the packing list.',
  },
];

const WorkExperience = () => {
  /* Renders each work experience as a card with title, workplace, duration, and description */
  const renderExperience = (experience, index) => (
    <Col md={6} className="mb-4" key={index}>
      <Card
        className={`h-100 ${styles.experienceCard} ${appStyles.cardBgColor}`}
      >
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

  return (
    <section id="work-experience" className="py-5">
      <Container className="px-0">
        <div className="d-flex justify-content-center align-items-center">
          <div>
            <FontAwesomeIcon
              icon={faBriefcase}
              size="2x"
              className={appStyles.mainIcon}
            />
          </div>
          <h2 className={appStyles.sectionTitle}>Work Experience</h2>
        </div>
        <Row className="mt-3 mx-auto">{experiences.map(renderExperience)}</Row>
      </Container>
    </section>
  );
};

export default WorkExperience;
