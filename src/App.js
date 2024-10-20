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
import 'bootstrap/dist/css/bootstrap.min.css';
import styles from './App.module.css';
import Spinner from './components/Spinner';

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
      <NavBar />
      <main className={styles.mainContent}>
        {loading ? (
          <Spinner />
        ) : (
          <>
            <Hero />
            <AboutMe />
            <Education />
            <Skills />
            <WorkExperience />
            <Portfolio />
            <ContactForm />
            <Footer />
          </>
        )}
      </main>
    </div>
  );
};

export default App;
