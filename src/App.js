import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import NavBar from './components/NavBar';
import Hero from './components/Hero';
import AboutMe from './components/AboutMe';
import Skills from './components/Skills';
import WorkExperience from './components/WorkExperience';
import Education from './components/Education';
import Portfolio from './components/Portfolio';
import ContactForm from './components/ContactForm';
import Footer from './components/Footer';
import SuccessMessage from './components/SuccessMessage';
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
    }, 2000); // Loading time of 2 seconds

    return () => clearTimeout(timer); // Clean up the timer on component unmount
  }, []);

  return (
    <Router>
      <div className={styles.appContainer}>
        <NavBar />
        <main className={styles.mainContent}>
          {loading ? (
            <Spinner />
          ) : (
            <Routes>
              <Route path="/success" element={<SuccessMessage />} />
              <Route
                path="/"
                element={
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
                }
              />
            </Routes>
          )}
        </main>
      </div>
    </Router>
  );
};

export default App;
