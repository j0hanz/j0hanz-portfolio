import React from 'react';
import { Container, Row, Col, Card } from 'react-bootstrap';
import { HiMiniBriefcase } from 'react-icons/hi2';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBuilding, faCalendarAlt } from '@fortawesome/free-solid-svg-icons';
import styles from './styles/WorkExperience.module.css';
import appStyles from '../App.module.css';
import ScrollRevealWrapper from '../components/ScrollWrapper';
import experiences from '../data/experiences';

const WorkExperience = () => {
  const renderExperience = (experience, index) => (
    <Col lg={6} className="mb-4" key={index}>
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
              <HiMiniBriefcase className={appStyles.mainIcon} />
            </div>
            <div className={appStyles.sectionTitle}>Experience</div>
          </div>
          <Row>{experiences.map(renderExperience)}</Row>
        </Container>
      </section>
    </ScrollRevealWrapper>
  );
};

export default WorkExperience;
