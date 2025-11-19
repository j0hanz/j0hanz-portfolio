import React, { useEffect } from 'react';

import { HiMiniMoon, HiMiniSun } from 'react-icons/hi2';

import { useStorage } from '@/hooks';

import styles from './DarkModeToggle.module.css';

function DarkModeToggle(): React.JSX.Element {
  const { value: storedTheme, set: setStoredTheme } = useStorage<
    'dark' | 'light'
  >('theme', 'light');

  const isDark = storedTheme === 'dark';

  const toggle = () => {
    setStoredTheme((prev) => (prev === 'dark' ? 'light' : 'dark'));
  };

  useEffect(() => {
    if (typeof document !== 'undefined') {
      document.documentElement.setAttribute('data-theme', storedTheme);
      document.documentElement.setAttribute('data-bs-theme', storedTheme);
    }
  }, [storedTheme]);

  return (
    <button
      type="button"
      className={styles.darkModeToggle}
      aria-pressed={isDark}
      aria-label="Toggle dark mode"
      onClick={toggle}
    >
      {isDark ? (
        <HiMiniSun className={styles.icon} />
      ) : (
        <HiMiniMoon className={styles.icon} />
      )}
    </button>
  );
}

export default DarkModeToggle;
