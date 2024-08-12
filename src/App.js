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
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simulate a loading period
    const timer = setTimeout(() => {
      setLoading(false);
    }, 2000);

    return () => clearTimeout(timer);
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
