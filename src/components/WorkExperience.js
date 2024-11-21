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
import ScrollRevealWrapper from './ScrollWrapper';
import experiences from '../data/experiences';

const WorkExperience = () => {
  const renderExperience = (experience, index) => (
    <Col md={6} className="mb-4" key={index}>
      <Card
        className={`h-100 ${styles.experienceCard} ${appStyles.cardBgColor}`}
      >
        <Card.Body className={appStyles.cardBody}>
          <Card.Title className={`${appStyles.cardHeader} mb-2`}>
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
    <ScrollRevealWrapper>
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
    </ScrollRevealWrapper>
  );
};

export default WorkExperience;
