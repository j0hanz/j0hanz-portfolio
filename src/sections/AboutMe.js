import React, { useState } from 'react';
import { Container, Row, Col, Card, Button } from 'react-bootstrap';
import { HiUser, HiMiniCheckBadge } from 'react-icons/hi2';
import Credential from '../components/Credential';
import styles from './styles/AboutMe.module.css';
import appStyles from '../App.module.css';
import ScrollRevealWrapper from '../components/ScrollWrapper';
import aboutMeItems from '../data/aboutMeItems';
import aboutMeText from '../data/aboutMeText';

const AboutMeCard = ({ children }) => (
  <Card className={`h-100 ${styles.aboutMeCard} ${appStyles.cardBgColor}`}>
    <Card.Body className={appStyles.cardBody}>{children}</Card.Body>
  </Card>
);

const AboutMeText = () => (
  <AboutMeCard>
    <Card.Text className={appStyles.cardText}>{aboutMeText}</Card.Text>
  </AboutMeCard>
);

const AboutMeList = ({ items, onShowModal }) => (
  <AboutMeCard>
    <ul className="list-unstyled">
      {items.map((item, index) => (
        <li key={index} className="mb-3">
          <strong>{item.title}:</strong> {item.description}
          {item.hasCredential && (
            <div className="mt-2">
              <Button onClick={onShowModal} className={appStyles.btnCredential}>
                <HiMiniCheckBadge className={appStyles.certificateIcon} />
              </Button>
            </div>
          )}
        </li>
      ))}
    </ul>
  </AboutMeCard>
);

const AboutMe = () => {
  const [showModal, setShowModal] = useState(false);

  return (
    <ScrollRevealWrapper>
      <section id="about-me" className={appStyles.sectionPadding}>
        <Container className={appStyles.sectionContainer}>
          <div className={appStyles.sectionTitleContainer}>
            <HiUser className={appStyles.mainIcon} />
            <div className={appStyles.sectionTitle}>About Me</div>
          </div>
          <Row>
            <Col md={6} className="mb-4">
              <AboutMeText />
            </Col>
            <Col md={6} className="mb-4">
              <AboutMeList
                items={aboutMeItems}
                onShowModal={() => setShowModal(true)}
              />
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
