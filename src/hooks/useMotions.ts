import {
  MutableRefObject,
  useCallback,
  useLayoutEffect,
  useState,
  useSyncExternalStore,
} from 'react';

import {
  useAnimate,
  usePresence as useMotionPresence,
  useMotionValueEvent,
  useScroll,
} from 'motion/react';
import type {
  AnimationOptions,
  AnimationPlaybackControls,
  DOMKeyframesDefinition,
  ElementOrSelector,
  MotionValue,
  Transition,
} from 'motion/react';

import type {
  AnimationConfig,
  AnimationPriority,
  CardHoverMotion,
  MeasureRect,
  TransitionPreset,
  UseMeasureReturn,
} from '@/config/types';
import { motionVariants, transitions } from '@/utils/motionVariants';

const REDUCED_MOTION_QUERY = '(prefers-reduced-motion: reduce)';
const BASE_DURATION = 0.65;
const BASE_DELAY = 0.08;
const BASE_STAGGER = 0.12;

const subscribeToReducedMotion = (listener: () => void): (() => void) => {
  if (typeof window === 'undefined') {
    return () => undefined;
  }

  const mediaQuery = window.matchMedia(REDUCED_MOTION_QUERY);
  const handleChange = () => listener();

  if (typeof mediaQuery.addEventListener === 'function') {
    mediaQuery.addEventListener('change', handleChange);
    return () => mediaQuery.removeEventListener('change', handleChange);
  }

  mediaQuery.addListener(handleChange);
  return () => mediaQuery.removeListener(handleChange);
};

const getReducedMotionSnapshot = (): boolean => {
  if (typeof window === 'undefined') {
    return true;
  }

  return window.matchMedia(REDUCED_MOTION_QUERY).matches;
};

export function useReducedMotion(): boolean {
  return useSyncExternalStore(
    subscribeToReducedMotion,
    getReducedMotionSnapshot,
    () => true
  );
}

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
        ease: base.ease,
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
  };
}

export function useCardHover(): CardHoverMotion {
  const { prefersReducedMotion, getTransition } = useAnimationConfig();

  const variants = motionVariants.gesture.cardHover;
  const transition = getTransition('springy');

  if (prefersReducedMotion) {
    return {
      variants,
      initial: 'rest',
      animate: 'rest',
      transition,
    };
  }

  return {
    variants,
    initial: 'rest',
    animate: 'rest',
    whileHover: 'hover',
    whileTap: 'tap',
    transition,
  };
}

export interface ScrollProgressValue {
  value: MotionValue<number>;
  progress: number;
}

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

export interface PresenceControls {
  isPresent: boolean;
  safeToRemove: (() => void) | null;
}

export function usePresence(): PresenceControls {
  const [isPresent, safeToRemove] = useMotionPresence();

  return { isPresent, safeToRemove: safeToRemove ?? null };
}

type SequenceAnimator = (
  target: ElementOrSelector,
  keyframes: DOMKeyframesDefinition,
  options?: AnimationOptions
) => AnimationPlaybackControls;

export interface AnimationSequenceControls {
  scopeRef: (node: Element | null) => void;
  runSequence: (
    builder: (animate: SequenceAnimator) => Promise<void> | void
  ) => Promise<void>;
}

export function useAnimationSequence(): AnimationSequenceControls {
  const [scope, animate] = useAnimate();

  const scopeRef = useCallback(
    (node: Element | null) => {
      if (typeof scope === 'function') {
        scope(node);
        return;
      }

      if (scope && typeof scope === 'object') {
        // This is the official pattern from motion/react documentation
        // The scope ref mutation is required by the library's API design
        // eslint-disable-next-line react-compiler/react-compiler, react-hooks/immutability
        (scope as MutableRefObject<Element | null>).current = node;
      }
    },
    [scope]
  );
  const runSequence = async (
    builder: (animate: SequenceAnimator) => Promise<void> | void
  ) => {
    await builder(animate);
  };

  return {
    scopeRef,
    runSequence,
  };
}

const defaultMeasureRect: MeasureRect = {
  width: 0,
  height: 0,
  top: 0,
  left: 0,
};

export function useMeasure<
  T extends HTMLElement = HTMLElement,
>(): UseMeasureReturn<T> {
  const [node, setNode] = useState<T | null>(null);
  const [bounds, setBounds] = useState<MeasureRect>(defaultMeasureRect);

  const measureNode = useCallback((element: T) => {
    const rect = element.getBoundingClientRect();
    setBounds({
      width: rect.width,
      height: rect.height,
      top: rect.top + window.scrollY,
      left: rect.left + window.scrollX,
    });
  }, []);

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

    const observer = new ResizeObserver(() => {
      measure();
    });

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

const detectAnimationPriority = (): AnimationPriority => {
  if (typeof navigator === 'undefined') {
    return 'reduced';
  }

  const cores = navigator.hardwareConcurrency ?? 4;
  const memory =
    (navigator as Navigator & { deviceMemory?: number }).deviceMemory ?? 4;

  if (cores <= 4 || memory <= 4) {
    return 'reduced';
  }

  return 'high';
};

export function useAnimationPriority(): AnimationPriority {
  const prefersReducedMotion = useReducedMotion();
  if (prefersReducedMotion) {
    return 'reduced';
  }

  return detectAnimationPriority();
}
