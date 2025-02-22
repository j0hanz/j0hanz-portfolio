import React, { useState, useCallback } from 'react';
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
    <ul className="list-unstyled">
      {items.map((item, index) => (
        <li key={index} className="mb-3">
          <strong>{item.title}:</strong> {item.description}
          {item.hasCredential && (
            <div className="mt-2">
              <Button
                onClick={onShowModal}
                className={`${styles.customButton} ${styles.credentialButton}`}
                icon={<HiMiniCheckBadge className={styles.buttonIcon} />}
                text="Credential"
              />
            </div>
          )}
        </li>
      ))}
    </ul>
  </Card>
);

// Main component for the About Me section
const AboutMe: React.FC = () => {
  const [showModal, setShowModal] = useState(false);

  // Handlers for opening and closing the credential modal
  const handleShowModal = useCallback(() => setShowModal(true), []);
  const handleCloseModal = useCallback(() => setShowModal(false), []);

  return (
    <section id="about-me" className={appStyles.sectionPadding}>
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
