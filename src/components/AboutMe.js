import React, { useState } from 'react';
import { Container, Row, Col, Card, Button } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser, faAward } from '@fortawesome/free-solid-svg-icons';
import Credential from './Credential';
import styles from './styles/AboutMe.module.css';

const aboutMeContent = [
  {
    title: 'Full Stack Developer',
    description:
      'Recently completed a course, sharpening skills in modern web technologies.',
    hasCredential: true,
  },
  {
    title: 'Sales & Customer Service',
    description:
      'Over eight years of experience in customer relations, project management, and teamwork.',
    hasCredential: false,
  },
  {
    title: 'Leadership',
    description:
      'Proven leadership as a store and claims manager, focused on achieving goals.',
    hasCredential: false,
  },
  {
    title: 'Tech Enthusiast',
    description:
      'Passionate about technology and eager to apply programming skills in team settings.',
    hasCredential: false,
  },
  {
    title: 'Continuous Learner',
    description:
      'Always seeking growth and excited to solve challenges in a dynamic environment.',
    hasCredential: false,
  },
];

const AboutMe = () => {
  /* State to manage whether the credential modal is shown or not */
  const [showModal, setShowModal] = useState(false);

  /* Toggles the visibility of the credential modal */
  const toggleModal = () => setShowModal(!showModal);

  return (
    <section id="about-me" className="py-4">
      <Container>
        <h2 className={`text-center ${styles.sectionTitle}`}>
          <FontAwesomeIcon icon={faUser} className="me-2" />
          About Me
        </h2>
        <Row className="justify-content-center mt-4">
          <Col md={8}>
            <Card className={`p-3 shadow ${styles.aboutMeCard}`}>
              <Card.Body>
                <Card.Text className={styles.cardText}>
                  Passionate about technology and equipped with over eight years
                  of experience in sales and management. After recently
                  completing a Full-Stack Developer program, I'm ready to
                  combine my technical skills with my leadership background to
                  contribute to a collaborative team.
                </Card.Text>
                <ul className="mt-4 list-unstyled ms-3">
                  {aboutMeContent.map((item, index) => (
                    <li key={index} className="my-4">
                      <strong className="d-block">{item.title}:</strong>
                      {item.description}
                      {item.hasCredential && (
                        <Button
                          variant="outline-warning text-dark d-block my-2"
                          onClick={toggleModal}
                          aria-controls="credential-modal"
                          aria-expanded={showModal}
                          className={styles.credentialButton}
                        >
                          <FontAwesomeIcon
                            icon={faAward}
                            className={styles.buttonIcon}
                          />
                          <span className={styles.buttonText}>
                            Open Credential
                          </span>
                        </Button>
                      )}
                    </li>
                  ))}
                </ul>
              </Card.Body>
            </Card>
          </Col>
        </Row>
        <Credential show={showModal} handleClose={toggleModal} />
      </Container>
    </section>
  );
};

export default AboutMe;
