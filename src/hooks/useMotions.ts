import { RefObject, useEffect, useLayoutEffect, useRef, useState } from 'react';

import {
  useAnimate,
  useInView as useMotionInView,
  usePresence as useMotionPresence,
  useReducedMotion as useMotionReducedMotion,
  useMotionValueEvent,
  useScroll,
} from 'motion/react';
import type {
  AnimationPlaybackControls,
  MotionProps,
  Transition,
  UseInViewOptions,
} from 'motion/react';

import {
  BASE_DELAY,
  BASE_DURATION,
  BASE_STAGGER,
  gestureVariants,
  REDUCED_MOTION_TARGET,
  transitions,
  viewportConfig,
} from '@/config/motion';
import type {
  AnimationConfig,
  AnimationPriority,
  AnimationSequenceControls,
  CardHoverMotion,
  MeasureRect,
  PresenceControls,
  ScrollProgressValue,
  SequenceAnimator,
  TransitionPreset,
  UseMeasureReturn,
} from '@/config/types';
import useEventCallback from '@/hooks/useEventCallback';

// ============================================================================
// REDUCED MOTION DETECTION
// ============================================================================

/**
 * Detects if user prefers reduced motion
 * @returns boolean indicating reduced motion preference
 */
export function useReducedMotion(): boolean {
  const shouldReduce = useMotionReducedMotion();
  return shouldReduce ?? false;
}

// ============================================================================
// ANIMATION CONFIGURATION
// ============================================================================

/**
 * Centralized animation configuration respecting user preferences
 * Provides timing helpers and motion-safe defaults
 */
export function useAnimationConfig(): AnimationConfig {
  const prefersReducedMotion = useReducedMotion();

  const getDuration = (multiplier = 1) =>
    prefersReducedMotion ? 0 : BASE_DURATION * multiplier;

  const getDelay = (steps = 1) =>
    prefersReducedMotion ? 0 : BASE_DELAY * steps;

  const getStagger = (multiplier = 1) =>
    prefersReducedMotion ? 0 : BASE_STAGGER * multiplier;

  const getTransition = (
    preset: TransitionPreset = 'smooth',
    overrides?: Partial<Transition>
  ) => {
    const base = transitions[preset] ?? transitions.smooth;

    if (prefersReducedMotion) {
      return {
        ...base,
        duration: 0.01,
        ...overrides,
      };
    }

    return { ...base, ...overrides };
  };

  return {
    prefersReducedMotion,
    getDuration,
    getDelay,
    getStagger,
    getTransition,
    motionViewport: viewportConfig,
    reducedMotionTarget: REDUCED_MOTION_TARGET,
    resolveMotionState: <T extends MotionProps['initial']>(
      prefersReduced: boolean,
      state?: T,
      fallback: T = REDUCED_MOTION_TARGET as T
    ): T => (prefersReduced ? fallback : (state ?? fallback)),
  };
}

// ============================================================================
// GESTURE VARIANTS
// ============================================================================

/**
 * Returns card hover motion props with gesture variants
 */
export function useCardHover(): CardHoverMotion {
  const { prefersReducedMotion, getTransition } = useAnimationConfig();

  if (prefersReducedMotion) {
    return {
      variants: gestureVariants.cardHover,
      initial: 'rest',
      animate: 'rest',
      transition: getTransition('spring'),
    };
  }

  return {
    variants: gestureVariants.cardHover,
    initial: 'rest',
    animate: 'rest',
    whileHover: 'hover',
    whileTap: 'tap',
    transition: getTransition('spring'),
  };
}

/**
 * Returns button gesture motion props
 */
export function useButtonGesture() {
  const { prefersReducedMotion, getTransition } = useAnimationConfig();

  if (prefersReducedMotion) {
    return {
      variants: gestureVariants.buttonTap,
      initial: 'rest',
      animate: 'rest',
      transition: getTransition('springSmooth'),
    };
  }

  return {
    variants: gestureVariants.buttonTap,
    initial: 'rest',
    animate: 'rest',
    whileHover: 'hover',
    whileTap: 'tap',
    transition: getTransition('springSmooth'),
  };
}

// ============================================================================
// SCROLL PROGRESS
// ============================================================================

/**
 * Tracks scroll progress as a 0-1 value
 */
export function useScrollProgress(): ScrollProgressValue {
  const { scrollYProgress } = useScroll();
  const [progress, setProgress] = useState(0);

  useMotionValueEvent(scrollYProgress, 'change', (latest) => {
    setProgress(latest);
  });

  return {
    value: scrollYProgress,
    progress,
  };
}

