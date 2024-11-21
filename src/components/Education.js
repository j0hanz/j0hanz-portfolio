import React, { useState } from 'react';
import { Container, Row, Col, Card, Button } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faGraduationCap,
  faSchool,
  faCalendarAlt,
  faAward,
} from '@fortawesome/free-solid-svg-icons';
import Credential from './Credential';
import styles from './styles/Education.module.css';
import appStyles from '../App.module.css';
import ScrollRevealWrapper from './ScrollWrapper';
import education from '../data/education';

const Education = () => {
  /* State to manage the visibility of the credential modal */
  const [showModal, setShowModal] = useState(false);

  /* Toggles the credential modal open or closed */
  const toggleModal = () => setShowModal((prevShowModal) => !prevShowModal);

  /* Renders each education item in a card with title, school, duration, and optional credential */
  const renderEducationItem = (edu, index) => (
    <Col md={6} className="mb-4" key={index}>
      <Card
        className={`h-100 ${styles.educationCard} ${appStyles.cardBgColor}`}
      >
        <Card.Body className={appStyles.cardBody}>
          <Card.Title className="mb-2">
            <span>{edu.title}</span>
          </Card.Title>
          <Card.Subtitle className="mb-3 d-flex align-items-center">
            <span className={appStyles.customBadge}>
              <FontAwesomeIcon size="sm" className="me-2" icon={faSchool} />
              {edu.school}
            </span>
            <span className={appStyles.customBadge}>
              <FontAwesomeIcon
                size="sm"
                className="me-2"
                icon={faCalendarAlt}
              />
              {edu.duration}
            </span>
          </Card.Subtitle>
          {edu.description && (
            <Card.Text className={appStyles.cardText}>
              {edu.description.map((desc, i) => (
                <p key={i}>{desc}</p>
              ))}
            </Card.Text>
          )}
          {edu.hasCredential && (
            <Button onClick={toggleModal} className={styles.btnCredential}>
              <FontAwesomeIcon
                icon={faAward}
                className={styles.certificateIcon}
              />
            </Button>
          )}
        </Card.Body>
      </Card>
    </Col>
  );

  return (
    <ScrollRevealWrapper>
      <section id="education" className={appStyles.sectionPadding}>
        <Container className={appStyles.sectionContainer}>
          <div className={appStyles.sectionTitleContainer}>
            <div>
              <FontAwesomeIcon
                icon={faGraduationCap}
                size="2x"
                className={appStyles.mainIcon}
              />
            </div>
            <h2 className={appStyles.sectionTitle}>Education</h2>
          </div>
          <Row>{education.map(renderEducationItem)}</Row>
          {/* Renders the credential modal if showModal is true */}
          <Credential show={showModal} handleClose={toggleModal} />
        </Container>
      </section>
    </ScrollRevealWrapper>
  );
};

export default Education;
