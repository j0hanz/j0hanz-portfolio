import React, { useState } from 'react';
import { Container, Row, Col, Spinner } from 'react-bootstrap';
import Image from '../assets/image_me.jpeg';
import styles from './styles/Hero.module.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faDownload } from '@fortawesome/free-solid-svg-icons';
import Cv from '../assets/Linus_Johansson_CV.pdf';

const Hero = React.memo(() => {
  const [loading, setLoading] = useState(false); // State to manage loading spinner

  // Function to handle the CV download process
  const handleDownload = () => {
    setLoading(true); // Set loading to true when download starts

    // Create a temporary link element for downloading the CV
    const link = document.createElement('a');
    link.href = Cv; // Set the href to the CV file path
    link.download = 'Linus_Johansson_CV.pdf'; // Set the download attribute with the file name
    document.body.appendChild(link); // Append the link to the document body
    link.click(); // Programmatically trigger the click event to start the download
    document.body.removeChild(link); // Remove the link from the document after the download starts

    // Ensure the spinner is shown for at least 2 seconds
    setTimeout(() => {
      setLoading(false); // Set loading to false after 2 seconds
    }, 2000);
  };

  // CSS class combinations for various elements
  const classes = `mb-4 ${styles.gradientText}`;
  const imageClasses = `mb-4 ${styles.heroImage}`;
  const leadClasses = `mb-4 lead`;
  const buttonClasses = `btn btn-outline-dark btn-lg`;

  return (
    <section id="hero" className="hero-section text-center py-5">
      <Container className="px-0">
        <Row className="d-flex justify-content-center text-center align-items-center mx-auto">
          <Col xs="auto">
            {/* Hero Title */}
            <h1 className={classes}>Linus Johansson</h1>

            {/* Hero Image */}
            <img src={Image} alt="Linus Johansson" className={imageClasses} />

            {/* Subtitle */}
            <h2 className="mb-3">Full-Stack Developer</h2>

            {/* Divider Line */}
            <hr className="my-2" />

            {/* Lead Paragraph */}
            <p className={leadClasses}>
              Creating elegant and efficient web solutions.
            </p>

            {/* Download CV Button and Contact Button */}
            <div className="d-flex flex-column justify-content-center align-items-center my-4">
              <button
                onClick={handleDownload} // Call handleDownload on click
                className="btn btn-outline-primary mb-3"
                disabled={loading} // Disable the button while loading
              >
                {loading ? (
                  // Show spinner and "Downloading..." text while loading
                  <>
                    <Spinner
                      as="span"
                      animation="border"
                      size="sm"
                      role="status"
                      aria-hidden="true"
                      className="me-2"
                    />
                    Downloading...
                  </>
                ) : (
                  // Show the normal download button with icon when not loading
                  <>
                    <FontAwesomeIcon
                      size="lg"
                      icon={faDownload}
                      className="me-2"
                    />
                    Download CV
                  </>
                )}
              </button>

              {/* Contact Button */}
              <a href="#contact" className={buttonClasses}>
                Get in Touch
              </a>
            </div>
          </Col>
        </Row>
      </Container>
    </section>
  );
});

export default Hero;
