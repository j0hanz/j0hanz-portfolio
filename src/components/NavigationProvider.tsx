import { ReactNode, useEffect, useState, useTransition } from 'react';

import { getSectionByHash, sections } from '@/config/sections';
import type { Direction } from '@/config/types';
import {
  NavigationActionsContext,
  NavigationStateContext,
} from '@/contexts/NavigationContext';
import { useEventCallback } from '@/hooks';

// Helper to get initial section index from URL hash
function getInitialSectionIndex(): number {
  if (typeof window === 'undefined') return 0;
  const section = getSectionByHash(window.location.hash);
  if (!section) return 0;
  const index = sections.indexOf(section);
  return index !== -1 ? index : 0;
}

// Helper to clamp section index to valid range
function clampSectionIndex(index: number): number {
  return Math.max(0, Math.min(index, sections.length - 1));
}

// Helper to sync hash with section
function syncHashWithSection(section: { hash: string }) {
  if (typeof window !== 'undefined' && window.location.hash !== section.hash) {
    window.history.replaceState(null, '', section.hash);
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

          // No change or out of bounds
          if (
            targetIndex === currentIndex ||
            clampSectionIndex(targetIndex) !== targetIndex
          ) {
            return currentIndex;
          }

          // Update direction for animations
          setDirection(targetIndex > currentIndex ? 'down' : 'up');
          return targetIndex;
        });
      });
    }
  );

  const handleHashChange = useEventCallback(() => {
    if (typeof window === 'undefined') return;

    const section = getSectionByHash(window.location.hash);
    if (section) {
      const index = sections.indexOf(section);
      if (index !== -1) updateSection(index);
    }
  });

  // Sync hash with active section
  useEffect(() => {
    syncHashWithSection(activeSection);
  }, [activeSection]);

  // Listen for hash changes
  useEffect(() => {
    window.addEventListener('hashchange', handleHashChange);
    return () => window.removeEventListener('hashchange', handleHashChange);
  }, [handleHashChange]);
  const setActiveSection = useEventCallback((index: number) =>
    updateSection(index)
  );
  const navigateTo = useEventCallback((id: string) => {
    const index = sections.findIndex((s) => s.id === id);
    if (index !== -1) updateSection(index);
  });
  const moveNext = useEventCallback(() =>
    updateSection((current) => current + 1)
  );
  const movePrev = useEventCallback(() =>
    updateSection((current) => current - 1)
  );

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

  // React 19: Render context directly without .Provider
  return (
    <NavigationActionsContext value={actionsValue}>
      <NavigationStateContext value={stateValue}>
        {children}
      </NavigationStateContext>
    </NavigationActionsContext>
  );
}
