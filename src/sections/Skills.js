import React from 'react';
import { Container, Row, Col, Card } from 'react-bootstrap';
import { HiMiniCog8Tooth } from 'react-icons/hi2';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import styles from './styles/Skills.module.css';
import appStyles from '../App.module.css';
import ScrollRevealWrapper from '../components/ScrollWrapper';
import skills from '../data/skills';

const Skills = () => {
  /* Renders each skill as a card with an icon and label */
  const renderSkill = (skill, index) => (
    <Col md={4} sm={6} xs={6} key={index} className="text-center mb-4">
      <Card className={`h-100 ${styles.skillCard} ${appStyles.cardBgColor}`}>
        <Card.Body className={appStyles.cardBody}>
          <FontAwesomeIcon icon={skill.icon} size="3x" className="my-3" />
          <Card.Title className={styles.skillLabel}>{skill.label}</Card.Title>
        </Card.Body>
      </Card>
    </Col>
  );

  return (
    <ScrollRevealWrapper>
      <section id="skills" className={appStyles.sectionPadding}>
        <Container className={appStyles.sectionContainer}>
          <div className={appStyles.sectionTitleContainer}>
            <div>
              <HiMiniCog8Tooth className={appStyles.mainIcon} />
            </div>
            <div className={appStyles.sectionTitle}>Skills</div>
          </div>
          <Row>{skills.map(renderSkill)}</Row>
        </Container>
      </section>
    </ScrollRevealWrapper>
  );
};

export default Skills;
