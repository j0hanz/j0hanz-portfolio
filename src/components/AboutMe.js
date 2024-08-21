import React from 'react';
import { Container, Row, Col, Card } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser } from '@fortawesome/free-solid-svg-icons';
import styles from './styles/AboutMe.module.css';

const AboutMe = () => {
  const aboutMeContent = [
    {
      title: 'Full Stack Developer',
      description:
        'I recently finished a Full Stack Developer course, improving my web development skills.',
    },
    {
      title: 'Sales and Customer Service',
      description:
        'I have over eight years of experience in customer relations, project management, and teamwork.',
    },
    {
      title: 'Leadership',
      description:
        'I have led teams as a store manager and claims manager, focusing on achieving goals.',
    },
    {
      title: 'Tech Enthusiast',
      description:
        'I’m excited to use my programming skills and work well with a team.',
    },
    {
      title: 'Continuous Learner',
      description:
        'I love solving problems and always look for opportunities to grow in a dynamic environment.',
    },
  ];

  return (
    <section id="about-me" className="py-5">
      <Container>
        <h2 className={`text-center ${styles.sectionTitle}`}>
          <FontAwesomeIcon icon={faUser} className="me-2" />
          About Me
        </h2>
        <Row className="justify-content-center mt-4">
          <Col md={8}>
            <Card className={`shadow p-2 ${styles.aboutMeCard}`}>
              <Card.Body>
                <Card.Text className={styles.cardText}>
                  I am passionate about technology and problem-solving. With
                  over eight years of experience in sales and management, along
                  with new skills in full stack development, I bring both
                  technical knowledge and leadership experience. Here’s what I
                  offer:
                </Card.Text>
                <ul className="mt-3">
                  {aboutMeContent.map((item, index) => (
                    <li key={index} className="mb-3">
                      <strong>{item.title}:</strong> {item.description}
                    </li>
                  ))}
                </ul>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>
    </section>
  );
};

export default AboutMe;
