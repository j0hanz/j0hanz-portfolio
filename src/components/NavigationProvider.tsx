import React, {
  ReactNode,
  useCallback,
  useEffect,
  useMemo,
  useState,
} from 'react';

import { getSectionByHash, sections } from '@/config/sections';
import type { Direction } from '@/config/types';
import {
  NavigationActionsContext,
  NavigationStateContext,
} from '@/contexts/NavigationContext';

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

  const updateSection = useCallback(
    (nextIndexOrUpdater: number | ((current: number) => number)) => {
      setActiveSectionIndex((currentIndex) => {
        const targetIndex =
          typeof nextIndexOrUpdater === 'function'
            ? nextIndexOrUpdater(currentIndex)
            : nextIndexOrUpdater;

        if (targetIndex === currentIndex) {
          return currentIndex;
        }

        if (targetIndex < 0 || targetIndex >= sections.length) {
          return currentIndex;
        }

        setDirection(targetIndex > currentIndex ? 'down' : 'up');
        return targetIndex;
      });
    },
    []
  );

  const setActiveSection = useCallback(
    (index: number) => {
      updateSection(index);
    },
    [updateSection]
  );

  const navigateTo = useCallback(
    (id: string) => {
      const index = sections.findIndex((s) => s.id === id);
      if (index !== -1) {
        setActiveSection(index);
      }
    },
    [setActiveSection]
  );

  const moveNext = useCallback(() => {
    updateSection((currentIndex) => currentIndex + 1);
  }, [updateSection]);

  const movePrev = useCallback(() => {
    updateSection((currentIndex) => currentIndex - 1);
  }, [updateSection]);

  const stateValue = useMemo(
    () => ({
      activeSectionIndex,
      activeSectionId,
      direction,
      isFirst,
      isLast,
      isScrollLocked,
    }),
    [
      activeSectionId,
      activeSectionIndex,
      direction,
      isFirst,
      isLast,
      isScrollLocked,
    ]
  );

  const actionsValue = useMemo(
    () => ({ setActiveSection, navigateTo, moveNext, movePrev }),
    [moveNext, movePrev, navigateTo, setActiveSection]
  );

  return (
    <NavigationActionsContext.Provider value={actionsValue}>
      <NavigationStateContext.Provider value={stateValue}>
        {children}
      </NavigationStateContext.Provider>
    </NavigationActionsContext.Provider>
  );
}
