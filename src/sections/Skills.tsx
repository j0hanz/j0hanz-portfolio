import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import { HiMiniCog8Tooth, HiOutlineBookOpen } from 'react-icons/hi2';
import Card from '@/components/Card';
import styles from './styles/Skills.module.css';
import appStyles from '@/App.module.css';
import skills from '@/data/skills';

interface Skill {
  icon: React.ElementType;
  label: string;
  learning?: boolean;
}

// Rendering skills section
const Skills: React.FC = () => {
  // Render individual skill item
  const renderSkill = (skill: Skill, index: number) => (
    <Col md={3} sm={6} xs={6} key={index} className="text-center mb-4">
      <Card title={skill.label} className={styles.skillCard}>
        <skill.icon className={styles.skillIcon} />
        {skill.learning ? (
          <div className={styles.learningBadge}>
            <HiOutlineBookOpen className={styles.learningIcon} />
            <span className={styles.skillsLearning}>Learning</span>
          </div>
        ) : null}
      </Card>
    </Col>
  );

  return (
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
  );
};

export default Skills;
