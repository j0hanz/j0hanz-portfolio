import React from 'react';

import NavBar from '@/components/NavBar';
import Toast from '@/components/Toast';
import useLoading from '@/hooks/useLoading';
import Home from '@/pages/Home';

import styles from '@/styles/App.module.css';

function App(): React.JSX.Element {
  const loading = useLoading();

  return (
    <div className={styles.appContainer}>
      <NavBar />
      <Toast />
      <Home loading={loading} />
    </div>
  );
}

export default App;
