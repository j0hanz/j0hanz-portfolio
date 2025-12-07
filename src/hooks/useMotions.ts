import { RefObject, useEffect, useRef } from 'react';

import {
  animate,
  frame,
  useInView as useMotionInView,
  useReducedMotion as useMotionReducedMotion,
  useMotionValue,
  useMotionValueEvent,
  useScroll,
  useTransform,
  useVelocity,
} from 'motion/react';
import type {
  Target,
  UseInViewOptions,
  UseScrollOptions,
  Variants,
} from 'motion/react';

import {
  CARD_HOVER_LIFT,
  gestureVariants,
  REDUCED_MOTION_TARGET,
  timelineCardVariants,
  timelineDescriptionVariants,
  viewportConfig,
  viewportPresets,
} from '@/config/motion';
import type {
  AnimationConfig,
  AnimationPriority,
  CardHoverMotion,
  TimelineSectionControllerOptions,
} from '@/config/types';
import {
  buildSectionSequencePlan,
  createDelay,
  createDuration,
  createGestureProps,
  createStagger,
  createTransition,
  getDeviceCapability,
  resolveMotionState,
  runSectionSequence,
} from '@/utils/motion';

import { useEventCallback } from './useEventCallback';

// ============================================================================
// REDUCED MOTION DETECTION
// ============================================================================

// Detects if user prefers reduced motion
export function useReducedMotion(): boolean {
  return useMotionReducedMotion() ?? false;
}

// ============================================================================
// ANIMATION CONFIGURATION
// ============================================================================

// Animation configuration respecting user motion preferences with timing helpers
export function useAnimationConfig(): AnimationConfig {
  const prefersReducedMotion = useReducedMotion();

  return {
    prefersReducedMotion,
    getDuration: createDuration(prefersReducedMotion),
    getDelay: createDelay(prefersReducedMotion),
    getStagger: createStagger(prefersReducedMotion),
    getTransition: createTransition(prefersReducedMotion),
    motionViewport: viewportConfig,
    reducedMotionTarget: REDUCED_MOTION_TARGET,
    resolveMotionState,
  };
}

// ============================================================================
// MOTION VARIANT HELPERS
// ============================================================================

// Returns motion props respecting reduced motion preferences
export function useMotionVariant(
  variants: Variants,
  options?: {
    initial?: string;
    animate?: string;
    whileInView?: string;
    viewport?: UseInViewOptions;
    whileHover?: Target | string;
    whileTap?: Target | string;
    whileFocus?: Target | string;
  }
) {
  const { prefersReducedMotion, motionViewport } = useAnimationConfig();

  if (prefersReducedMotion) {
    const fallbackState = options?.animate ?? options?.whileInView ?? 'animate';
    return { initial: fallbackState, animate: fallbackState };
  }

  const baseProps = {
    variants,
    initial: options?.initial ?? 'initial',
    whileHover: options?.whileHover,
    whileTap: options?.whileTap,
    whileFocus: options?.whileFocus,
  };

  // Use animate mode if explicitly provided, otherwise use whileInView
  return options?.animate !== undefined
    ? { ...baseProps, animate: options.animate }
    : {
        ...baseProps,
        whileInView: options?.whileInView ?? 'animate',
        viewport: options?.viewport ?? motionViewport,
      };
}

// ============================================================================
// COUNT UP ANIMATION
// ============================================================================

// Animates a number from 0 to value using motion value for no-re-render animation
// Returns ref for span element and string representation of value
export function useCountUp(value: number, duration = 0.7) {
  const { prefersReducedMotion } = useAnimationConfig();
  const motionValue = useMotionValue(0);
  const ref = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    if (prefersReducedMotion) {
      if (ref.current) ref.current.textContent = value.toLocaleString();
      return;
    }

    // Inline transition to avoid dependency on getTransition which changes every render
    const controls = animate(motionValue, value, {
      type: 'tween',
      ease: [0.4, 0, 0.2, 1],
      duration,
    });

    return () => controls.stop();
  }, [value, prefersReducedMotion, motionValue, duration]);

  useMotionValueEvent(motionValue, 'change', (latest) => {
    if (ref.current) {
      ref.current.textContent = Math.round(latest).toLocaleString();
    }
  });

  return {
    ref,
    value: prefersReducedMotion ? value.toLocaleString() : '0',
  };
}

// ============================================================================
// GESTURE VARIANTS
// ============================================================================

// Returns card hover motion props with gesture variants
export function useCardHover(): CardHoverMotion {
  const { prefersReducedMotion, getTransition } = useAnimationConfig();
  return createGestureProps(
    gestureVariants.cardHover,
    getTransition('spring'),
    prefersReducedMotion
  );
}

// Returns button gesture motion props (tap, hover, focus)
export function useButtonGesture() {
  const { prefersReducedMotion, getTransition } = useAnimationConfig();
  return createGestureProps(
    gestureVariants.buttonTap,
    getTransition('springSmooth'),
    prefersReducedMotion
  );
}

// ============================================================================
// IN VIEW DETECTION
// ============================================================================

// Enhanced useInView with defaults (once=true, amount=0.2)
// For full-page scroll sections that remount, pass once: false in options
export function useInView(
  ref: RefObject<Element | null>,
  options?: UseInViewOptions
) {
  const inView = useMotionInView(ref, {
    once: true,
    amount: 0.2,
    ...options,
  });
  return inView;
}

