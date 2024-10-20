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
    duration: 'Mar 2022 - Feb 2024',
    description:
      'Managed store operations and staff in the absence of the store manager, trained new employees, and handled monthly reports and various administrative tasks.',
  },
  {
    title: 'Interim Store Manager & Complaints Manager',
    workplace: 'Webhallen',
    duration: 'Jan 2016 - Mar 2022',
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
        <Card.Body className={appStyles.cardBody}>
          <Card.Title className="d-flex align-items-center mb-2">
            <FontAwesomeIcon
              icon={faBriefcase}
              className={appStyles.titleIcon}
            />
            <span>{experience.title}</span>
          </Card.Title>
          <Card.Subtitle className="mb-3 d-flex align-items-center">
            <span className={appStyles.customBadge}>
              <FontAwesomeIcon size="sm" className="me-2" icon={faBuilding} />
              {experience.workplace}
            </span>
            <span className={appStyles.customBadge}>
              <FontAwesomeIcon
                size="sm"
                className="me-2"
                icon={faCalendarAlt}
              />
              {experience.duration}
            </span>
          </Card.Subtitle>
          <Card.Text className={appStyles.cardText}>
            {experience.description}
          </Card.Text>
        </Card.Body>
      </Card>
    </Col>
  );

  return (
    <section id="work-experience" className={appStyles.sectionPadding}>
      <Container className={appStyles.sectionContainer}>
        <div className={appStyles.sectionTitleContainer}>
          <div>
            <FontAwesomeIcon
              icon={faBriefcase}
              size="2x"
              className={appStyles.mainIcon}
            />
          </div>
          <h2 className={appStyles.sectionTitle}>Work Experience</h2>
        </div>
        <Row className="mt-2 mx-auto">{experiences.map(renderExperience)}</Row>
      </Container>
    </section>
  );
};

export default WorkExperience;
