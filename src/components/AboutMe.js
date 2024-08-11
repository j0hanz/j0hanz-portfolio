import React from 'react'; // Importing React library
import { Container, Row, Col, Card } from 'react-bootstrap'; // Importing components from react-bootstrap
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'; // Importing FontAwesomeIcon component
import { faUser } from '@fortawesome/free-solid-svg-icons'; // Importing specific icon from FontAwesome

// Functional component AboutMe
const AboutMe = () => (
  // Section element with id and classes for styling
  <section id="about-me" className="py-5 text-light">
    {/* Bootstrap container with no horizontal padding */}
    <Container className="px-0">
      {/* Bootstrap row centered horizontally */}
      <Row className="justify-content-center mx-auto">
        {/* Bootstrap column with medium size 8 */}
        <Col md={8}>
          {/* Bootstrap card with padding, shadow, dark background, and light text */}
          <Card className=" shadow p-2">
            <Card.Body>
              {/* Card title with FontAwesome icon and heading */}
              <Card.Title>
                <h2 className="d-flex justify-content-center">
                  <FontAwesomeIcon icon={faUser} size="sm" className="me-2" />
                  About Me
                </h2>
              </Card.Title>
              {/* Card text with personal description */}
              <Card.Text>
                I’m passionate about technology and recently completed a Full
                Stack Developer course, which improved my technical skills in
                web development. With over eight years in sales and customer
                service, I’ve developed strong skills in customer relations,
                project management, and teamwork. My experience as a store
                manager and claims manager has made me goal-oriented and driven.
                I’m excited to apply these skills in programming, where I’m
                eager to learn, solve problems, and contribute to a
                collaborative team environment.
              </Card.Text>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  </section>
);

// Exporting the AboutMe component as default export
export default AboutMe;
