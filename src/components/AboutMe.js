import React, { useState } from 'react';
import { Container, Row, Col, Card, Button } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser, faAward } from '@fortawesome/free-solid-svg-icons';
import Credential from './Credential';
import styles from './styles/AboutMe.module.css';
import appStyles from '../App.module.css';
import ScrollRevealWrapper from './ScrollWrapper';
import aboutMeItems from '../data/aboutMeItems';

const AboutMe = () => {
  const [showModal, setShowModal] = useState(false);

  return (
    <ScrollRevealWrapper>
      <section id="about-me" className={appStyles.sectionPadding}>
        <Container className={appStyles.sectionContainer}>
          <div className={appStyles.sectionTitleContainer}>
            <FontAwesomeIcon
              icon={faUser}
              size="2x"
              className={appStyles.mainIcon}
            />
            <h2 className={appStyles.sectionTitle}>About Me</h2>
          </div>
          <Row>
            <Col md={6} className="mb-4">
              <Card
                className={`h-100 ${styles.aboutMeCard} ${appStyles.cardBgColor}`}
              >
                <Card.Body className={appStyles.cardBody}>
                  <Card.Text className={appStyles.cardText}>
                    I'm a tech enthusiast who recently completed a Full-Stack
                    Developer program, boosting my web development skills. I
                    enjoy using my coding experience to build creative
                    solutions, and I'm always eager to learn, solve problems,
                    and collaborate. I'm looking for opportunities that will
                    help me grow and develop.
                  </Card.Text>
                </Card.Body>
              </Card>
            </Col>
            <Col md={6} className="mb-4">
              <Card
                className={`${styles.aboutMeCard} ${appStyles.cardBgColor}`}
              >
                <Card.Body>
                  <ul className="list-unstyled">
                    {aboutMeItems.map((item, index) => (
                      <li key={index} className="mb-3">
                        <strong>{item.title}:</strong> {item.description}
                        {item.hasCredential && (
                          <div className="mt-2">
                            <Button
                              onClick={() => setShowModal(true)}
                              className={styles.btnCredential}
                            >
                              <FontAwesomeIcon
                                icon={faAward}
                                className={styles.certificateIcon}
                              />
                            </Button>
                          </div>
                        )}
                      </li>
                    ))}
                  </ul>
                </Card.Body>
              </Card>
            </Col>
          </Row>
          <Credential
            show={showModal}
            handleClose={() => setShowModal(false)}
          />
        </Container>
      </section>
    </ScrollRevealWrapper>
  );
};

export default AboutMe;