// ============================================================================
// IN VIEW DETECTION
// ============================================================================

/**
 * Enhanced useInView with sensible defaults
 */
export function useInView(ref: RefObject<Element>, options?: UseInViewOptions) {
  return useMotionInView(ref, {
    once: true,
    amount: 0.2,
    ...options,
  });
}

// ============================================================================
// PRESENCE DETECTION
// ============================================================================

/**
 * Detects if component is present in AnimatePresence tree
 */
export function usePresence(): PresenceControls {
  const [isPresent, safeToRemove] = useMotionPresence();

  return { isPresent, safeToRemove: safeToRemove ?? null };
}

// ============================================================================
// ANIMATION SEQUENCING
// ============================================================================

/**
 * Orchestrates complex animation sequences with cleanup
 */
export function useAnimationSequence(): AnimationSequenceControls {
  const [scope, animate] = useAnimate();
  const controlsRef = useRef<AnimationPlaybackControls[]>([]);
  const [isAnimating, setIsAnimating] = useState(false);

  useEffect(() => {
    return () => {
      controlsRef.current.forEach((control) => control.stop());
      controlsRef.current = [];
    };
  }, []);

  const scopeRef = useEventCallback((node: Element | null) => {
    if (scope && typeof scope === 'function') {
      (scope as (node: Element | null) => void)(node);
      return;
    }

    if (scope && typeof scope === 'object' && 'current' in scope) {
      (scope as { current: Element | null }).current = node;
    }
  });

  const runSequence = useEventCallback(
    async (builder: (animate: SequenceAnimator) => Promise<void> | void) => {
      setIsAnimating(true);

      const registeringAnimator: SequenceAnimator = (
        target,
        keyframes,
        options
      ) => {
        const control = animate(target, keyframes, options);
        controlsRef.current.push(control);
        return control;
      };

      try {
        await builder(registeringAnimator);
      } finally {
        controlsRef.current = [];
        setIsAnimating(false);
      }
    }
  );

  return {
    scopeRef,
    runSequence,
    isAnimating,
  };
}

// ============================================================================
// ELEMENT MEASUREMENT
// ============================================================================

const defaultMeasureRect: MeasureRect = {
  width: 0,
  height: 0,
  top: 0,
  left: 0,
};

/**
 * Measures element dimensions with ResizeObserver
 */
export function useMeasure<
  T extends HTMLElement = HTMLElement,
>(): UseMeasureReturn<T> {
  const [node, setNode] = useState<T | null>(null);
  const [bounds, setBounds] = useState<MeasureRect>(defaultMeasureRect);

  const measureNode = useEventCallback((element: T) => {
    const rect = element.getBoundingClientRect();
    setBounds({
      width: rect.width,
      height: rect.height,
      top: rect.top + window.scrollY,
      left: rect.left + window.scrollX,
    });
  });

  const remeasure = () => {
    if (node && typeof window !== 'undefined') {
      measureNode(node);
    }
  };

  useLayoutEffect(() => {
    if (!node || typeof window === 'undefined') {
      return;
    }

    const measure = () => measureNode(node);
    const frame = window.requestAnimationFrame(measure);

    if (typeof ResizeObserver === 'undefined') {
      return () => {
        cancelAnimationFrame(frame);
      };
    }

    const observer = new ResizeObserver(measure);
    observer.observe(node);

    return () => {
      cancelAnimationFrame(frame);
      observer.disconnect();
    };
  }, [node, measureNode]);

  return {
    ref: (instance: T | null) => {
      setNode(instance);
    },
    bounds,
    remeasure,
  };
}

// ============================================================================
// ANIMATION PRIORITY DETECTION
// ============================================================================

const detectAnimationPriority = (): AnimationPriority => {
  if (typeof navigator === 'undefined') {
    return 'reduced';
  }

  const cores = navigator.hardwareConcurrency ?? 4;
  const memory =
    (navigator as Navigator & { deviceMemory?: number }).deviceMemory ?? 4;

  // Low-end devices get reduced animations
  if (cores <= 4 || memory <= 4) {
    return 'reduced';
  }

  return 'high';
};

/**
 * Detects device capability for complex animations
 */
export function useAnimationPriority(): AnimationPriority {
  const prefersReducedMotion = useReducedMotion();
  if (prefersReducedMotion) {
    return 'reduced';
  }

  return detectAnimationPriority();
}
