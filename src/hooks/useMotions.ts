import { RefObject, useEffect, useLayoutEffect, useRef, useState } from 'react';

import {
  animate,
  stagger,
  useAnimate,
  useInView as useMotionInView,
  usePresence as useMotionPresence,
  useReducedMotion as useMotionReducedMotion,
  useMotionValue,
  useMotionValueEvent,
  useScroll,
  useSpring,
  useTransform,
} from 'motion/react';
import type {
  AnimationPlaybackControls,
  MotionProps,
  Transition,
  UseInViewOptions,
  UseScrollOptions,
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

// Detects if user prefers reduced motion
export function useReducedMotion(): boolean {
  const shouldReduce = useMotionReducedMotion();
  return shouldReduce ?? false;
}

// ============================================================================
// ANIMATION CONFIGURATION
// ============================================================================

// Animation configuration respecting user motion preferences with timing helpers
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

// Returns card hover motion props with gesture variants
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
    whileFocus: 'focus',
    whileTap: 'tap',
    transition: getTransition('spring'),
  };
}

// Returns button gesture motion props (tap, hover, focus)
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
    whileFocus: 'focus',
    whileTap: 'tap',
    transition: getTransition('springSmooth'),
  };
}

// ============================================================================
// SCROLL PROGRESS
// ============================================================================

// Tracks scroll progress as 0-1 value with useMotionValue (no re-renders)
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
// SMOOTH SCROLL PROGRESS (No Re-renders)
// ============================================================================

// Returns smoothed scroll progress using useSpring (120fps updates, no re-renders)
export function useSmoothScrollProgress(
  config = { stiffness: 100, damping: 30, restDelta: 0.001 }
) {
  const prefersReducedMotion = useReducedMotion();
  const { scrollYProgress } = useScroll();
  const smoothProgress = useSpring(scrollYProgress, config);

  return {
    scrollYProgress,
    smoothProgress: prefersReducedMotion ? scrollYProgress : smoothProgress,
  };
}

// ============================================================================
// SCROLL DIRECTION
// ============================================================================

// Detects scroll direction (up/down) using useMotionValueEvent
export function useScrollDirection() {
  const { scrollY } = useScroll();
  const [direction, setDirection] = useState<'up' | 'down' | null>(null);

  useMotionValueEvent(scrollY, 'change', (current) => {
    const previous = scrollY.getPrevious() ?? 0;
    const diff = current - previous;

    if (diff !== 0) {
      setDirection(diff > 0 ? 'down' : 'up');
    }
  });

  return { direction, scrollY };
}

// ============================================================================
// CONTINUOUS MOTION VALUE
// ============================================================================

// Creates a motion value for continuous animations (120fps, no re-renders)
export function useContinuousMotion<T extends string | number>(
  initialValue: T
) {
  const motionValue = useMotionValue(initialValue);

  return {
    motionValue,
    set: (value: T) => motionValue.set(value),
    get: () => motionValue.get(),
  };
}

// ============================================================================
// PARALLAX TRANSFORM
// ============================================================================

// Creates parallax effect using useTransform (no re-renders)
export function useParallaxTransform(
  ref: RefObject<HTMLElement>,
  range: [number, number] = [-50, 50]
) {
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start end', 'end start'],
  });

  const y = useTransform(scrollYProgress, [0, 1], range);

  return { y, scrollYProgress };
}

// ============================================================================
// IN VIEW DETECTION
// ============================================================================

// Enhanced useInView with defaults (once=true, amount=0.2)
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

// Detects if component is present in AnimatePresence tree
export function usePresence(): PresenceControls {
  const [isPresent, safeToRemove] = useMotionPresence();

  return { isPresent, safeToRemove: safeToRemove ?? null };
}

// ============================================================================
// ANIMATION SEQUENCING
// ============================================================================

