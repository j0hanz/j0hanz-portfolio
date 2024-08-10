import React from 'react'; // Importing React library
import { Container, Row, Col, Card } from 'react-bootstrap'; // Importing components from react-bootstrap
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'; // Importing FontAwesomeIcon component
import { faBriefcase } from '@fortawesome/free-solid-svg-icons'; // Importing specific icon from FontAwesome

// Array of experience objects containing title, workplace, duration, and description
const experiences = [
  {
    title: 'Assistant Store Manager',
    workplace: 'Webhallen',
    duration: 'March 2022 - February 2024',
    description: [
      'Managed store operations and staff in the absence of the store manager, trained new employees, and handled monthly reports and various administrative tasks.',
    ],
  },
  {
    title: 'Interim Store Manager & Complaints Manager',
    workplace: 'Webhallen',
    duration: 'January 2016 - March 2022',
    description: [
      'Supervised staff, created work schedules, resolved customer complaints, coordinated with suppliers, and reported sales statistics, ensuring smooth overall store operations.',
    ],
  },
  {
    title: 'Delivery Employee',
    workplace: 'Sängbutiken',
    duration: '2011 - 2016',
    description: [
      'Delivered and assembled beds, ensuring customer satisfaction.',
    ],
  },
  {
    title: 'Warehouse Worker',
    workplace: 'House of Saki',
    duration: '2014 - 2016',
    description: [
      'Handled goods receipt and shipping, ensuring accurate item selection and order fulfillment according to the packing list.',
    ],
  },
];

// Functional component ExperienceCard wrapped with React.memo for performance optimization
const ExperienceCard = React.memo(({ experience }) => (
  // Bootstrap column with medium size 6 and bottom margin
  <Col md={6} className="mb-4">
    {/* Bootstrap card with shadow, dark background, and light text */}
    <Card className="shadow bg-dark text-light">
      <Card.Body>
        {/* Card title with experience title */}
        <Card.Title>{experience.title}</Card.Title>
        {/* Card text with workplace */}
        <Card.Text>{experience.workplace}</Card.Text>
        {/* Card subtitle with duration */}
        <Card.Subtitle className="mb-2 text-white-50">
          {experience.duration}
        </Card.Subtitle>
        {/* Card text with description */}
        <Card.Text>{experience.description}</Card.Text>
      </Card.Body>
    </Card>
  </Col>
));

// Functional component WorkExperience wrapped with React.memo for performance optimization
const WorkExperience = React.memo(() => {
  // Mapping through the experiences array to render each experience card
  const experienceCards = experiences.map((experience, index) => (
    <ExperienceCard key={index} experience={experience} />
  ));

  return (
    // Section element with id and classes for styling
    <section
      id="work-experience"
      className="py-5 text-light"
      aria-label="Work Experience"
    >
      {/* Bootstrap container with no horizontal padding */}
      <Container className="px-0">
        {/* Heading with FontAwesome icon and text */}
        <h2 className="d-flex justify-content-center">
          <FontAwesomeIcon icon={faBriefcase} size="sm" className="me-2" />
          Work Experience
        </h2>
        {/* Bootstrap row with top margin and centered horizontally */}
        <Row className="mt-4 mx-auto">{experienceCards}</Row>
      </Container>
    </section>
  );
});

// Exporting the WorkExperience component as default export
export default WorkExperience;
