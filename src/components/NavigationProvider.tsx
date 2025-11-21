import React, { ReactNode, useState } from 'react';

import { sections } from '@/config/sections';
import { Direction, NavigationContext } from '@/contexts/NavigationContext';

export function NavigationProvider({
  children,
}: {
  children: ReactNode;
}): React.JSX.Element {
  const [activeSectionIndex, setActiveSectionIndex] = useState(() => {
    if (typeof window !== 'undefined') {
      const hash = window.location.hash.replace('#', '');
      if (hash) {
        const index = sections.findIndex((s) => s.id === hash);
        if (index !== -1) {
          return index;
        }
      }
    }
    return 0;
  });
  const [direction, setDirection] = useState<Direction>(null);

  const activeSectionId = sections[activeSectionIndex].id;
  const isFirst = activeSectionIndex === 0;
  const isLast = activeSectionIndex === sections.length - 1;

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
  };

  return (
    <NavigationContext.Provider value={value}>
      {children}
    </NavigationContext.Provider>
  );
}
