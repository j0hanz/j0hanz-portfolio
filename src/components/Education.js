import React, { useState, useCallback } from 'react'; // Importing React and hooks
import { Container, Row, Col, Card, Button } from 'react-bootstrap'; // Importing components from react-bootstrap
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'; // Importing FontAwesomeIcon component
import { faGraduationCap } from '@fortawesome/free-solid-svg-icons'; // Importing specific icon from FontAwesome
import Credential from './Credential'; // Import the Credential component

// Array of education objects containing title, duration, and optional description
const education = [
  {
    title: 'Diploma in Full Stack Software Development',
    duration: 'Feb 2024 - July 2024',
  },
  {
    title: 'Leadership Training',
    duration: '2019',
    description: [
      'Focused on building winning teams through shared values and norms, coaching leadership, effective group dynamics, and clear communication. Emphasized setting and achieving goals with positive habits and behaviors.',
    ],
  },
  {
    title: 'Business and Administration Program',
    duration: '2010 - 2013',
  },
];

// Functional component Education
const Education = () => {
  // State to manage the visibility of the modal
  const [showModal, setShowModal] = useState(false);

  // useCallback hook to toggle the modal visibility
  const toggleModal = useCallback(
    () => setShowModal((prevShowModal) => !prevShowModal),
    [],
  );

  // Function to render the credential button for the first education item
  const renderCredentialButton = useCallback(
    (edu, index) =>
      index === 0 && (
        <Button
          variant="outline-primary text-white my-1"
          onClick={toggleModal}
          key={index}
        >
          Open Credential
        </Button>
      ),
    [toggleModal],
  );

  // Function to render each education item
  const renderEducation = useCallback(
    (edu, index) => (
      <Col md={6} className="mb-4" key={index}>
        {/* Bootstrap card with shadow, dark background, and light text */}
        <Card className="shadow bg-dark text-light">
          <Card.Body>
            {/* Card title with education title */}
            <Card.Title>{edu.title}</Card.Title>
            {/* Card subtitle with education duration */}
            <Card.Subtitle className="mb-2 text-white-50">
              {edu.duration}
            </Card.Subtitle>
            {/* Card text with education description if available */}
            {edu.description && (
              <Card.Text>
                {edu.description.map((desc, i) => (
                  <p key={i}>{desc}</p>
                ))}
              </Card.Text>
            )}
            {/* Render credential button if applicable */}
            {renderCredentialButton(edu, index)}
          </Card.Body>
        </Card>
      </Col>
    ),
    [renderCredentialButton],
  );

  return (
    // Section element with id and classes for styling
    <section id="education" className="py-5 text-light">
      {/* Bootstrap container with no horizontal padding */}
      <Container className="px-0">
        {/* Heading with FontAwesome icon and text */}
        <h2>
          <FontAwesomeIcon icon={faGraduationCap} size="sm" className="me-2" />
          Education
        </h2>
        {/* Bootstrap row with top margin and centered horizontally */}
        <Row className="mt-4 mx-auto">{education.map(renderEducation)}</Row>
        {/* Credential component with modal visibility state and toggle function */}
        <Credential show={showModal} handleClose={toggleModal} />
      </Container>
    </section>
  );
};

// Exporting the Education component as default export
export default Education;
