import React from 'react';
import { Container, Row, Col, Card } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser } from '@fortawesome/free-solid-svg-icons';
import styles from './styles/AboutMe.module.css';

const AboutMe = () => (
  <section id="about-me" className="py-5">
    <Container className="px-0">
      <h2
        className={`d-flex justify-content-center align-items-center ${styles.sectionTitle}`}
      >
        <FontAwesomeIcon icon={faUser} className="me-2" />
        About Me
      </h2>
      <Row className="justify-content-center mx-auto mt-4">
        <Col md={8}>
          <Card className={`shadow p-4 ${styles.aboutMeCard}`}>
            <Card.Body>
              <Card.Text className={styles.cardText}>
                I’m passionate about technology and recently completed a Full
                Stack Developer course, which improved my technical skills in
                web development. With over eight years in sales and customer
                service, I’ve developed strong skills in customer relations,
                project management, and teamwork. My experience as a store
                manager and claims manager has made me goal-oriented and driven.
                I’m excited to apply these skills in programming, where I’m
                eager to learn, solve problems, and contribute to a
                collaborative team environment.
              </Card.Text>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  </section>
);

export default AboutMe;
