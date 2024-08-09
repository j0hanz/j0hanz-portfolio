import React from 'react';
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

const App = () => {
  return (
    <div className={styles.appContainer}>
      <NavBar />
      <main className={styles.mainContent}>
        <Hero />
        <AboutMe />
        <Skills />
        <WorkExperience />
        <Education />
        <Portfolio />
        <ContactForm />
        <Footer />
      </main>
    </div>
  );
};

export default App;