import React from 'react'; // Importing React library
import styles from './styles/Spinner.module.css'; // Importing CSS module for styling

// Functional component Spinner
const Spinner = () => {
  return (
    // Main spinner container with CSS class
    <div className={styles.spinner}>
      {/* Two bouncing divs for the spinner animation */}
      <div className={styles.bounce}></div>
      <div className={styles.bounce}></div>
    </div>
  );
};

// Exporting the Spinner component as default export
export default Spinner;
