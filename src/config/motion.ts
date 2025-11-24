import type { Variants } from 'motion/react';

// ============================================================================
// ANIMATION CONSTANTS
// ============================================================================

export const BASE_DURATION = 0.7;
export const BASE_DELAY = 0.08;
export const BASE_STAGGER = 0.1;

export const REDUCED_MOTION_TARGET = {
  opacity: 1,
  x: 0,
  y: 0,
  scale: 1,
  rotate: 0,
} as const;

// ============================================================================
// TRANSITION PRESETS
// ============================================================================

export const transitions = {
  spring: {
    type: 'spring' as const,
    stiffness: 260,
    damping: 30,
    mass: 0.9,
  },
  springBouncy: {
    type: 'spring' as const,
    stiffness: 320,
    damping: 18,
    bounce: 0.3,
  },
  springSmooth: {
    type: 'spring' as const,
    stiffness: 210,
    damping: 32,
    mass: 1.05,
  },
  smooth: {
    type: 'tween' as const,
    ease: [0.4, 0, 0.2, 1],
    duration: 0.45,
  },
  easeOut: {
    type: 'tween' as const,
    ease: [0.16, 1, 0.3, 1],
    duration: 0.5,
  },
  easeInOut: {
    type: 'tween' as const,
    ease: [0.45, 0, 0.1, 1],
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

export const fadeVariants = {
  in: {
    initial: { opacity: 0, y: 8 },
    animate: { opacity: 1, y: 0 },
    exit: { opacity: 0, y: -8 },
  },
  up: {
    initial: { opacity: 0, y: 32 },
    animate: { opacity: 1, y: 0 },
    exit: { opacity: 0, y: 16 },
  },
  down: {
    initial: { opacity: 0, y: -32 },
    animate: { opacity: 1, y: 0 },
    exit: { opacity: 0, y: -16 },
  },
} as const;

export const scaleVariants = {
  in: {
    initial: { opacity: 0, scale: 0.94 },
    animate: { opacity: 1, scale: 1 },
    exit: { opacity: 0, scale: 0.96 },
  },
  pop: {
    initial: { opacity: 0, scale: 0.85, y: 12 },
    animate: { opacity: 1, scale: 1, y: 0 },
    exit: { opacity: 0, scale: 0.92, y: -8 },
  },
} as const;

export const slideVariants = {
  fromLeft: {
    initial: { x: -48, opacity: 0 },
    animate: { x: 0, opacity: 1 },
    exit: { x: -24, opacity: 0 },
  },
  fromRight: {
    initial: { x: 48, opacity: 0 },
    animate: { x: 0, opacity: 1 },
    exit: { x: 24, opacity: 0 },
  },
  fromBottom: {
    initial: { y: 56, opacity: 0 },
    animate: { y: 0, opacity: 1 },
    exit: { y: 24, opacity: 0 },
  },
} as const;

export const fadeInVariants = {
  in: {
    initial: { opacity: 0 },
    animate: { opacity: 1 },
    exit: { opacity: 0 },
  },
  inUp: {
    initial: { opacity: 0, y: 28 },
    animate: { opacity: 1, y: 0 },
    exit: { opacity: 0, y: 14 },
  },
} as const;

// ============================================================================
// GESTURE VARIANTS
// ============================================================================

export const gestureVariants = {
  hoverScale: {
    rest: { transform: 'scale(1)' },
    hover: { transform: 'scale(1.05)' },
    tap: { transform: 'scale(0.95)' },
  },
  cardHover: {
    rest: { transform: 'scale(1) translateY(0px)' },
    hover: { transform: 'scale(1.03) translateY(-6px)' },
    focus: { transform: 'scale(1.02) translateY(-4px)' },
    tap: { transform: 'scale(0.98) translateY(0px)' },
  },
  buttonTap: {
    rest: { transform: 'scale(1) translateY(0px)' },
    hover: { transform: 'scale(1.04) translateY(-2px)' },
    focus: { transform: 'scale(1.02) translateY(-2px)' },
    tap: { transform: 'scale(0.97) translateY(0px)' },
  },
} as const;

// ============================================================================
// STAGGER ANIMATIONS
// ============================================================================

type StaggerContainerOptions = {
  exitDirection?: 1 | -1;
  exitStagger?: number;
  initialOpacity?: number;
  animateOpacity?: number;
};

export function createStaggerContainer(
  staggerChildren = BASE_STAGGER,
  delayChildren = 0,
  options: StaggerContainerOptions = {}
): Variants {
  const {
    exitDirection = -1,
    exitStagger = BASE_STAGGER / 2,
    initialOpacity = 0,
    animateOpacity = 1,
  } = options;

  return {
    initial: { opacity: initialOpacity },
    animate: {
      opacity: animateOpacity,
      transition: { staggerChildren, delayChildren },
    },
    exit: {
      opacity: initialOpacity,
      transition: {
        staggerChildren: exitStagger,
        staggerDirection: exitDirection,
      },
    },
  };
}

export const staggerItemVariant: Variants = {
  initial: { opacity: 0, transform: 'translateY(24px) scale(0.98)' },
  animate: { opacity: 1, transform: 'translateY(0px) scale(1)' },
  exit: { opacity: 0, transform: 'translateY(-12px) scale(0.96)' },
};

// ============================================================================
// SCROLL-TRIGGERED VARIANTS
// ============================================================================

export const sectionVariants = {
  default: {
    initial: { opacity: 0, y: 48 },
    whileInView: { opacity: 1, y: 0 },
  },
  fade: {
    initial: { opacity: 0 },
    whileInView: { opacity: 1 },
  },
  slideUp: {
    initial: { opacity: 0, y: 64 },
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
    initial: { opacity: 0, scale: 0.94 },
    whileInView: { opacity: 1, scale: 1 },
  },
} as const;

// ============================================================================
// MODAL VARIANTS
// ============================================================================

export const modalVariants = {
  backdrop: {
    initial: { opacity: 0 },
    animate: { opacity: 1 },
    exit: { opacity: 0 },
  },
  modal: {
    initial: { opacity: 0, scale: 0.9, y: 16 },
    animate: { opacity: 1, scale: 1, y: 0 },
    exit: { opacity: 0, scale: 0.92, y: 16 },
  },
  slideDown: {
    initial: { opacity: 0, y: -48, scale: 0.98 },
    animate: { opacity: 1, y: 0, scale: 1 },
    exit: { opacity: 0, y: 32, scale: 0.98 },
  },
  slideUp: {
    initial: { opacity: 0, y: 48, scale: 0.98 },
    animate: { opacity: 1, y: 0, scale: 1 },
    exit: { opacity: 0, y: -32, scale: 0.98 },
  },
  zoomOut: {
    initial: { opacity: 0, scale: 0.85 },
    animate: { opacity: 1, scale: 1 },
    exit: { opacity: 0, scale: 0.9 },
  },
} as const;

// ============================================================================
// SUCCESS INDICATOR VARIANTS
// ============================================================================

export const successIndicatorVariants = {
  container: {
    initial: { opacity: 0, y: 12 },
    animate: { opacity: 1, y: 0 },
    exit: { opacity: 0, y: -8 },
  },
  checkmarkCircle: {
    initial: { strokeDasharray: 56.5, strokeDashoffset: 56.5 },
    animate: { strokeDashoffset: 0 },
  },
  checkmarkPath: {
    initial: { pathLength: 0 },
    animate: { pathLength: 1 },
  },
} as const;

// ============================================================================
// TEXT REVEAL VARIANTS
// ============================================================================

export const textRevealVariants = {
  container: {
    hidden: { opacity: 0 },
    visible: (delay = 0) => ({
      opacity: 1,
      transition: { staggerChildren: 0.025, delayChildren: delay },
    }),
  },
  child: {
    visible: (duration = 0.5) => ({
      opacity: 1,
      y: 0,
      transition: {
        type: 'spring' as const,
        damping: 12,
        stiffness: 120,
        duration,
      },
    }),
    hidden: (duration = 0.5) => ({
      opacity: 0,
      y: 16,
      transition: {
        type: 'spring' as const,
        damping: 12,
        stiffness: 120,
        duration,
      },
    }),
  },
};

// ============================================================================
// COMPONENT SPECIFIC VARIANTS
// ============================================================================

export const staggerContainerVariants = {
  initial: { opacity: 0 },
  animate: (stagger = 0.07) => ({
    opacity: 1,
    transition: {
      staggerChildren: stagger,
      delayChildren: 0.08,
    },
  }),
};

export const staggerItemSimpleVariants = {
  initial: { opacity: 0, transform: 'translateY(16px)' },
  animate: { opacity: 1, transform: 'translateY(0px)' },
};

export const fadeInViewVariants = {
  initial: { opacity: 0, transform: 'translateY(20px)' },
  animate: { opacity: 1, transform: 'translateY(0px)' },
  exit: { opacity: 0, transform: 'translateY(20px)' },
};

export const pageTransitionVariants = {
  enter: (direction: 'up' | 'down' | null) => ({
    transform: direction === 'down' ? 'translateY(100%)' : 'translateY(-100%)',
    opacity: 0,
  }),
  center: {
    transform: 'translateY(0%)',
    opacity: 1,
  },
  exit: (direction: 'up' | 'down' | null) => ({
    transform: direction === 'down' ? 'translateY(-100%)' : 'translateY(100%)',
    opacity: 0,
  }),
};

// ============================================================================
// VIEWPORT CONFIGURATION
// ============================================================================

export const viewportConfig = {
  once: true,
  amount: 0.25,
  margin: '0px 0px -20% 0px',
} as const;

export const viewportConfigEager = {
  once: true,
  amount: 0.15,
  margin: '0px 0px -10% 0px',
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
