import React, { useState, useCallback } from 'react'; // Importing React and hooks
import { Container, Row, Col, Card, Button } from 'react-bootstrap'; // Importing components from react-bootstrap
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'; // Importing FontAwesomeIcon component
import { faGraduationCap } from '@fortawesome/free-solid-svg-icons'; // Importing specific icon from FontAwesome
import Credential from './Credential'; // Import the Credential component

// Array of education objects containing title, duration, and optional description
const education = [
  {
    title: 'Diploma in Full Stack Software Development',
    school: 'Code Institute',
    duration: 'Feb 2024 - July 2024',
  },
  {
    title: 'Business and Administration Program',
    school: 'Frans Möller Gymnasium',
    duration: '2010 - 2013',
  },
  {
    title: 'Leadership Training',
    school: 'Webhallen',
    duration: '2019',
    description: [
      'Focused on building winning teams through shared values and norms, coaching leadership, effective group dynamics, and clear communication. Emphasized setting and achieving goals with positive habits and behaviors.',
    ],
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
          variant="outline-primary my-1"
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
    (_, index) => (
      <Col md={6} className="mb-3" key={index}>
        {/* Bootstrap card with shadow, dark background, and light text */}
        <Card className="shadow">
          <Card.Body>
            {/* Card title with education title */}
            <Card.Title>{education[index].title}</Card.Title>
            <Card.Text>{education[index].school}</Card.Text>
            {/* Card subtitle with education duration */}
            <Card.Subtitle className="mb-2 text-black-50">
              {education[index].duration}
            </Card.Subtitle>
            {/* Card text with education description if available */}
            {education[index].description && (
              <Card.Text>
                {education[index].description.map((desc, i) => (
                  <p key={i}>{desc}</p>
                ))}
              </Card.Text>
            )}
            {/* Render credential button if applicable */}
            {renderCredentialButton(education[index], index)}
          </Card.Body>
        </Card>
      </Col>
    ),
    [renderCredentialButton],
  );

  return (
    // Section element with id and classes for styling
    <section id="education" className="py-5">
      {/* Bootstrap container with no horizontal padding */}
      <Container className="px-0">
        {/* Heading with FontAwesome icon and text */}
        <h2 className="d-flex justify-content-center">
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
