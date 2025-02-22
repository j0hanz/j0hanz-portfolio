import { FC, memo } from 'react';
import styles from './styles/Spinner.module.css';

// Component for displaying a loading spinner
const Spinner: FC = () => {
  return (
    <div className={styles.spinnerContainer}>
      <div className={styles.spinner}>
        <div className={styles.loader}></div>
      </div>
    </div>
  );
};

export default memo(Spinner);
