import { ReactNode, useEffect, useReducer, useTransition } from 'react';

import { getSectionByHash, sections } from '@/config/sections';
import type { Direction, NavigationState } from '@/config/types';
import {
  NavigationActionsContext,
  NavigationStateContext,
} from '@/contexts/NavigationContext';
import { useEventCallback } from '@/hooks';

const SECTION_COUNT = sections.length;
const LAST_INDEX = SECTION_COUNT - 1;

type NavigationSnapshot = Omit<NavigationState, 'isPending'>;

type NavigationAction =
  | { type: 'SET_INDEX'; payload: number }
  | { type: 'SET_ID'; payload: string }
  | { type: 'STEP'; payload: 1 | -1 }
  | { type: 'SYNC_HASH'; payload: string };

// Get initial section index from URL hash on mount
function getInitialSectionIndex(): number {
  if (typeof window === 'undefined') return 0;

  const section = getSectionByHash(window.location.hash);
  const index = section ? sections.indexOf(section) : -1;
  return index >= 0 ? index : 0;
}

function clampIndex(index: number): number {
  if (Number.isNaN(index)) return 0;
  if (index < 0) return 0;
  if (index > LAST_INDEX) return LAST_INDEX;
  return index;
}

// Unified resolver for section index by ID or hash
function resolveIndex(identifier: string, byHash = false): number | null {
  const section = byHash
    ? getSectionByHash(identifier)
    : sections.find((s) => s.id === identifier);
  if (!section) return null;
  const matchIndex = sections.indexOf(section);
  return matchIndex >= 0 ? matchIndex : null;
}

function buildSnapshot(
  targetIndex: number,
  previousIndex: number
): NavigationSnapshot {
  const index = clampIndex(targetIndex);
  const activeSection = sections[index];
  if (!activeSection) {
    if (import.meta.env.DEV) {
      throw new Error(
        `NavigationProvider: sections[${index}] is undefined. This should never happen.`
      );
    }
  }
  const direction: Direction =
    index === previousIndex ? null : index > previousIndex ? 'down' : 'up';

  return {
    activeSectionIndex: index,
    activeSectionId: activeSection.id,
    activeSectionHash: activeSection.hash,
    activeSection,
    totalSections: SECTION_COUNT,
    direction,
    isFirst: index === 0,
    isLast: index === LAST_INDEX,
    isScrollLocked: !activeSection.disableScrollLock,
  };
}

function navigationReducer(
  state: NavigationSnapshot,
  action: NavigationAction
): NavigationSnapshot {
  switch (action.type) {
    case 'SET_INDEX': {
      const next = buildSnapshot(action.payload, state.activeSectionIndex);
      return next.activeSectionIndex === state.activeSectionIndex
        ? state
        : next;
    }
    case 'SET_ID': {
      const targetIndex = resolveIndex(action.payload);
      if (targetIndex === null) return state;

      const next = buildSnapshot(targetIndex, state.activeSectionIndex);
      return next.activeSectionIndex === state.activeSectionIndex
        ? state
        : next;
    }
    case 'STEP': {
      const next = buildSnapshot(
        state.activeSectionIndex + action.payload,
        state.activeSectionIndex
      );
      return next.activeSectionIndex === state.activeSectionIndex
        ? state
        : next;
    }
    case 'SYNC_HASH': {
      const targetIndex = resolveIndex(action.payload, true);
      if (targetIndex === null) return state;

      const next = buildSnapshot(targetIndex, state.activeSectionIndex);
      return next.activeSectionIndex === state.activeSectionIndex
        ? state
        : next;
    }
    default:
      return state;
  }
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
  const [navigationState, dispatch] = useReducer(
    navigationReducer,
    getInitialSectionIndex(),
    (initialIndex) => buildSnapshot(initialIndex, initialIndex)
  );

  const setActiveSection = useEventCallback((indexOrId: number | string) => {
    startTransition(() => {
      if (typeof indexOrId === 'string') {
        dispatch({ type: 'SET_ID', payload: indexOrId });
        return;
      }
      dispatch({ type: 'SET_INDEX', payload: indexOrId });
    });
  });

  const handleHashChange = useEventCallback(() => {
    if (typeof window === 'undefined') return;

    startTransition(() => {
      dispatch({ type: 'SYNC_HASH', payload: window.location.hash });
    });
  });

  // Sync browser hash when section changes
  useEffect(() => {
    syncHashWithSection(navigationState.activeSectionHash);
  }, [navigationState.activeSectionHash]);

  // Listen for browser back/forward navigation
  useEffect(() => {
    window.addEventListener('hashchange', handleHashChange);
    return () => window.removeEventListener('hashchange', handleHashChange);
  }, [handleHashChange]);

  const navigateTo = useEventCallback((id: string) => {
    startTransition(() => dispatch({ type: 'SET_ID', payload: id }));
  });

  const moveNext = useEventCallback(() => {
    startTransition(() => dispatch({ type: 'STEP', payload: 1 }));
  });

  const movePrev = useEventCallback(() => {
    startTransition(() => dispatch({ type: 'STEP', payload: -1 }));
  });

  const stateValue: NavigationState = {
    ...navigationState,
    isPending,
  };

  const actionsValue = {
    setActiveSection,
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
