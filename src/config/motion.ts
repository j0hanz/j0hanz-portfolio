import type { Variants } from 'motion/react';

// ============================================================================
// ANIMATION CONSTANTS
// ============================================================================

export const BASE_DURATION = 0.6;
export const BASE_DELAY = 0.1;
export const BASE_STAGGER = 0.12;

export const REDUCED_MOTION_TARGET = {
  opacity: 1,
  x: 0,
  y: 0,
  scale: 1,
  rotate: 0,
} as const;

// ============================================================================
// TRANSITION PRESETS - Reusable timing functions
// ============================================================================

export const transitions = {
  spring: {
    type: 'spring' as const,
    stiffness: 260,
    damping: 20,
    mass: 1,
  },
  springBouncy: {
    type: 'spring' as const,
    stiffness: 400,
    damping: 10,
    mass: 0.5,
  },
  springSmooth: {
    type: 'spring' as const,
    stiffness: 100,
    damping: 15,
    mass: 1,
  },
  smooth: {
    type: 'tween' as const,
    ease: [0.25, 0.25, 0.25, 0.75],
    duration: 0.4,
  },
  easeOut: {
    type: 'tween' as const,
    ease: [0.22, 1, 0.36, 1],
    duration: 0.5,
  },
  easeInOut: {
    type: 'tween' as const,
    ease: [0.65, 0, 0.35, 1],
    duration: 0.6,
  },
  slow: {
    type: 'tween' as const,
    ease: [0.25, 0.1, 0.25, 1],
    duration: 0.8,
  },
} as const;

// ============================================================================
// CORE ANIMATION VARIANTS
// ============================================================================

/**
 * Fade variants - Simple opacity animations
 */
export const fadeVariants = {
  in: {
    initial: { opacity: 0 },
    animate: { opacity: 1 },
    exit: { opacity: 0 },
  },
  up: {
    initial: { opacity: 0, y: 24 },
    animate: { opacity: 1, y: 0 },
    exit: { opacity: 0, y: 16 },
  },
  down: {
    initial: { opacity: 0, y: -24 },
    animate: { opacity: 1, y: 0 },
    exit: { opacity: 0, y: -16 },
  },
  left: {
    initial: { opacity: 0, x: -24 },
    animate: { opacity: 1, x: 0 },
    exit: { opacity: 0, x: -16 },
  },
  right: {
    initial: { opacity: 0, x: 24 },
    animate: { opacity: 1, x: 0 },
    exit: { opacity: 0, x: 16 },
  },
} as const;

/**
 * Scale variants - Zoom/scale animations
 */
export const scaleVariants = {
  in: {
    initial: { opacity: 0, scale: 0.95 },
    animate: { opacity: 1, scale: 1 },
    exit: { opacity: 0, scale: 0.95 },
  },
  pop: {
    initial: { opacity: 0, scale: 0.8 },
    animate: { opacity: 1, scale: 1 },
    exit: { opacity: 0, scale: 0.9 },
  },
  grow: {
    initial: { opacity: 0, scale: 0 },
    animate: { opacity: 1, scale: 1 },
    exit: { opacity: 0, scale: 0 },
  },
} as const;

/**
 * Blur variants - Blur + fade animations (use filter for compositor optimization)
 */
export const blurVariants = {
  in: {
    initial: { opacity: 0, filter: 'blur(10px)' },
    animate: { opacity: 1, filter: 'blur(0px)' },
    exit: { opacity: 0, filter: 'blur(10px)' },
  },
  inUp: {
    initial: { opacity: 0, y: 24, filter: 'blur(10px)' },
    animate: { opacity: 1, y: 0, filter: 'blur(0px)' },
    exit: { opacity: 0, y: 16, filter: 'blur(10px)' },
  },
} as const;

/**
 * Slide variants - Directional slide animations with optimized offsets
 */
export const slideVariants = {
  fromLeft: {
    initial: { x: -60, opacity: 0 },
    animate: { x: 0, opacity: 1 },
    exit: { x: -40, opacity: 0 },
  },
  fromRight: {
    initial: { x: 60, opacity: 0 },
    animate: { x: 0, opacity: 1 },
    exit: { x: 40, opacity: 0 },
  },
  fromTop: {
    initial: { y: -60, opacity: 0 },
    animate: { y: 0, opacity: 1 },
    exit: { y: -40, opacity: 0 },
  },
  fromBottom: {
    initial: { y: 60, opacity: 0 },
    animate: { y: 0, opacity: 1 },
    exit: { y: 40, opacity: 0 },
  },
} as const;

