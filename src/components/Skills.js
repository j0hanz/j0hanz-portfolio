import React from 'react';
import { Container, Row, Col, Card } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faReact,
  faNodeJs,
  faHtml5,
  faCss3,
  faJs,
  faPython,
  faBootstrap,
  faGithub,
} from '@fortawesome/free-brands-svg-icons';
import {
  faCogs,
  faDatabase,
  faSearch,
  faProjectDiagram,
} from '@fortawesome/free-solid-svg-icons';
import styles from './styles/Skills.module.css';
import appStyles from '../App.module.css';

const skills = [
  { icon: faHtml5, label: 'HTML5' },
  { icon: faCss3, label: 'CSS3' },
  { icon: faJs, label: 'JavaScript' },
  { icon: faBootstrap, label: 'Bootstrap' },
  { icon: faReact, label: 'React.js' },
  { icon: faNodeJs, label: 'Node.js' },
  { icon: faPython, label: 'Python' },
  { icon: faDatabase, label: 'Django' },
  { icon: faDatabase, label: 'SQL' },
  { icon: faGithub, label: 'Git & GitHub' },
  { icon: faProjectDiagram, label: 'Agile' },
  { icon: faSearch, label: 'SEO' },
];

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
    <section id="skills" className={appStyles.sectionPadding}>
      <Container className={appStyles.sectionContainer}>
        <div className={appStyles.sectionTitleContainer}>
          <div>
            <FontAwesomeIcon
              icon={faCogs}
              size="2x"
              className={appStyles.mainIcon}
            />
          </div>
          <h2 className={appStyles.sectionTitle}>Skills</h2>
        </div>
        <Row>{skills.map(renderSkill)}</Row>
      </Container>
    </section>
  );
};

export default Skills;
