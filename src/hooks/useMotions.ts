import {
  RefObject,
  useEffect,
  useLayoutEffect,
  useRef,
  useState,
  useSyncExternalStore,
} from 'react';

import {
  animate,
  frame,
  stagger,
  useAnimate,
  useAnimationFrame,
  useInView as useMotionInView,
  usePresence as useMotionPresence,
  useReducedMotion as useMotionReducedMotion,
  useMotionTemplate,
  useMotionValue,
  useMotionValueEvent,
  useScroll,
  useSpring,
  useTime,
  useTransform,
  useVelocity,
} from 'motion/react';
import type {
  AnimationOptions,
  AnimationPlaybackControls,
  DOMKeyframesDefinition,
  ElementOrSelector,
  MotionProps,
  Target,
  Transition,
  UseInViewOptions,
  UseScrollOptions,
  Variants,
} from 'motion/react';

import {
  BASE_DELAY,
  BASE_DURATION,
  BASE_STAGGER,
  CARD_HOVER_LIFT,
  gestureVariants,
  REDUCED_MOTION_TARGET,
  timelineCardVariants,
  timelineDescriptionVariants,
  transitions,
  viewportConfig,
  viewportPresets,
} from '@/config/motion';
import type {
  AnimationConfig,
  AnimationPriority,
  AnimationSequenceControls,
  CardHoverMotion,
  CursorFollowResult,
  MeasureRect,
  PresenceControls,
  ScrollProgressValue,
  SequenceAnimator,
  SequenceItem,
  TimelineControls,
  TimelineSegment,
  TransitionPreset,
  UseMeasureReturn,
} from '@/config/types';

import useEventCallback from './useEventCallback';

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

// Helper to resolve motion state based on preferences
function resolveMotionState<T extends MotionProps['initial']>(
  prefersReduced: boolean,
  state?: T,
  fallback: T = REDUCED_MOTION_TARGET as T
): T {
  return prefersReduced ? fallback : (state ?? fallback);
}

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
    return prefersReducedMotion
      ? { ...base, duration: 0.01, ...overrides }
      : { ...base, ...overrides };
  };

  return {
    prefersReducedMotion,
    getDuration,
    getDelay,
    getStagger,
    getTransition,
    motionViewport: viewportConfig,
    reducedMotionTarget: REDUCED_MOTION_TARGET,
    resolveMotionState: (prefersReduced, state, fallback) =>
      resolveMotionState(prefersReduced, state, fallback),
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
    return {
      initial: options?.animate ?? options?.whileInView ?? 'animate',
      animate: options?.animate ?? options?.whileInView ?? 'animate',
    };
  }

  // Support both animate and whileInView modes
  // If animate is explicitly provided, use it instead of whileInView
  const hasExplicitAnimate = options?.animate !== undefined;

  if (hasExplicitAnimate) {
    return {
      variants,
      initial: options?.initial ?? 'initial',
      animate: options.animate,
      whileHover: options?.whileHover,
      whileTap: options?.whileTap,
      whileFocus: options?.whileFocus,
    };
  }

  return {
    variants,
    initial: options?.initial ?? 'initial',
    whileInView: options?.whileInView ?? 'animate',
    viewport: options?.viewport ?? motionViewport,
    whileHover: options?.whileHover,
    whileTap: options?.whileTap,
    whileFocus: options?.whileFocus,
  };
}

// Returns motion props for in-view animations with custom variants
export function useInViewMotion(
  variants?: { hidden?: Target; visible?: Target },
  options?: { viewport?: UseInViewOptions; transition?: Transition }
) {
  const { prefersReducedMotion, getTransition, reducedMotionTarget } =
    useAnimationConfig();

  if (prefersReducedMotion) {
    return {
      initial: reducedMotionTarget,
      animate: reducedMotionTarget,
    };
  }

  const defaultHidden = { opacity: 0, y: 20 };
  const defaultVisible = { opacity: 1, y: 0 };

  return {
    initial: variants?.hidden ?? defaultHidden,
    whileInView: variants?.visible ?? defaultVisible,
    viewport: { once: true, amount: 0.2, ...options?.viewport },
    transition:
      options?.transition ?? getTransition('easeOut', { duration: 0.5 }),
  };
}