// ============================================================================
// GESTURE & INTERACTION VARIANTS
// ============================================================================

/**
 * Hover/tap gesture variants for interactive elements
 */
export const gestureVariants = {
  // Simple hover scale
  hoverScale: {
    rest: { scale: 1 },
    hover: { scale: 1.05 },
    tap: { scale: 0.95 },
  },
  // Card hover with lift effect
  cardHover: {
    rest: { scale: 1, y: 0 },
    hover: { scale: 1.02, y: -6 },
    tap: { scale: 0.98, y: 0 },
  },
  // Button interaction
  buttonTap: {
    rest: { scale: 1 },
    hover: { scale: 1.03 },
    tap: { scale: 0.97 },
  },
  // Icon bounce
  iconBounce: {
    rest: { scale: 1, rotate: 0 },
    hover: { scale: 1.15, rotate: 5 },
    tap: { scale: 0.9, rotate: -5 },
  },
} as const;

// ============================================================================
// STAGGER ANIMATION HELPERS
// ============================================================================

/**
 * Creates stagger container variants with customizable timing
 */
export function createStaggerContainer(
  staggerChildren = 0.08,
  delayChildren = 0
): Variants {
  return {
    initial: { opacity: 0 },
    animate: {
      opacity: 1,
      transition: {
        staggerChildren,
        delayChildren,
      },
    },
    exit: {
      opacity: 0,
      transition: {
        staggerChildren: 0.05,
        staggerDirection: -1,
      },
    },
  };
}

/**
 * Standard stagger item variant
 */
export const staggerItemVariant: Variants = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  exit: { opacity: 0, y: 10 },
};

// ============================================================================
// SCROLL-TRIGGERED VARIANTS
// ============================================================================

/**
 * Section entrance variants optimized for whileInView
 */
export const sectionVariants = {
  default: {
    initial: { opacity: 0, y: 40 },
    whileInView: { opacity: 1, y: 0 },
  },
  fade: {
    initial: { opacity: 0 },
    whileInView: { opacity: 1 },
  },
  slideUp: {
    initial: { opacity: 0, y: 60 },
    whileInView: { opacity: 1, y: 0 },
  },
  slideLeft: {
    initial: { opacity: 0, x: -60 },
    whileInView: { opacity: 1, x: 0 },
  },
  slideRight: {
    initial: { opacity: 0, x: 60 },
    whileInView: { opacity: 1, x: 0 },
  },
  scale: {
    initial: { opacity: 0, scale: 0.9 },
    whileInView: { opacity: 1, scale: 1 },
  },
} as const;

// ============================================================================
// MODAL & OVERLAY VARIANTS
// ============================================================================

export const modalVariants = {
  backdrop: {
    initial: { opacity: 0 },
    animate: { opacity: 1 },
    exit: { opacity: 0 },
  },
  modal: {
    initial: { opacity: 0, scale: 0.95, y: 20 },
    animate: { opacity: 1, scale: 1, y: 0 },
    exit: { opacity: 0, scale: 0.95, y: 20 },
  },
  slideDown: {
    initial: { opacity: 0, y: -40 },
    animate: { opacity: 1, y: 0 },
    exit: { opacity: 0, y: 40 },
  },
  slideUp: {
    initial: { opacity: 0, y: 40 },
    animate: { opacity: 1, y: 0 },
    exit: { opacity: 0, y: 40 },
  },
  zoomOut: {
    initial: { opacity: 0, scale: 0.9 },
    animate: { opacity: 1, scale: 1 },
    exit: { opacity: 0, scale: 0.8 },
  },
} as const;

// ============================================================================
// TOAST NOTIFICATION VARIANTS
// ============================================================================

export const toastVariants: Variants = {
  initial: { opacity: 0, y: -20, scale: 0.95 },
  animate: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: transitions.springSmooth,
  },
  exit: {
    opacity: 0,
    y: -20,
    scale: 0.95,
    transition: transitions.smooth,
  },
};

// ============================================================================
// VIEWPORT CONFIGURATION
// ============================================================================

export const viewportConfig = {
  once: true,
  amount: 0.2,
  margin: '0px 0px -100px 0px',
} as const;

export const viewportConfigEager = {
  once: true,
  amount: 0.1,
  margin: '0px 0px -50px 0px',
} as const;

// ============================================================================
// TYPE EXPORTS
// ============================================================================

export type {
  FadeVariant,
  ScaleVariant,
  SlideVariant,
  GestureVariant,
  SectionVariant,
} from '@/config/types';
