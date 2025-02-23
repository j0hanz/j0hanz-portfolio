import { useState, useEffect } from 'react';
import { HiMiniMoon, HiMiniSun } from 'react-icons/hi2';
import styles from './styles/DarkModeToggle.module.css';

const DarkModeToggle: React.FC = () => {
  const [darkMode, setDarkMode] = useState<boolean>(() => {
    const savedTheme = localStorage.getItem('theme');
    return savedTheme === 'dark';
  });

  useEffect(() => {
    document.documentElement.setAttribute(
      'data-theme',
      darkMode ? 'dark' : 'light',
    );
    localStorage.setItem('theme', darkMode ? 'dark' : 'light');
  }, [darkMode]);

  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
  };

  return (
    <div onClick={toggleDarkMode}>
      {darkMode ? (
        <HiMiniSun className={styles.icon} />
      ) : (
        <HiMiniMoon className={styles.icon} />
      )}
    </div>
  );
};

export default DarkModeToggle;
