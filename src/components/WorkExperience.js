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
    description: [
      'Managed store operations and staff in the absence of the store manager',
      'Training of new staff and scheduling responsibilities',
      'Monthly reporting and handling administrative tasks',
    ],
  },
  {
    title: 'RMA | Salesperson',
    workplace: 'Webhallen',
    duration: 'Jan 2016 - Mar 2022',
    description: [
      'Customer service and support',
      'Resolved customer complaints and issues',
      'Sales of electronics and computer hardware',
    ],
  },
  {
    title: 'Delivery Employee',
    workplace: 'Sängbutiken',
    duration: '2011 - 2016',
    description: [
      'Delivery and assembly of beds at customer locations.',
      'Responsible for goods reception and quality control.',
    ],
  },
  {
    title: 'Warehouse Worker',
    workplace: 'House of Saki',
    duration: '2014 - 2016',
    description: [
      'Responsible for in and outbound delivery of goods.',
      'Picking and packing goods according to order.',
    ],
  },
];

const WorkExperience = () => {
  const renderExperience = (experience, index) => (
    <Col md={6} className="mb-4" key={index}>
      <Card
        className={`h-100 ${styles.experienceCard} ${appStyles.cardBgColor}`}
      >
        <Card.Body className={appStyles.cardBody}>
          <Card.Title className="mb-2">
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
          <ul className={`${styles.listItems} ${appStyles.cardText}`}>
            {experience.description.map((item, i) => (
              <li key={i}>
                <small>{item}</small>
              </li>
            ))}
          </ul>
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
        <Row>{experiences.map(renderExperience)}</Row>
      </Container>
    </section>
  );
};

export default WorkExperience;
