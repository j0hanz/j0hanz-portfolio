import React from 'react';
import { Container, Row, Col, Card } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faReact,
  faNodeJs,
  faHtml5,
  faCss3,
  faJs,
  faGitAlt,
  faPython,
  faBootstrap,
} from '@fortawesome/free-brands-svg-icons';
import { faCogs, faDatabase } from '@fortawesome/free-solid-svg-icons';

const skills = [
  { icon: faHtml5, label: 'HTML5' },
  { icon: faCss3, label: 'CSS3' },
  { icon: faJs, label: 'JavaScript' },
  { icon: faReact, label: 'React.js' },
  { icon: faNodeJs, label: 'Node.js' },
  { icon: faGitAlt, label: 'Git' },
  { icon: faPython, label: 'Python' },
  { icon: faBootstrap, label: 'Bootstrap' },
  { icon: faDatabase, label: 'Django' },
];

const Skills = () => (
  <section id="skills" className="skills-section py-5 text-light">
    <Container className="px-0">
      <h2 className="text-center">
        <FontAwesomeIcon icon={faCogs} size="sm" className="me-2" />
        Skills
      </h2>
      <Row className="mt-4 mx-auto">
        {React.useMemo(
          () =>
            skills.map(({ icon, label }, index) => (
              <Col md={4} sm={6} key={index} className="text-center mb-4">
                <Card className="shadow bg-dark text-light">
                  <Card.Body>
                    <FontAwesomeIcon icon={icon} size="3x" className="mb-3" />
                    <Card.Title>{label}</Card.Title>
                  </Card.Body>
                </Card>
              </Col>
            )),
          [],
        )}
      </Row>
    </Container>
  </section>
);

export default Skills;
