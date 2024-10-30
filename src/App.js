import React, { useState, useEffect } from 'react';
import NavBar from './components/NavBar';
import Hero from './components/Hero';
import AboutMe from './components/AboutMe';
import Skills from './components/Skills';
import WorkExperience from './components/WorkExperience';
import Education from './components/Education';
import Portfolio from './components/Portfolio';
import ContactForm from './components/ContactForm';
import Footer from './components/Footer';
import Badge from './components/Badge';
import 'bootstrap/dist/css/bootstrap.min.css';
import '/node_modules/flag-icons/css/flag-icons.min.css';
import './toastify.css';
import styles from './App.module.css';
import Spinner from './components/Spinner';
import Toast from './components/Toast';

const App = () => {
  /* State to manage the loading status */
  const [loading, setLoading] = useState(true);

  /* Simulates a loading period when the app is initialized */
  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 2000);

    return () => clearTimeout(timer);
  }, []);

  return (
    <div className={styles.appContainer}>
      {/* Background element */}
      <div className={styles.fixedBackground}></div>
      <NavBar />
      <Toast />
      <main className={styles.mainContent}>
        {loading ? (
          <Spinner />
        ) : (
          <>
            <Hero />
            <AboutMe />
            <Education />
            <Skills />
            <Portfolio />
            <WorkExperience />
            <ContactForm />
            <Badge />
            <Footer />
          </>
        )}
      </main>
    </div>
  );
};

export default App;
