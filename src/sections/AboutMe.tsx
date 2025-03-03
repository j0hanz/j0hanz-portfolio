import React, { useState } from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import { HiUser, HiMiniCheckBadge } from 'react-icons/hi2';
import Credential from '@/components/Credential';
import Card from '@/components/Card';
import appStyles from '@/App.module.css';
import aboutMeItems from '@/data/aboutMeItems';
import aboutMeText from '@/data/aboutMeText';
import styles from './styles/AboutMe.module.css';
import Button from '@/components/Button';

interface AboutMeItem {
  title: string;
  description: string;
  hasCredential: boolean;
}

// Displaying the overview text
const AboutMeText: React.FC = () => (
  <Card title="Overview">
    <div className={appStyles.cardText}>{aboutMeText}</div>
  </Card>
);

// Displaying a list of highlights
const AboutMeList: React.FC<{
  items: AboutMeItem[];
  onShowModal: () => void;
}> = ({ items, onShowModal }) => (
  <Card title="Highlights">
    <ul className="list-unstyled mb-0">
      {items.map((item, index) => (
        <li key={index} className={styles.listItem}>
          <span className={styles.listTitle}>{item.title}:</span>
          {item.description}
          {item.hasCredential ? (
            <div className="pt-3">
              <Button
                onClick={onShowModal}
                className={styles.credentialButton}
                icon={<HiMiniCheckBadge className={styles.buttonIcon} />}
                text="Credential"
              />
            </div>
          ) : null}
        </li>
      ))}
    </ul>
  </Card>
);

// Main component for the About Me section
const AboutMe: React.FC = () => {
  const [showModal, setShowModal] = useState(false);

  // Handlers for opening and closing the credential modal
  const handleShowModal = () => setShowModal(true);
  const handleCloseModal = () => setShowModal(false);

  return (
    <section id="about-me">
      <Container className={appStyles.sectionContainer}>
        <div className={appStyles.sectionTitleContainer}>
          <HiUser className={appStyles.mainIcon} />
          <div className={appStyles.sectionTitle}>About Me</div>
        </div>
        <Row>
          <Col lg={6} className="mb-4">
            <AboutMeText />
          </Col>
          <Col lg={6} className="mb-4">
            <AboutMeList items={aboutMeItems} onShowModal={handleShowModal} />
          </Col>
        </Row>
        <Credential show={showModal} handleClose={handleCloseModal} />
      </Container>
    </section>
  );
};

export default AboutMe;
