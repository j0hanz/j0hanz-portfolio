import React, { useState } from 'react';
import { Container, Row, Col, Card, Button } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser, faAward } from '@fortawesome/free-solid-svg-icons';
import Credential from './Credential';
import styles from './styles/AboutMe.module.css';
import appStyles from '../App.module.css';

const aboutMeContent = [
  {
    title: 'Full Stack Developer',
    description:
      'Recently completed a course, sharpening skills in modern web technologies.',
    hasCredential: true,
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
        <div className="d-flex justify-content-center align-items-center">
          <div>
            <FontAwesomeIcon
              icon={faUser}
              size="2x"
              className={appStyles.mainIcon}
            />
          </div>
          <h2 className={appStyles.sectionTitle}>About Me</h2>
        </div>
        <Row className="justify-content-center mt-4 mx-auto">
          <Col md={8}>
            <Card className={`p-3 shadow ${styles.aboutMeCard}`}>
              <Card.Body>
                <Card.Text className={styles.cardText}>
                  I'm passionate about technology and eager to apply my new web
                  development skills. My background includes over eight years in
                  sales and customer service, where I honed my abilities in
                  customer relations, project management, and teamwork. Previous
                  roles as a store manager and complaints manager have made me
                  goal-driven and results-oriented. I'm excited to merge my
                  diverse experience with my programming skills, thriving on
                  learning, problem-solving, and collaborative work. I'm
                  actively seeking opportunities that will challenge me and
                  foster professional growth.
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
