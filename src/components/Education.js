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

const education = [
  {
    title: 'Diploma in Full Stack Software Development',
    school: 'Code Institute',
    duration: 'Feb 2024 - July 2024',
    hasCredential: true,
  },
  {
    title: 'Business and Administration Program',
    school: 'Frans Möller Gymnasium',
    duration: '2010 - 2013',
    hasCredential: false,
  },
  {
    title: 'Leadership Training',
    school: 'Webhallen',
    duration: '2019',
    description: [
      'Building successful teams through norms, values, and coaching leadership.',
    ],
    hasCredential: false,
  },
];

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
        <Card.Body>
          <Card.Title className="d-flex align-items-center mb-3">
            <FontAwesomeIcon
              icon={faGraduationCap}
              className={styles.experienceIcon}
            />
            <span>{edu.title}</span>
          </Card.Title>
          <Card.Subtitle className="mb-1 text-muted d-flex align-items-center">
            <FontAwesomeIcon
              icon={faSchool}
              className={styles.experienceIcon}
            />
            <span>{edu.school}</span>
          </Card.Subtitle>
          <div className="mb-3 text-muted d-flex align-items-center">
            <FontAwesomeIcon
              icon={faCalendarAlt}
              className={styles.experienceIcon}
            />
            <span>{edu.duration}</span>
          </div>
          {edu.description && (
            <div className={styles.description}>
              {edu.description.map((desc, i) => (
                <p key={i}>{desc}</p>
              ))}
            </div>
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
    <section id="education" className="py-5">
      <Container className="px-0">
        <div className="d-flex justify-content-center align-items-center">
          <div>
            <FontAwesomeIcon
              icon={faGraduationCap}
              size="2x"
              className={appStyles.mainIcon}
            />
          </div>
          <h2 className={appStyles.sectionTitle}>Education</h2>
        </div>
        <Row className="mt-3 mx-auto">{education.map(renderEducationItem)}</Row>
        {/* Renders the credential modal if showModal is true */}
        <Credential show={showModal} handleClose={toggleModal} />
      </Container>
    </section>
  );
};

export default Education;