// ============================================================================
// COUNT UP ANIMATION
// ============================================================================

// Animates a number from 0 to value
export function useCountUp(value: number, duration = 0.7) {
  const { prefersReducedMotion, getTransition } = useAnimationConfig();
  const motionValue = useMotionValue(prefersReducedMotion ? value : 0);
  const ref = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    if (prefersReducedMotion) {
      if (ref.current) ref.current.textContent = value.toLocaleString();
      return;
    }

    const controls = animate(motionValue, value, {
      ...getTransition('smooth', { duration }),
    });

    return () => controls.stop();
  }, [value, prefersReducedMotion, motionValue, getTransition, duration]);

  useMotionValueEvent(motionValue, 'change', (latest) => {
    if (ref.current) {
      ref.current.textContent = Math.round(latest).toLocaleString();
    }
  });

  return { ref, value: prefersReducedMotion ? value.toLocaleString() : '0' };
}

// ============================================================================
// GESTURE VARIANTS
// ============================================================================

// Helper to create gesture variant props
function createGestureProps(
  variants: (typeof gestureVariants)[keyof typeof gestureVariants],
  transition: Transition,
  prefersReducedMotion: boolean
) {
  const base = { variants, initial: 'rest', animate: 'rest', transition };
  return prefersReducedMotion
    ? base
    : { ...base, whileHover: 'hover', whileFocus: 'focus', whileTap: 'tap' };
}

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
// SCROLL PROGRESS
// ============================================================================

