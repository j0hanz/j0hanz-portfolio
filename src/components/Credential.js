import React, { useState, useEffect } from 'react'; // Importing React and hooks
import { Modal, Container, Button } from 'react-bootstrap'; // Importing components from react-bootstrap
import ImageCredential from '../assets/Credential.png'; // Importing credential image
import styles from './styles/Credential.module.css'; // Importing CSS module for styling
import Spinner from './Spinner'; // Importing Spinner component

// Functional component Credential
const Credential = ({ show, handleClose }) => {
  // State to manage loading status
  const [loading, setLoading] = useState(true);

  // useEffect hook to handle image loading
  useEffect(() => {
    const image = new Image(); // Create a new Image object
    image.src = ImageCredential; // Set the source of the image
    image.onload = () => {
      // When the image is loaded
      setTimeout(() => {
        // Set a timeout to simulate loading delay
        setLoading(false); // Set loading to false after delay
      }, 2500); // Delay of 2500ms
    };
  }, []); // Empty dependency array to run only once

  return (
    <>
      {/* Modal component from react-bootstrap */}
      <Modal show={show} onHide={handleClose} centered size="lg">
        {/* Modal header with close button and dark theme */}
        <Modal.Header
          closeButton
          closeVariant="white"
          className="bg-dark text-light"
        >
          <Modal.Title>Credential</Modal.Title>
        </Modal.Header>
        {/* Modal body with dark theme */}
        <Modal.Body className="bg-dark text-light">
          {/* Bootstrap container with centered text */}
          <Container className="text-center">
            {loading ? (
              // Show Spinner component while loading
              <Spinner />
            ) : (
              // Show credential image and button after loading
              <>
                <a
                  href="https://www.credential.net/dd705ce7-f66c-456a-b07d-e8712cd7287c#gs.cubcle"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  {/* Container for credential image with hover text */}
                  <div className={styles.credentialImageContainer}>
                    <img
                      src={ImageCredential}
                      alt="Credential"
                      className={`img-fluid rounded ${styles.credentialImage}`}
                    />
                    <div className={styles.hoverText}>View Credential</div>
                  </div>
                </a>
                {/* Button to view credential */}
                <Button
                  href="https://www.credential.net/dd705ce7-f66c-456a-b07d-e8712cd7287c#gs.cubcle"
                  target="_blank"
                  rel="noopener noreferrer"
                  variant="outline-primary btn-lg text-white my-2"
                  className={`mt-3 ${styles.mobileButton}`}
                >
                  View Credential
                </Button>
              </>
            )}
          </Container>
        </Modal.Body>
      </Modal>
    </>
  );
};

// Exporting the Credential component as default export
export default Credential;
