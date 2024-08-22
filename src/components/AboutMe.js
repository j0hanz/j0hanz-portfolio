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
        'Recently completed a course, sharpening skills in modern web technologies.',
    },
    {
      title: 'Sales & Customer Service',
      description:
        'Over eight years of experience in customer relations, project management, and teamwork.',
    },
    {
      title: 'Leadership',
      description:
        'Proven leadership as a store and claims manager, focused on achieving goals.',
    },
    {
      title: 'Tech Enthusiast',
      description:
        'Passionate about technology and eager to apply programming skills in team settings.',
    },
    {
      title: 'Continuous Learner',
      description:
        'Always seeking growth and excited to solve challenges in a dynamic environment.',
    },
  ];

  return (
    <section id="about-me" className="py-4">
      <Container>
        <h2 className={`text-center ${styles.sectionTitle}`}>
          <FontAwesomeIcon icon={faUser} className="me-2" />
          About Me
        </h2>
        <Row className="justify-content-center mt-4">
          <Col md={10}>
            <Card className={`p-4 ${styles.aboutMeCard}`}>
              <Card.Body>
                <Card.Text className={styles.cardText}>
                  Passionate about technology and equipped with over eight years
                  of experience in sales and management. After recently
                  completing a Full-Stack Developer program, I’m ready to
                  combine my technical skills with my leadership background to
                  contribute to a collaborative team.
                </Card.Text>
                <ul className="mt-4">
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
