import {
  animate,
  type MotionProps,
  stagger,
  type Transition,
} from 'motion/react';

import {
  BASE_DELAY,
  BASE_DURATION,
  BASE_STAGGER,
  gestureVariants,
  REDUCED_MOTION_TARGET,
  transitions,
} from '@/config/motion';
import type {
  AnimationConfig,
  AnimationPriority,
  SectionSequenceStep,
  TransitionPreset,
} from '@/config/types';

// ============================================================================
// ANIMATION CONFIG HELPERS
// ============================================================================

// Instant transition for reduced motion scenarios
const REDUCED_TRANSITION: Transition = { duration: 0.01 };

// Resolves motion state based on user motion preferences
export const resolveMotionState = <T extends MotionProps['initial']>(
  prefersReduced: boolean,
  state?: T,
  fallback: T = REDUCED_MOTION_TARGET as T
): T => (prefersReduced ? fallback : (state ?? fallback));

// Timing helper factories - pure functions for cleaner composition
export const createDuration =
  (prefersReduced: boolean) =>
  (multiplier = 1) =>
    prefersReduced ? 0 : BASE_DURATION * multiplier;

export const createDelay =
  (prefersReduced: boolean) =>
  (steps = 1) =>
    prefersReduced ? 0 : BASE_DELAY * steps;

export const createStagger =
  (prefersReduced: boolean) =>
  (multiplier = 1) =>
    prefersReduced ? 0 : BASE_STAGGER * multiplier;

export const createTransition =
  (prefersReduced: boolean) =>
  (
    preset: TransitionPreset = 'smooth',
    overrides?: Partial<Transition>
  ): Transition => {
    const base = transitions[preset] ?? transitions.smooth;
    const reducedOverride = prefersReduced ? REDUCED_TRANSITION : {};
    return { ...base, ...reducedOverride, ...overrides };
  };

// ============================================================================
// GESTURE HELPERS
// ============================================================================

// Base gesture props - common structure for all gesture variants
const GESTURE_BASE = {
  initial: 'rest',
  animate: 'rest',
} as const;

// Interactive gesture props - added when motion is allowed
const GESTURE_INTERACTIVE = {
  whileHover: 'hover',
  whileFocus: 'focus',
  whileTap: 'tap',
} as const;

// Creates gesture props with optional interactivity based on motion preference
export const createGestureProps = (
  variants: (typeof gestureVariants)[keyof typeof gestureVariants],
  transition: Transition,
  prefersReducedMotion: boolean
) => ({
  variants,
  transition,
  ...GESTURE_BASE,
  ...(prefersReducedMotion ? {} : GESTURE_INTERACTIVE),
});

// ============================================================================
// SEQUENCE HELPERS
// ============================================================================

type SequenceStepKey = 'description' | 'cards' | 'cta';

// Configuration-driven sequence building reduces cyclomatic complexity
const SEQUENCE_STEP_CONFIG: Record<
  SequenceStepKey,
  { baseDelay: number; useStagger: boolean; defaultStagger?: number }
> = {
  description: { baseDelay: 0, useStagger: false },
  cards: { baseDelay: 0.2, useStagger: true, defaultStagger: 0.1 },
  cta: { baseDelay: 0.4, useStagger: true, defaultStagger: 0.1 },
};

const SEQUENCE_ORDER: SequenceStepKey[] = ['description', 'cards', 'cta'];

export const animateElements = (
  scopeElement: HTMLElement,
  selector: string,
  delay: number,
  useStagger: boolean,
  staggerValue = BASE_STAGGER
) => {
  const elements = scopeElement.querySelectorAll(selector);
  if (elements.length === 0) return;

  animate(
    elements,
    { opacity: [0, 1], y: [20, 0] },
    {
      delay: useStagger ? stagger(staggerValue, { startDelay: delay }) : delay,
      duration: 0.5,
      ease: 'easeOut' as const,
    }
  );
};

// Builds animation sequence plan from selector config
export function buildSectionSequencePlan(
  selectors: Record<string, string | undefined>,
  getStagger: AnimationConfig['getStagger']
): SectionSequenceStep[] {
  let cumulativeDelay = 0;

  return SEQUENCE_ORDER.filter((key) => selectors[key]?.trim()).map((key) => {
    const config = SEQUENCE_STEP_CONFIG[key];
    const step: SectionSequenceStep = {
      selector: selectors[key]!,
      delay: cumulativeDelay,
      useStagger: config.useStagger,
      staggerValue: config.useStagger
        ? getStagger(config.defaultStagger)
        : undefined,
    };
    cumulativeDelay += config.baseDelay;
    return step;
  });
}

export const runSectionSequence = (
  scopeElement: HTMLElement,
  steps: SectionSequenceStep[]
) =>
  steps.forEach(({ selector, delay, useStagger, staggerValue }) =>
    animateElements(scopeElement, selector, delay, useStagger, staggerValue)
  );

// ============================================================================
// DEVICE CAPABILITY
// ============================================================================

// Detects device capability based on hardware concurrency and memory
export const getDeviceCapability = (): AnimationPriority => {
  if (typeof navigator === 'undefined') return 'reduced';
  const cores = navigator.hardwareConcurrency ?? 4;
  const memory =
    (navigator as Navigator & { deviceMemory?: number }).deviceMemory ?? 4;
  return cores <= 4 || memory <= 4 ? 'reduced' : 'high';
};
