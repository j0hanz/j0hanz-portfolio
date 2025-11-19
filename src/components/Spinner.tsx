import React from 'react';

import styles from './Spinner.module.css';

// Component for displaying a loading spinner
function Spinner(): React.JSX.Element {
  return (
    <div className={styles.spinnerContainer}>
      <div className={styles.spinner}>
        <div className={styles.loader} />
      </div>
    </div>
  );
}

export default Spinner;