// Orchestrates complex animation sequences with cleanup
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
    // Handle function-based scope refs
    if (typeof scope === 'function') {
      (scope as (node: Element | null) => void)(node);
      return;
    }

    // Handle object-based scope refs
    if (scope && typeof scope === 'object' && 'current' in scope) {
      (scope as React.MutableRefObject<Element | null>).current = node;
    }
  });

  const runSequence = useEventCallback(
    async (builder: (animate: SequenceAnimator) => Promise<void> | void) => {
      // Safety check: ensure scope element exists before running animations
      const scopeElement =
        typeof scope === 'object' && scope && 'current' in scope
          ? scope.current
          : null;

      if (!scopeElement) {
        return;
      }

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

// Note: width/height/top/left are measurement values, not animation properties
// They're used for layout calculations, not animated directly
const defaultMeasureRect: MeasureRect = {
  width: 0,
  height: 0,
  top: 0,
  left: 0,
};

// Measures element dimensions with ResizeObserver
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

// Detects device capability for complex animations (high/reduced)
export function useAnimationPriority(): AnimationPriority {
  const prefersReducedMotion = useReducedMotion();
  if (prefersReducedMotion) {
    return 'reduced';
  }

  return detectAnimationPriority();
}

// ============================================================================
// CONTENT MOTION
// ============================================================================

// Returns motion config for main content transitions
export function useContentMotion() {
  const { prefersReducedMotion, getTransition } = useAnimationConfig();

  const initial = prefersReducedMotion
    ? { opacity: 1, y: 0 }
    : { opacity: 0, y: 24 };
  const animate = { opacity: 1, y: 0 };
  const exit = prefersReducedMotion
    ? { opacity: 1, y: 0 }
    : { opacity: 0, y: -24 };

  return {
    initial,
    animate,
    exit,
    transition: getTransition('smooth', { duration: 0.55 }),
  } as const;
}

// ============================================================================
// SECTION SEQUENCE
// ============================================================================

// Orchestrates section animations based on scroll position with hardware-accelerated transforms
export function useSectionSequence(
  ref: RefObject<HTMLElement | null>,
  selectors: {
    cards?: string;
    description?: string;
    cta?: string;
    [key: string]: string | undefined;
  },
  options: {
    offset?: UseScrollOptions['offset'];
    threshold?: number;
  } = {}
) {
  const { offset = ['start 0.85', 'end 0.2'], threshold = 0.2 } = options;
  const { prefersReducedMotion, getStagger } = useAnimationConfig();
  const hasPlayed = useRef(false);

  const { scrollYProgress } = useScroll({
    target: ref,
    offset,
  });

  useMotionValueEvent(scrollYProgress, 'change', (value) => {
    if (
      prefersReducedMotion ||
      hasPlayed.current ||
      value <= threshold ||
      !ref.current
    ) {
      return;
    }

    hasPlayed.current = true;
    const scopeElement = ref.current;

    // Animate description first - use combined transform for hardware acceleration
    if (selectors.description) {
      const elements = scopeElement.querySelectorAll(selectors.description);
      if (elements.length > 0) {
        animate(
          elements,
          {
            opacity: [0, 1],
            transform: ['translateY(20px)', 'translateY(0px)'],
          },
          { duration: 0.5, ease: 'easeOut' }
        );
      }
    }

    // Animate cards with stagger - use combined transform
    if (selectors.cards) {
      const delay = selectors.description ? 0.2 : 0;
      const elements = scopeElement.querySelectorAll(selectors.cards);
      if (elements.length > 0) {
        animate(
          elements,
          {
            opacity: [0, 1],
            transform: ['translateY(20px)', 'translateY(0px)'],
          },
          {
            delay: stagger(getStagger(0.1), { startDelay: delay }),
            duration: 0.5,
            ease: 'easeOut',
          }
        );
      }
    }

    // Animate CTA last - use combined transform
    if (selectors.cta) {
      const delay =
        (selectors.description ? 0.2 : 0) + (selectors.cards ? 0.4 : 0);
      const elements = scopeElement.querySelectorAll(selectors.cta);
      if (elements.length > 0) {
        animate(
          elements,
          {
            opacity: [0, 1],
            transform: ['translateY(20px)', 'translateY(0px)'],
          },
          {
            delay: stagger(0.1, { startDelay: delay }),
            duration: 0.5,
            ease: 'easeOut',
          }
        );
      }
    }
  });
}
