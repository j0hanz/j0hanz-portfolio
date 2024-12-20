import NavBar from './components/NavBar';
import Hero from './sections/Hero';
import AboutMe from './sections/AboutMe';
import Skills from './sections/Skills';
import WorkExperience from './sections/WorkExperience';
import Education from './sections/Education';
import Portfolio from './sections/Portfolio';
import ContactForm from './sections/ContactForm';
import Footer from './components/Footer';
import 'bootstrap/dist/css/bootstrap.min.css';
import '/node_modules/flag-icons/css/flag-icons.min.css';
import './toastify.css';
import styles from './App.module.css';
import Spinner from './components/Spinner';
import Toast from './components/Toast';
import useLoading from './hooks/useLoading';

const MainContent = ({ loading }) => (
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
        <Footer />
      </>
    )}
  </main>
);

const App = () => {
  const loading = useLoading();

  return (
    <div className={styles.appContainer}>
      <div className={styles.fixedBackground}></div>
      <NavBar />
      <Toast />
      <MainContent loading={loading} />
    </div>
  );
};

export default App;
