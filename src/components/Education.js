import React, { useState, useCallback } from 'react';
import { Container, Row, Col, Card, Button } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faGraduationCap,
  faSchool,
  faCalendarAlt,
} from '@fortawesome/free-solid-svg-icons';
import Credential from './Credential';
import styles from './styles/Education.module.css';

const education = [
  {
    title: 'Diploma in Full Stack Software Development',
    school: 'Code Institute',
    duration: 'Feb 2024 - July 2024',
  },
  {
    title: 'Business and Administration Program',
    school: 'Frans Möller Gymnasium',
    duration: '2010 - 2013',
  },
  {
    title: 'Leadership Training',
    school: 'Webhallen',
    duration: '2019',
    description: [
      'Focused on building winning teams through shared values and norms, coaching leadership, effective group dynamics, and clear communication. Emphasized setting and achieving goals with positive habits and behaviors.',
    ],
  },
];

// Functional component Education
const Education = () => {
  const [showModal, setShowModal] = useState(false);

  const toggleModal = useCallback(
    () => setShowModal((prevShowModal) => !prevShowModal),
    [],
  );

  const renderCredentialButton = useCallback(
    (edu, index) =>
      index === 0 && (
        <Button
          variant="outline-primary my-1"
          onClick={toggleModal}
          key={index}
          className={styles.credentialButton}
        >
          Open Credential
        </Button>
      ),
    [toggleModal],
  );

  const renderEducation = useCallback(
    (_, index) => (
      <Col md={6} className="mb-4" key={index}>
        <Card className={`h-100 ${styles.educationCard}`}>
          <Card.Body>
            <Card.Title className="d-flex align-items-center mb-3">
              <FontAwesomeIcon icon={faGraduationCap} className="me-2" />
              <span>{education[index].title}</span>
            </Card.Title>
            <Card.Subtitle className="mb-2 text-muted d-flex align-items-center">
              <FontAwesomeIcon icon={faSchool} className="me-2" />
              <span>{education[index].school}</span>
            </Card.Subtitle>
            <Card.Text className="mb-3 text-muted d-flex align-items-center">
              <FontAwesomeIcon icon={faCalendarAlt} className="me-2" />
              <span>{education[index].duration}</span>
            </Card.Text>
            {education[index].description && (
              <Card.Text className={styles.description}>
                {education[index].description.map((desc, i) => (
                  <p key={i}>{desc}</p>
                ))}
              </Card.Text>
            )}
            {renderCredentialButton(education[index], index)}
          </Card.Body>
        </Card>
      </Col>
    ),
    [renderCredentialButton],
  );

  return (
    <section id="education">
      <Container className="px-0">
        <h2 className="d-flex justify-content-center align-items-center">
          <FontAwesomeIcon icon={faGraduationCap} className="me-3" />
          Education
        </h2>
        <Row className="mt-4 mx-auto">{education.map(renderEducation)}</Row>
        <Credential show={showModal} handleClose={toggleModal} />
      </Container>
    </section>
  );
};

export default Education;
