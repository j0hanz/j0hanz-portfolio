import React from 'react';
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
import SuccessMessage from './components/SuccessMessage'; // Import the SuccessMessage component
import 'bootstrap/dist/css/bootstrap.min.css';
import styles from './App.module.css';

const App = () => {
  return (
    <Router>
      <div className={styles.appContainer}>
        <NavBar />
        <main className={styles.mainContent}>
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
        </main>
      </div>
    </Router>
  );
};

export default App;
