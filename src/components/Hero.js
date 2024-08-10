import React from 'react'; // Importing React library
import { Container, Row, Col } from 'react-bootstrap'; // Importing components from react-bootstrap
import Image from '../assets/image_me.jpeg'; // Importing image asset
import styles from './styles/Hero.module.css'; // Importing CSS module for styling

// Functional component Hero wrapped with React.memo for performance optimization
const Hero = React.memo(() => {
  // Defining CSS classes for various elements
  const classes = `mb-4 ${styles.gradientText}`; // Class for the main heading with gradient text
  const imageClasses = `mb-4 ${styles.heroImage}`; // Class for the hero image
  const leadClasses = `mb-4 lead`; // Class for the lead paragraph
  const buttonClasses = `btn btn-outline-success text-white`; // Class for the button

  return (
    // Section element with id and classes for styling
    <section id="hero" className="hero-section text-light text-center py-5">
      {/* Bootstrap container with no horizontal padding */}
      <Container className="px-0">
        {/* Bootstrap row with centered content and aligned items */}
        <Row className="d-flex justify-content-center text-center align-items-center mx-auto">
          {/* Bootstrap column with auto width */}
          <Col xs="auto">
            {/* Main heading with gradient text */}
            <h1 className={classes}>Linus Johansson</h1>
            {/* Hero image with alt text */}
            <img src={Image} alt="Linus Johansson" className={imageClasses} />
            {/* Subheading with margin */}
            <h2 className="h4 mb-3">Full-Stack Developer</h2>
            {/* Horizontal rule with margin */}
            <hr className="my-2" />
            {/* Lead paragraph with description */}
            <p className={leadClasses}>
              Crafting elegant and efficient web solutions.
            </p>
            {/* Button linking to contact section */}
            <a href="#contact" className={buttonClasses} size="lg">
              Get in Touch
            </a>
          </Col>
        </Row>
      </Container>
    </section>
  );
});

// Exporting the Hero component as default export
export default Hero;
