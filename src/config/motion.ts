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
  filter: 'blur(0px)',
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
    initial: { opacity: 0, y: 8, filter: 'blur(8px)' },
    animate: { opacity: 1, y: 0, filter: 'blur(0px)' },
    exit: { opacity: 0, y: -8, filter: 'blur(6px)' },
  },
  up: {
    initial: { opacity: 0, y: 32, filter: 'blur(10px)' },
    animate: { opacity: 1, y: 0, filter: 'blur(0px)' },
    exit: { opacity: 0, y: 16, filter: 'blur(6px)' },
  },
  down: {
    initial: { opacity: 0, y: -32, filter: 'blur(10px)' },
    animate: { opacity: 1, y: 0, filter: 'blur(0px)' },
    exit: { opacity: 0, y: -16, filter: 'blur(6px)' },
  },
} as const;

export const scaleVariants = {
  in: {
    initial: { opacity: 0, scale: 0.94, filter: 'blur(6px)' },
    animate: { opacity: 1, scale: 1, filter: 'blur(0px)' },
    exit: { opacity: 0, scale: 0.96, filter: 'blur(4px)' },
  },
  pop: {
    initial: { opacity: 0, scale: 0.85, y: 12, filter: 'blur(8px)' },
    animate: { opacity: 1, scale: 1, y: 0, filter: 'blur(0px)' },
    exit: { opacity: 0, scale: 0.92, y: -8, filter: 'blur(4px)' },
  },
} as const;

export const slideVariants = {
  fromLeft: {
    initial: { x: -48, opacity: 0, filter: 'blur(8px)' },
    animate: { x: 0, opacity: 1, filter: 'blur(0px)' },
    exit: { x: -24, opacity: 0, filter: 'blur(6px)' },
  },
  fromRight: {
    initial: { x: 48, opacity: 0, filter: 'blur(8px)' },
    animate: { x: 0, opacity: 1, filter: 'blur(0px)' },
    exit: { x: 24, opacity: 0, filter: 'blur(6px)' },
  },
  fromBottom: {
    initial: { y: 56, opacity: 0, filter: 'blur(10px)' },
    animate: { y: 0, opacity: 1, filter: 'blur(0px)' },
    exit: { y: 24, opacity: 0, filter: 'blur(6px)' },
  },
} as const;

export const blurVariants = {
  in: {
    initial: { opacity: 0, filter: 'blur(12px) saturate(0.9)' },
    animate: { opacity: 1, filter: 'blur(0px) saturate(1)' },
    exit: { opacity: 0, filter: 'blur(10px) saturate(0.9)' },
  },
  inUp: {
    initial: { opacity: 0, y: 28, filter: 'blur(12px)' },
    animate: { opacity: 1, y: 0, filter: 'blur(0px)' },
    exit: { opacity: 0, y: 14, filter: 'blur(10px)' },
  },
} as const;

// ============================================================================
// GESTURE VARIANTS
// ============================================================================

export const gestureVariants = {
  hoverScale: {
    rest: { scale: 1 },
    hover: { scale: 1.05 },
    tap: { scale: 0.95 },
  },
  cardHover: {
    rest: { scale: 1, y: 0, filter: 'brightness(1)' },
    hover: { scale: 1.03, y: -6, filter: 'brightness(1.05)' },
    focus: { scale: 1.02, y: -4, filter: 'brightness(1.03)' },
    tap: { scale: 0.98 },
  },
  buttonTap: {
    rest: { scale: 1 },
    hover: { scale: 1.04, y: -2 },
    focus: { scale: 1.02, y: -2 },
    tap: { scale: 0.97 },
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
  initial: { opacity: 0, y: 24, scale: 0.98, filter: 'blur(6px)' },
  animate: { opacity: 1, y: 0, scale: 1, filter: 'blur(0px)' },
  exit: { opacity: 0, y: -12, scale: 0.96, filter: 'blur(4px)' },
};

// ============================================================================
// SCROLL-TRIGGERED VARIANTS
// ============================================================================

export const sectionVariants = {
  default: {
    initial: { opacity: 0, y: 48, filter: 'blur(10px)' },
    whileInView: { opacity: 1, y: 0, filter: 'blur(0px)' },
  },
  fade: {
    initial: { opacity: 0, filter: 'blur(8px)' },
    whileInView: { opacity: 1, filter: 'blur(0px)' },
  },
  slideUp: {
    initial: { opacity: 0, y: 64, filter: 'blur(10px)' },
    whileInView: { opacity: 1, y: 0, filter: 'blur(0px)' },
  },
  slideLeft: {
    initial: { opacity: 0, x: -60, filter: 'blur(8px)' },
    whileInView: { opacity: 1, x: 0, filter: 'blur(0px)' },
  },
  slideRight: {
    initial: { opacity: 0, x: 60, filter: 'blur(8px)' },
    whileInView: { opacity: 1, x: 0, filter: 'blur(0px)' },
  },
  scale: {
    initial: { opacity: 0, scale: 0.94, filter: 'blur(8px)' },
    whileInView: { opacity: 1, scale: 1, filter: 'blur(0px)' },
  },
} as const;

// ============================================================================
// MODAL VARIANTS
// ============================================================================

export const modalVariants = {
  backdrop: {
    initial: { opacity: 0, backdropFilter: 'blur(0px)' },
    animate: { opacity: 1, backdropFilter: 'blur(6px)' },
    exit: { opacity: 0, backdropFilter: 'blur(0px)' },
  },
  modal: {
    initial: { opacity: 0, scale: 0.9, y: 16, filter: 'blur(6px)' },
    animate: { opacity: 1, scale: 1, y: 0, filter: 'blur(0px)' },
    exit: { opacity: 0, scale: 0.92, y: 16, filter: 'blur(4px)' },
  },
  slideDown: {
    initial: { opacity: 0, y: -48, scale: 0.98, filter: 'blur(6px)' },
    animate: { opacity: 1, y: 0, scale: 1, filter: 'blur(0px)' },
    exit: { opacity: 0, y: 32, scale: 0.98, filter: 'blur(4px)' },
  },
  slideUp: {
    initial: { opacity: 0, y: 48, scale: 0.98, filter: 'blur(6px)' },
    animate: { opacity: 1, y: 0, scale: 1, filter: 'blur(0px)' },
    exit: { opacity: 0, y: -32, scale: 0.98, filter: 'blur(4px)' },
  },
  zoomOut: {
    initial: { opacity: 0, scale: 0.85, filter: 'blur(6px)' },
    animate: { opacity: 1, scale: 1, filter: 'blur(0px)' },
    exit: { opacity: 0, scale: 0.9, filter: 'blur(4px)' },
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
