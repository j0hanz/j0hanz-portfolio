import React, { useState, useCallback } from 'react';
import { Container, Row, Col, Card, Button } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faGraduationCap } from '@fortawesome/free-solid-svg-icons';
import Credential from './Credential'; // Import the Credential component

const education = [
  {
    title: 'Diploma in Full Stack Software Development',
    duration: 'Feb 2024 - July 2024',
  },
  {
    title: 'Leadership Training',
    duration: '2019',
    description: [
      'Focused on building winning teams through shared values and norms, coaching leadership, effective group dynamics, and clear communication. Emphasized setting and achieving goals with positive habits and behaviors.',
    ],
  },
  {
    title: 'Business and Administration Program',
    duration: '2010 - 2013',
  },
];

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
          variant="outline-primary text-white my-1"
          onClick={toggleModal}
          key={index}
        >
          Open Credential
        </Button>
      ),
    [toggleModal],
  );

  const renderEducation = useCallback(
    (edu, index) => (
      <Col md={6} className="mb-4" key={index}>
        <Card className="shadow bg-dark text-light">
          <Card.Body>
            <Card.Title>{edu.title}</Card.Title>
            <Card.Subtitle className="mb-2 text-white-50">
              {edu.duration}
            </Card.Subtitle>
            {edu.description && (
              <Card.Text>
                {edu.description.map((desc, i) => (
                  <p key={i}>{desc}</p>
                ))}
              </Card.Text>
            )}
            {renderCredentialButton(edu, index)}
          </Card.Body>
        </Card>
      </Col>
    ),
    [renderCredentialButton],
  );

  return (
    <section id="education" className="py-5 text-light">
      <Container className="px-0">
        <h2>
          <FontAwesomeIcon icon={faGraduationCap} size="sm" className="me-2" />
          Education
        </h2>
        <Row className="mt-4 mx-auto">{education.map(renderEducation)}</Row>
        <Credential show={showModal} handleClose={toggleModal} />
      </Container>
    </section>
  );
};

export default Education;