// ============================================================================
// ANIMATION SEQUENCING
// ============================================================================

// ============================================================================
// ANIMATION PRIORITY DETECTION
// ============================================================================

// Returns animation priority based on user preferences and device capability
export const useAnimationPriority = (): AnimationPriority => {
  const prefersReducedMotion = useReducedMotion();
  return prefersReducedMotion ? 'reduced' : getDeviceCapability();
};

// ============================================================================
// CONTENT MOTION
// ============================================================================

// Content motion states - defined once for reuse
const CONTENT_VISIBLE = { opacity: 1, y: 0 } as const;
const CONTENT_ENTER = { opacity: 0, y: 20 } as const;
const CONTENT_EXIT = { opacity: 0, y: -20 } as const;

// Returns motion config for main content transitions
export function useContentMotion() {
  const { prefersReducedMotion, getTransition } = useAnimationConfig();

  return {
    initial: prefersReducedMotion ? CONTENT_VISIBLE : CONTENT_ENTER,
    animate: CONTENT_VISIBLE,
    exit: prefersReducedMotion ? CONTENT_VISIBLE : CONTENT_EXIT,
    transition: getTransition('smooth', { duration: 0.5 }),
  } as const;
}

// ============================================================================
// SECTION SEQUENCE
// ============================================================================

// Orchestrates section animations based on scroll position
function useSectionSequence(
  ref: RefObject<HTMLElement | null>,
  selectors: {
    cards?: string;
    description?: string;
    cta?: string;
    [key: string]: string | undefined;
  },
  options: { offset?: UseScrollOptions['offset']; threshold?: number } = {}
) {
  const { offset = ['start 0.85', 'end 0.2'], threshold = 0.2 } = options;
  const { prefersReducedMotion, getStagger } = useAnimationConfig();
  const hasPlayed = useRef(false);
  const sequencePlan = buildSectionSequencePlan(selectors, getStagger);

  const { scrollYProgress } = useScroll({ target: ref, offset });

  // Reset on mount for full-page scroll sections that remount
  useEffect(() => {
    hasPlayed.current = false;
  }, []);

  useMotionValueEvent(scrollYProgress, 'change', (value) => {
    if (
      prefersReducedMotion ||
      hasPlayed.current ||
      value <= threshold ||
      !ref.current ||
      sequencePlan.length === 0
    )
      return;

    hasPlayed.current = true;
    runSectionSequence(ref.current, sequencePlan);
  });
}

// Consolidates timeline section ref setup (Education/WorkExperience pattern)
function useTimelineSectionRefs(viewportPreset: UseInViewOptions) {
  const sectionRef = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  const isInView = useInView(containerRef, viewportPreset);

  // Combine refs into single callback ref
  const combinedRef = useEventCallback((node: HTMLDivElement | null) => {
    sectionRef.current = node;
    containerRef.current = node;
  });

  return {
    sectionRef,
    containerRef,
    combinedRef,
    isInView,
  };
}

// Bundles timeline section refs, card motion, and scroll sequence wiring
export function useTimelineSectionController({
  viewportPreset = viewportPresets.section,
  selectors,
  sequenceOptions,
  variants = timelineCardVariants,
  hoverEffect = CARD_HOVER_LIFT,
  initialState = 'hidden',
  visibleState = 'visible',
  hiddenState = 'hidden',
}: TimelineSectionControllerOptions) {
  const timelineRefs = useTimelineSectionRefs(viewportPreset);
  const animateState = timelineRefs.isInView ? visibleState : hiddenState;

  useSectionSequence(timelineRefs.sectionRef, selectors, sequenceOptions);

  const cardMotion = useMotionVariant(variants, {
    initial: initialState,
    animate: animateState,
    whileHover: hoverEffect,
  });

  return {
    ...timelineRefs,
    cardMotion,
  };
}

// Simplified card inView hook for timeline cards
function useCardInView(viewportPreset: UseInViewOptions) {
  const cardRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(cardRef, viewportPreset);
  return { cardRef, isInView };
}

// Shared hook for timeline card motion with description animations
export function useTimelineCardMotion(
  viewportPreset: UseInViewOptions,
  variants: Variants = timelineDescriptionVariants
) {
  const { cardRef, isInView } = useCardInView(viewportPreset);

  const itemMotion = useMotionVariant(variants, {
    initial: 'hidden',
    animate: isInView ? 'visible' : 'hidden',
  });

  return { cardRef, isInView, itemMotion };
}

// ============================================================================
// MOTION V12 ENHANCED HOOKS
// ============================================================================

// Velocity-based tilt effect for draggable elements
export function useVelocityTilt(
  motionValueX: ReturnType<typeof useMotionValue<number>>,
  maxTilt = 15
) {
  const xVelocity = useVelocity(motionValueX);
  return useTransform(xVelocity, [-1000, 0, 1000], [-maxTilt, 0, maxTilt]);
}

// Batched DOM operations using Motion's frame utility
export function useBatchedDomUpdate() {
  const scheduleRead = useEventCallback((callback: () => void) => {
    frame.read(callback);
  });

  const scheduleRender = useEventCallback((callback: () => void) => {
    frame.render(callback);
  });

  return { scheduleRead, scheduleRender };
}
