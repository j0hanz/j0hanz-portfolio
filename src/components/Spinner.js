import React from 'react';
import styles from './styles/Spinner.module.css';

// Functional component Spinner
const Spinner = () => {
  return (
    <div className={styles.spinner}>
      <div className={styles.bounce}></div>
      <div className={styles.bounce}></div>
    </div>
  );
};

export default Spinner;