// Tracks scroll progress as motion value (no re-renders)
export function useScrollProgress(): ScrollProgressValue {
  const { scrollYProgress } = useScroll();
  const progress = scrollYProgress.get();

  return {
    value: scrollYProgress,
    // progress property kept for backwards compatibility - snapshot of current value
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

// Helper to extract scope element
function getScopeElement(
  scope: ReturnType<typeof useAnimate>[0]
): Element | null {
  if (typeof scope === 'object' && scope && 'current' in scope) {
    return scope.current;
  }
  return null;
}

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
    if (typeof scope === 'function') {
      (scope as (node: Element | null) => void)(node);
      return;
    }

    if (scope && typeof scope === 'object' && 'current' in scope) {
      (scope as React.MutableRefObject<Element | null>).current = node;
    }
  });

  const runSequence = useEventCallback(
    async (builder: (animate: SequenceAnimator) => Promise<void> | void) => {
      const scopeElement = getScopeElement(scope);
      if (!scopeElement) return;

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

  return { scopeRef, runSequence, isAnimating };
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

// Device capability detection helper
function getDeviceCapability(): AnimationPriority {
  if (typeof navigator === 'undefined') return 'reduced';

  const cores = navigator.hardwareConcurrency ?? 4;
  const memory =
    (navigator as Navigator & { deviceMemory?: number }).deviceMemory ?? 4;

  return cores <= 4 || memory <= 4 ? 'reduced' : 'high';
}

// Detects device capability for complex animations (high/reduced)
export function useAnimationPriority(): AnimationPriority {
  const prefersReducedMotion = useReducedMotion();
  return prefersReducedMotion ? 'reduced' : getDeviceCapability();
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

// Helper to animate elements with hardware-accelerated transforms
type SectionSequenceStep = {
  selector: string;
  delay: number;
  useStagger: boolean;
  staggerValue?: number;
};

const DESCRIPTION_TO_CARD_DELAY = 0.2;
const CTA_AFTER_CARD_DELAY = 0.4;
const CTA_STAGGER = 0.1;

function animateElements(
  scopeElement: HTMLElement,
  selector: string,
  delay: number,
  useStagger: boolean,
  staggerValue = BASE_STAGGER
) {
  const elements = scopeElement.querySelectorAll(selector);
  if (elements.length === 0) return;

  const keyframes = {
    opacity: [0, 1],
    y: [20, 0],
  };

  const options = useStagger
    ? {
        delay: stagger(staggerValue, { startDelay: delay }),
        duration: 0.5,
        ease: 'easeOut' as const,
      }
    : { delay, duration: 0.5, ease: 'easeOut' as const };

  animate(elements, keyframes, options);
}

function buildSectionSequencePlan(
  selectors: {
    cards?: string;
    description?: string;
    cta?: string;
    [key: string]: string | undefined;
  },
  getStagger: AnimationConfig['getStagger']
): SectionSequenceStep[] {
  const steps: SectionSequenceStep[] = [];

  if (selectors.description) {
    steps.push({
      selector: selectors.description,
      delay: 0,
      useStagger: false,
    });
  }

  if (selectors.cards) {
    steps.push({
      selector: selectors.cards,
      delay: selectors.description ? DESCRIPTION_TO_CARD_DELAY : 0,
      useStagger: true,
      staggerValue: getStagger(0.1),
    });
  }

  if (selectors.cta) {
    const baseDelay = selectors.description ? DESCRIPTION_TO_CARD_DELAY : 0;
    const cardDelay = selectors.cards ? CTA_AFTER_CARD_DELAY : 0;

    steps.push({
      selector: selectors.cta,
      delay: baseDelay + cardDelay,
      useStagger: true,
      staggerValue: CTA_STAGGER,
    });
  }

  return steps;
}

function runSectionSequence(
  scopeElement: HTMLElement,
  steps: SectionSequenceStep[]
) {
  steps.forEach(({ selector, delay, useStagger, staggerValue }) =>
    animateElements(scopeElement, selector, delay, useStagger, staggerValue)
  );
}

// Orchestrates section animations based on scroll position with hardware-accelerated transforms
export function useSectionSequence(
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
    const scopeElement = ref.current;

    runSectionSequence(scopeElement, sequencePlan);
  });
}

// Consolidates timeline section ref setup (Education/WorkExperience pattern)
export function useTimelineSectionRefs(viewportPreset: UseInViewOptions) {
  const { scopeRef } = useAnimationSequence();
  const sectionRef = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  const isInView = useMotionInView(containerRef, viewportPreset);

  // Combine refs into single callback ref
  const combinedRef = useEventCallback((node: HTMLDivElement | null) => {
    sectionRef.current = node;
    containerRef.current = node;
    scopeRef(node);
  });

  return {
    sectionRef,
    containerRef,
    combinedRef,
    isInView,
    scopeRef,
  };
}

type TimelineSequenceSelectors = Parameters<typeof useSectionSequence>[1];
type TimelineSequenceOptions = Parameters<typeof useSectionSequence>[2];

interface TimelineSectionControllerOptions {
  viewportPreset?: UseInViewOptions;
  selectors: TimelineSequenceSelectors;
  sequenceOptions?: TimelineSequenceOptions;
  variants?: Variants;
  hoverEffect?: Target | string;
  initialState?: string;
  visibleState?: string;
  hiddenState?: string;
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
export function useCardInView(viewportPreset: UseInViewOptions) {
  const cardRef = useRef<HTMLDivElement>(null);
  const isInView = useMotionInView(cardRef, viewportPreset);
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

// Tracks velocity of a motion value for physics-based effects
export function useMotionVelocity(
  motionValue: ReturnType<typeof useMotionValue<number>>
) {
  return useVelocity(motionValue);
}

// Creates time-based animations (perpetual, no re-renders)
export function useTimeBasedAnimation(duration: number, clamp = false) {
  const time = useTime();

  return useTransform(time, [0, duration], [0, 1], { clamp });
}

// Cursor-following motion values with spring physics
export function useCursorFollow(
  stiffness = 150,
  damping = 20
): CursorFollowResult {
  const prefersReducedMotion = useReducedMotion();
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const smoothX = useSpring(mouseX, { stiffness, damping });
  const smoothY = useSpring(mouseY, { stiffness, damping });
  const [isActive, setIsActive] = useState(false);

  useEffect(() => {
    if (prefersReducedMotion) return;

    const handleMove = (e: MouseEvent) => {
      mouseX.set(e.clientX);
      mouseY.set(e.clientY);
      setIsActive(true);
    };

    const handleLeave = () => setIsActive(false);

    window.addEventListener('mousemove', handleMove);
    document.addEventListener('mouseleave', handleLeave);

    return () => {
      window.removeEventListener('mousemove', handleMove);
      document.removeEventListener('mouseleave', handleLeave);
    };
  }, [prefersReducedMotion, mouseX, mouseY]);

  return {
    x: prefersReducedMotion ? mouseX : smoothX,
    y: prefersReducedMotion ? mouseY : smoothY,
    isActive,
  };
}

// Dynamic gradient that follows cursor position with cached rect for performance
export function useCursorGradient(
  ref: RefObject<HTMLElement | null>,
  gradientSize = 50
) {
  const prefersReducedMotion = useReducedMotion();
  const x = useMotionValue(50);
  const y = useMotionValue(50);
  const rectRef = useRef<DOMRect | null>(null);

  const background = useMotionTemplate`
    radial-gradient(
      circle at ${x}% ${y}%,
      rgba(255,255,255,0.15),
      transparent ${gradientSize}%
    )
  `;

  useEffect(() => {
    const element = ref.current;
    if (prefersReducedMotion || !element) return;

    // Cache rect initially and update on scroll/resize
    const updateRect = () => {
      rectRef.current = element.getBoundingClientRect();
    };
    updateRect();

    const handleMove = (e: MouseEvent) => {
      const rect = rectRef.current;
      if (!rect) return;
      x.set(((e.clientX - rect.left) / rect.width) * 100);
      y.set(((e.clientY - rect.top) / rect.height) * 100);
    };

    element.addEventListener('mousemove', handleMove);
    window.addEventListener('resize', updateRect);
    window.addEventListener('scroll', updateRect, { passive: true });

    return () => {
      element.removeEventListener('mousemove', handleMove);
      window.removeEventListener('resize', updateRect);
      window.removeEventListener('scroll', updateRect);
    };
  }, [prefersReducedMotion, ref, x, y]);

  return { background, x, y };
}

// Velocity-based tilt effect for draggable elements
export function useVelocityTilt(
  motionValueX: ReturnType<typeof useMotionValue<number>>,
  maxTilt = 15
) {
  const xVelocity = useVelocity(motionValueX);
  return useTransform(xVelocity, [-1000, 0, 1000], [-maxTilt, 0, maxTilt]);
}

// Timeline sequencing for complex animation orchestration
export function useTimelineSequence() {
  const controlsRef = useRef<TimelineControls | null>(null);
  const { prefersReducedMotion } = useAnimationConfig();

  const runTimeline = useEventCallback((segments: TimelineSegment[]) => {
    if (prefersReducedMotion || segments.length === 0) return null;

    controlsRef.current?.stop();

    // Build sequence array in Motion's expected format
    const sequence: SequenceItem[] = segments.map((seg) => {
      if (seg.options) {
        return [seg.target, seg.keyframes, seg.options] as [
          ElementOrSelector,
          DOMKeyframesDefinition,
          AnimationOptions,
        ];
      }
      return [seg.target, seg.keyframes] as [
        ElementOrSelector,
        DOMKeyframesDefinition,
      ];
    });

    const controls = animate(sequence);

    controlsRef.current = {
      play: () => controls.play?.(),
      pause: () => controls.pause?.(),
      stop: () => controls.stop(),
      get time() {
        return controls.time;
      },
      set time(t: number) {
        controls.time = t;
      },
      get duration() {
        return controls.duration;
      },
      get speed() {
        return controls.speed;
      },
      set speed(s: number) {
        controls.speed = s;
      },
    };

    return controlsRef.current;
  });

  useEffect(() => {
    return () => {
      controlsRef.current?.stop();
    };
  }, []);

  useEffect(() => {
    if (!prefersReducedMotion) return;
    controlsRef.current?.stop();
    controlsRef.current = null;
  }, [prefersReducedMotion]);

  return { runTimeline, controls: controlsRef.current };
}

// Smooth scroll progress with velocity tracking
export function useEnhancedScrollProgress(
  config = {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001,
    mass: 0.5,
  }
) {
  const prefersReducedMotion = useReducedMotion();
  const { scrollYProgress, scrollY } = useScroll();
  const smoothProgress = useSpring(scrollYProgress, config);
  const velocity = useVelocity(smoothProgress);
  const zeroVelocity = useMotionValue(0);

  return {
    scrollYProgress,
    scrollY,
    smoothProgress: prefersReducedMotion ? scrollYProgress : smoothProgress,
    velocity: prefersReducedMotion ? zeroVelocity : velocity,
  };
}

// Continuous animation frame for custom render loops
export function useContinuousFrame(
  callback: (time: number, delta: number) => void,
  enabled = true
) {
  const prefersReducedMotion = useReducedMotion();

  useAnimationFrame((time, delta) => {
    if (!enabled || prefersReducedMotion) return;
    callback(time, delta);
  });
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

// Pulsing animation using useTime
export function usePulse(minScale = 1, maxScale = 1.1, duration = 2000) {
  const prefersReducedMotion = useReducedMotion();
  const time = useTime();

  const scale = useTransform(time, (t) => {
    if (prefersReducedMotion) return 1;
    const progress = (Math.sin((t / duration) * Math.PI * 2) + 1) / 2;
    return minScale + progress * (maxScale - minScale);
  });

  return scale;
}

// SVG path draw animation hook
export function useSvgPathDraw(
  ref: RefObject<SVGPathElement | null>,
  options: { duration?: number; delay?: number; once?: boolean } = {}
) {
  const { duration = 1.5, delay = 0, once = true } = options;
  const { prefersReducedMotion, getTransition } = useAnimationConfig();
  const isInView = useMotionInView(ref, { once, amount: 0.5 });
  const pathLength = useMotionValue(prefersReducedMotion ? 1 : 0);

  useEffect(() => {
    if (!isInView || prefersReducedMotion) return;

    const controls = animate(pathLength, 1, {
      ...getTransition('easeOut', { duration, delay }),
    });

    return () => controls.stop();
  }, [
    isInView,
    prefersReducedMotion,
    pathLength,
    getTransition,
    duration,
    delay,
  ]);

  return { pathLength, isInView };
}

// ============================================================================
// MOBILE BREAKPOINT DETECTION
// ============================================================================

// MUI breakpoint values (matches MUI's default theme)
const BREAKPOINT_VALUES = {
  xs: 600,
  sm: 900,
  md: 1200,
  lg: 1536,
  xl: Infinity,
} as const;

type BreakpointKey = keyof typeof BREAKPOINT_VALUES;

// Creates a media query store for useSyncExternalStore
function createMediaQueryStore(breakpoint: BreakpointKey) {
  const threshold = BREAKPOINT_VALUES[breakpoint];
  const query = `(max-width: ${threshold - 0.05}px)`;

  return {
    subscribe: (callback: () => void) => {
      const mediaQuery = window.matchMedia(query);
      mediaQuery.addEventListener('change', callback);
      return () => mediaQuery.removeEventListener('change', callback);
    },
    getSnapshot: () => window.matchMedia(query).matches,
    getServerSnapshot: () => false,
  };
}

// Cache stores to prevent recreation on each render
const mediaQueryStores = new Map<
  BreakpointKey,
  ReturnType<typeof createMediaQueryStore>
>();

function getMediaQueryStore(breakpoint: BreakpointKey) {
  if (!mediaQueryStores.has(breakpoint)) {
    mediaQueryStores.set(breakpoint, createMediaQueryStore(breakpoint));
  }
  return mediaQueryStores.get(breakpoint)!;
}

// Consolidates useTheme + useMediaQuery for mobile detection
// Uses useSyncExternalStore for React-compliant subscription pattern
export function useMobileBreakpoint(
  breakpoint: 'xs' | 'sm' | 'md' | 'lg' | 'xl' = 'md'
): boolean {
  const store = getMediaQueryStore(breakpoint);
  return useSyncExternalStore(
    store.subscribe,
    store.getSnapshot,
    store.getServerSnapshot
  );
}
