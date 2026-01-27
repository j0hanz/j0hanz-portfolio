import { ReactNode, useEffect, useReducer, useRef, useTransition } from 'react';

import { getSectionByHash, sections } from '@/config/sections';
import type {
  Direction,
  NavigationAction,
  NavigationActions,
  NavigationSnapshot,
  NavigationState,
} from '@/config/types';
import {
  NavigationActionsContext,
  NavigationStateContext,
} from '@/contexts/NavigationContext';
import { useEventCallback } from '@/hooks';

const LAST_INDEX = sections.length - 1;

// Clamps index within valid section bounds
const clampIndex = (index: number): number =>
  Math.max(0, Math.min(Math.trunc(index) || 0, LAST_INDEX));

// Resolves section index by ID or hash
const resolveIndex = (identifier: string, byHash = false): number => {
  const section = byHash
    ? getSectionByHash(identifier)
    : sections.find((s) => s.id === identifier);
  return section ? sections.indexOf(section) : -1;
};

// Get initial section index from URL hash (idempotent for React 19 strict mode)
const getInitialIndex = (): number => {
  if (typeof window === 'undefined') return 0;
  const hash = window.location.hash;
  if (!hash) return 0;
  const index = resolveIndex(hash, true);
  return index >= 0 ? index : 0;
};

// Computes navigation direction from index change
const getDirection = (current: number, previous: number): Direction => {
  if (current === previous) return null;
  return current > previous ? 'down' : 'up';
};

// Builds navigation state snapshot from target index
const buildSnapshot = (
  targetIndex: number,
  previousIndex: number
): NavigationSnapshot => {
  const index = clampIndex(targetIndex);
  const activeSection = sections[index];
  const direction = getDirection(index, previousIndex);

  return {
    activeSectionIndex: index,
    activeSectionId: activeSection.id,
    activeSectionHash: activeSection.hash,
    activeSection,
    totalSections: sections.length,
    direction,
    isFirst: index === 0,
    isLast: index === LAST_INDEX,
    isScrollLocked: !activeSection.disableScrollLock,
  };
};

// Navigation reducer - computes target index from action, returns new state if changed
const navigationReducer = (
  state: NavigationSnapshot,
  action: NavigationAction
): NavigationSnapshot => {
  const current = state.activeSectionIndex;

  // Compute target index based on action type
  const target = (() => {
    switch (action.type) {
      case 'SET_INDEX':
        return action.payload;
      case 'SET_ID': {
        const idx = resolveIndex(action.payload);
        return idx >= 0 ? idx : current;
      }
      case 'STEP':
        return current + action.payload;
      case 'SYNC_HASH': {
        const idx = resolveIndex(action.payload, true);
        return idx >= 0 ? idx : current;
      }
    }
  })();

  return target === current ? state : buildSnapshot(target, current);
};

// Sync browser hash with active section (no-op if unchanged)
const syncHashWithSection = (hash: string): void => {
  if (typeof window !== 'undefined' && window.location.hash !== hash)
    window.history.replaceState(null, '', hash);
};

export function NavigationProvider({ children }: { children: ReactNode }) {
  const [isPending, startTransition] = useTransition();
  const [state, dispatch] = useReducer(
    navigationReducer,
    getInitialIndex(),
    (idx) => buildSnapshot(idx, idx)
  );

  // Transition-wrapped dispatch for smooth updates (React 19 Concurrent Mode)
  const transitionDispatch = useEventCallback((action: NavigationAction) =>
    startTransition(() => dispatch(action))
  );

  const setActiveSection = useEventCallback((indexOrId: number | string) => {
    const action: NavigationAction =
      typeof indexOrId === 'string'
        ? { type: 'SET_ID', payload: indexOrId }
        : { type: 'SET_INDEX', payload: indexOrId };
    transitionDispatch(action);
  });

  const handleHashChange = useEventCallback(() => {
    if (typeof window !== 'undefined') {
      transitionDispatch({ type: 'SYNC_HASH', payload: window.location.hash });
    }
  });

  // Sync browser hash when section changes
  useEffect(() => {
    syncHashWithSection(state.activeSectionHash);
  }, [state.activeSectionHash]);

  // Listen for browser back/forward navigation
  useEffect(() => {
    window.addEventListener('hashchange', handleHashChange);
    return () => window.removeEventListener('hashchange', handleHashChange);
  }, [handleHashChange]);

  const stateValue: NavigationState = { ...state, isPending };

  // Navigation action handlers - stable references via useEventCallback
  const navigateTo = useEventCallback((id: string) =>
    transitionDispatch({ type: 'SET_ID', payload: id })
  );
  const moveNext = useEventCallback(() =>
    transitionDispatch({ type: 'STEP', payload: 1 })
  );
  const movePrev = useEventCallback(() =>
    transitionDispatch({ type: 'STEP', payload: -1 })
  );

  const actionsRef = useRef<NavigationActions | null>(null);
  if (!actionsRef.current) {
    actionsRef.current = { setActiveSection, navigateTo, moveNext, movePrev };
  } else {
    actionsRef.current.setActiveSection = setActiveSection;
    actionsRef.current.navigateTo = navigateTo;
    actionsRef.current.moveNext = moveNext;
    actionsRef.current.movePrev = movePrev;
  }
  const actionsValue = actionsRef.current as NavigationActions;

  return (
    <NavigationActionsContext value={actionsValue}>
      <NavigationStateContext value={stateValue}>
        {children}
      </NavigationStateContext>
    </NavigationActionsContext>
  );
}
