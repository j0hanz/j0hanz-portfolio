import React from 'react'; // Importing React library
import { Container, Row, Col, Card } from 'react-bootstrap'; // Importing components from react-bootstrap
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'; // Importing FontAwesomeIcon component
import {
  faReact,
  faNodeJs,
  faHtml5,
  faCss3,
  faJs,
  faGitAlt,
  faPython,
  faBootstrap,
} from '@fortawesome/free-brands-svg-icons'; // Importing specific icons from FontAwesome
import { faCogs, faDatabase } from '@fortawesome/free-solid-svg-icons'; // Importing specific icons from FontAwesome

// Array of skill objects containing icon and label
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

// Functional component Skills
const Skills = () => (
  // Section element with id and classes for styling
  <section id="skills" className="skills-section py-5 text-light">
    {/* Bootstrap container with no horizontal padding */}
    <Container className="px-0">
      {/* Heading with FontAwesome icon and centered text */}
      <h2 className="text-center">
        <FontAwesomeIcon icon={faCogs} size="sm" className="me-2" />
        Skills
      </h2>
      {/* Bootstrap row with top margin and centered horizontally */}
      <Row className="mt-4 mx-auto">
        {/* Using React.useMemo to memoize the mapped skill items */}
        {React.useMemo(
          () =>
            skills.map(({ icon, label }, index) => (
              // Bootstrap column with medium size 4, small size 6, and bottom margin
              <Col md={4} sm={6} key={index} className="text-center mb-4">
                {/* Bootstrap card with shadow, dark background, and light text */}
                <Card className="shadow bg-dark text-light">
                  <Card.Body>
                    {/* FontAwesome icon with size and bottom margin */}
                    <FontAwesomeIcon icon={icon} size="3x" className="mb-3" />
                    {/* Card title with skill label */}
                    <Card.Title>{label}</Card.Title>
                  </Card.Body>
                </Card>
              </Col>
            )),
          [], // Empty dependency array to memoize the mapped items
        )}
      </Row>
    </Container>
  </section>
);

// Exporting the Skills component as default export
export default Skills;
