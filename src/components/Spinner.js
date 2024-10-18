import React from 'react';
import { Spinner as BootstrapSpinner } from 'react-bootstrap';
import styles from './styles/Spinner.module.css';

// Functional component Spinner
const Spinner = ({ size = '6rem', thickness = '0.35rem' }) => {
  return (
    <div className={styles.spinnerContainer}>
      <BootstrapSpinner
        animation="border"
        role="status"
        style={{
          width: size,
          height: size,
          borderWidth: thickness,
        }}
        className={styles.spinner}
      >
        <span className="visually-hidden">Loading...</span>
      </BootstrapSpinner>
    </div>
  );
};

export default Spinner;
