import React, { ReactNode, useEffect, useState } from 'react';

import { getSectionByHash, sections } from '@/config/sections';
import { Direction, NavigationContext } from '@/contexts/NavigationContext';

export function NavigationProvider({
  children,
}: {
  children: ReactNode;
}): React.JSX.Element {
  const [activeSectionIndex, setActiveSectionIndex] = useState(() => {
    if (typeof window !== 'undefined') {
      const hash = window.location.hash;
      if (hash) {
        const section = getSectionByHash(hash);
        if (section) {
          return sections.indexOf(section);
        }
      }
    }
    return 0;
  });
  const [direction, setDirection] = useState<Direction>(null);

  const activeSection = sections[activeSectionIndex];
  const activeSectionId = activeSection.id;
  const isFirst = activeSectionIndex === 0;
  const isLast = activeSectionIndex === sections.length - 1;
  const isScrollLocked = !activeSection.disableScrollLock;

  // Sync hash with active section
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const hash = activeSection.hash;
      if (window.location.hash !== hash) {
        window.history.replaceState(null, '', hash);
      }
    }
  }, [activeSection]);

  // Listen for hash changes
  useEffect(() => {
    const handleHashChange = () => {
      const hash = window.location.hash;
      const section = getSectionByHash(hash);
      if (section) {
        const index = sections.indexOf(section);
        if (index !== -1 && index !== activeSectionIndex) {
          setDirection(index > activeSectionIndex ? 'down' : 'up');
          setActiveSectionIndex(index);
        }
      }
    };

    window.addEventListener('hashchange', handleHashChange);
    return () => window.removeEventListener('hashchange', handleHashChange);
  }, [activeSectionIndex]);

  const setActiveSection = (index: number) => {
    if (index === activeSectionIndex) return;
    if (index < 0 || index >= sections.length) return;

    setDirection(index > activeSectionIndex ? 'down' : 'up');
    setActiveSectionIndex(index);
  };

  const navigateTo = (id: string) => {
    const index = sections.findIndex((s) => s.id === id);
    if (index !== -1) {
      setActiveSection(index);
    }
  };

  const moveNext = () => {
    if (!isLast) {
      setActiveSection(activeSectionIndex + 1);
    }
  };

  const movePrev = () => {
    if (!isFirst) {
      setActiveSection(activeSectionIndex - 1);
    }
  };

  const value = {
    activeSectionIndex,
    activeSectionId,
    direction,
    setActiveSection,
    navigateTo,
    moveNext,
    movePrev,
    isFirst,
    isLast,
    isScrollLocked,
  };

  return (
    <NavigationContext.Provider value={value}>
      {children}
    </NavigationContext.Provider>
  );
}
