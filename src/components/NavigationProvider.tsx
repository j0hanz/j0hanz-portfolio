import { ReactNode, useEffect, useState, useTransition } from 'react';

import { getSectionByHash, sections } from '@/config/sections';
import type { Direction } from '@/config/types';
import {
  NavigationActionsContext,
  NavigationStateContext,
} from '@/contexts/NavigationContext';
import { useEventCallback } from '@/hooks';

export function NavigationProvider({
  children,
}: {
  children: ReactNode;
}): React.JSX.Element {
  const [isPending, startTransition] = useTransition();
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

  const updateSection = useEventCallback(
    (nextIndexOrUpdater: number | ((current: number) => number)) => {
      startTransition(() => {
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
      });
    }
  );

  const handleHashChange = useEventCallback(() => {
    if (typeof window === 'undefined') {
      return;
    }

    const hash = window.location.hash;
    const section = getSectionByHash(hash);
    if (section) {
      const index = sections.indexOf(section);
      if (index !== -1) {
        updateSection(index);
      }
    }
  });

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
    window.addEventListener('hashchange', handleHashChange);
    return () => window.removeEventListener('hashchange', handleHashChange);
  }, [handleHashChange]);
  const setActiveSection = useEventCallback((index: number) => {
    updateSection(index);
  });

  const navigateTo = useEventCallback((id: string) => {
    const index = sections.findIndex((s) => s.id === id);
    if (index !== -1) {
      updateSection(index);
    }
  });

  const moveNext = useEventCallback(() => {
    updateSection((currentIndex) => currentIndex + 1);
  });

  const movePrev = useEventCallback(() => {
    updateSection((currentIndex) => currentIndex - 1);
  });

  // React Compiler auto-optimizes these objects - no manual memoization needed
  // These are recreated on every render but React Compiler prevents unnecessary re-renders
  const stateValue = {
    activeSectionIndex,
    activeSectionId,
    direction,
    isFirst,
    isLast,
    isScrollLocked,
    isPending,
  };

  const actionsValue = {
    setActiveSection,
    navigateTo,
    moveNext,
    movePrev,
  };

  return (
    <NavigationActionsContext.Provider value={actionsValue}>
      <NavigationStateContext.Provider value={stateValue}>
        {children}
      </NavigationStateContext.Provider>
    </NavigationActionsContext.Provider>
  );
}
