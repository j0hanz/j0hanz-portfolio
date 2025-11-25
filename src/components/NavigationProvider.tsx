import { ReactNode, useEffect, useState, useTransition } from 'react';

import { getSectionByHash, sections } from '@/config/sections';
import type { Direction } from '@/config/types';
import {
  NavigationActionsContext,
  NavigationStateContext,
} from '@/contexts/NavigationContext';
import { useEventCallback } from '@/hooks';

const SECTION_COUNT = sections.length;
const LAST_INDEX = SECTION_COUNT - 1;

// Get initial section index from URL hash on mount
function getInitialSectionIndex(): number {
  if (typeof window === 'undefined') return 0;

  const section = getSectionByHash(window.location.hash);
  if (!section) return 0;

  const index = sections.indexOf(section);
  return index >= 0 ? index : 0;
}

// Check if index is within valid bounds
function isValidIndex(index: number): boolean {
  return index >= 0 && index <= LAST_INDEX;
}

// Sync browser hash with active section
function syncHashWithSection(hash: string): void {
  if (typeof window !== 'undefined' && window.location.hash !== hash) {
    window.history.replaceState(null, '', hash);
  }
}

export function NavigationProvider({
  children,
}: {
  children: ReactNode;
}): React.JSX.Element {
  const [isPending, startTransition] = useTransition();
  const [activeSectionIndex, setActiveSectionIndex] = useState(
    getInitialSectionIndex
  );
  const [direction, setDirection] = useState<Direction>(null);

  const activeSection = sections[activeSectionIndex];
  const isFirst = activeSectionIndex === 0;
  const isLast = activeSectionIndex === LAST_INDEX;
  const isScrollLocked = !activeSection.disableScrollLock;

  const updateSection = useEventCallback(
    (nextIndexOrUpdater: number | ((current: number) => number)) => {
      startTransition(() => {
        setActiveSectionIndex((currentIndex) => {
          const targetIndex =
            typeof nextIndexOrUpdater === 'function'
              ? nextIndexOrUpdater(currentIndex)
              : nextIndexOrUpdater;

          // Skip if unchanged or out of bounds
          if (targetIndex === currentIndex || !isValidIndex(targetIndex)) {
            return currentIndex;
          }

          // Update direction for page transition animations
          setDirection(targetIndex > currentIndex ? 'down' : 'up');
          return targetIndex;
        });
      });
    }
  );

  const handleHashChange = useEventCallback(() => {
    const section = getSectionByHash(window.location.hash);
    if (!section) return;

    const index = sections.indexOf(section);
    if (index >= 0) updateSection(index);
  });

  // Sync browser hash when section changes
  useEffect(() => {
    syncHashWithSection(activeSection.hash);
  }, [activeSection.hash]);

  // Listen for browser back/forward navigation
  useEffect(() => {
    window.addEventListener('hashchange', handleHashChange);
    return () => window.removeEventListener('hashchange', handleHashChange);
  }, [handleHashChange]);

  const navigateTo = useEventCallback((id: string) => {
    const index = sections.findIndex((s) => s.id === id);
    if (index >= 0) updateSection(index);
  });

  const moveNext = useEventCallback(() =>
    updateSection((current) => current + 1)
  );

  const movePrev = useEventCallback(() =>
    updateSection((current) => current - 1)
  );

  const stateValue = {
    activeSectionIndex,
    activeSectionId: activeSection.id,
    direction,
    isFirst,
    isLast,
    isScrollLocked,
    isPending,
  };

  const actionsValue = {
    setActiveSection: updateSection,
    navigateTo,
    moveNext,
    movePrev,
  };

  return (
    <NavigationActionsContext value={actionsValue}>
      <NavigationStateContext value={stateValue}>
        {children}
      </NavigationStateContext>
    </NavigationActionsContext>
  );
}
