import type { Variants } from 'motion/react';

import type { StaggerContainerOptions } from '@/config/types';

// ============================================================================
// ANIMATION CONSTANTS
// ============================================================================

export const BASE_DURATION = 0.7;
export const BASE_DELAY = 0.08;
export const BASE_STAGGER = 0.1;

// Spring presets for reuse across components
export const SPRING_STIFF = { stiffness: 1000, damping: 35 } as const;
export const SPRING_SMOOTH = { stiffness: 300, damping: 24 } as const;
export const SPRING_BOUNCY = {
  stiffness: 400,
  damping: 15,
  mass: 0.8,
} as const;
export const SPRING_GENTLE = {
  stiffness: 180,
  damping: 28,
  mass: 1.2,
} as const;
export const SPRING_SNAPPY = {
  stiffness: 500,
  damping: 30,
  mass: 0.5,
} as const;

// Stagger timing presets
export const STAGGER_FAST = 0.05;
export const STAGGER_NORMAL = 0.07;
export const STAGGER_SLOW = 0.08;
export const STAGGER_DRAMATIC = 0.12;

// Shared hover transform for cards
export const CARD_HOVER_LIFT = { y: -5 } as const;

// Viewport preset configurations for useInView
export const viewportPresets = {
  section: { once: true, amount: 0.1 },
  card: { once: true, amount: 0.25 },
  cardLarge: { once: true, amount: 0.3 },
  list: { once: true, amount: 0.2 },
  listCompact: { once: true, amount: 0.15 },
  // Full-page scroll presets: once: false ensures animations replay on remount
  fullPageSection: { once: false, amount: 0.1 },
  fullPageCard: { once: false, amount: 0.2 },
  fullPageList: { once: false, amount: 0.15 },
} as const;

// Common easing curves
export const EASE_OUT_EXPO = [0.16, 1, 0.3, 1] as const;
export const EASE_OUT_QUINT = [0.22, 1, 0.36, 1] as const;
export const EASE_IN_OUT_CUBIC = [0.65, 0, 0.35, 1] as const;
export const EASE_OUT_BACK = [0.34, 1.56, 0.64, 1] as const;
export const EASE_ELASTIC = [0.68, -0.55, 0.27, 1.55] as const;

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
    stiffness: 380,
    damping: 18,
    bounce: 0.35,
    mass: 0.8,
  },
  springSmooth: {
    type: 'spring' as const,
    stiffness: 210,
    damping: 32,
    mass: 1.05,
  },
  springVisual: {
    type: 'spring' as const,
    visualDuration: 0.4,
    bounce: 0.18,
  },
  springSnappy: {
    type: 'spring' as const,
    stiffness: 450,
    damping: 28,
    mass: 0.6,
  },
  springGentle: {
    type: 'spring' as const,
    stiffness: 160,
    damping: 26,
    mass: 1.1,
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
  dramatic: {
    type: 'tween' as const,
    ease: [0.22, 1, 0.36, 1],
    duration: 1,
  },
  anticipate: {
    type: 'tween' as const,
    ease: [0.68, -0.55, 0.27, 1.55],
    duration: 0.6,
  },
} as const;

// ============================================================================
// CORE ANIMATION VARIANTS
// ============================================================================

// Common animation values
const FADE_Y_SMALL = 10;
const FADE_Y_MEDIUM = 36;
const FADE_Y_LARGE = 48;
const FADE_Y_EXIT = 18;

// Helper to create fade variants
// Uses hardware-accelerated properties: opacity, y (transform), scale
// Supports initial scale and exit scale for more sophisticated animations
function createFadeVariant(
  yInitial: number,
  yExit: number,
  scaleInitial = 1,
  scaleExit = 1
) {
  return {
    initial: { opacity: 0, y: yInitial, scale: scaleInitial },
    animate: { opacity: 1, y: 0, scale: 1 },
    exit: { opacity: 0, y: yExit, scale: scaleExit },
  };
}

export const fadeVariants = {
  in: createFadeVariant(FADE_Y_SMALL, -FADE_Y_SMALL),
  up: createFadeVariant(FADE_Y_MEDIUM, FADE_Y_EXIT, 0.98, 0.99),
  down: createFadeVariant(-FADE_Y_MEDIUM, -FADE_Y_EXIT, 0.98, 0.99),
  large: createFadeVariant(FADE_Y_LARGE, FADE_Y_EXIT, 0.95, 0.97),
  subtle: {
    initial: { opacity: 0, y: 6 },
    animate: { opacity: 1, y: 0 },
    exit: { opacity: 0, y: -4 },
  },
  blur: {
    initial: { opacity: 0, filter: 'blur(8px)' },
    animate: { opacity: 1, filter: 'blur(0px)' },
    exit: { opacity: 0, filter: 'blur(4px)' },
  },
} as const;

// Helper to create scale variants
// Combines scale, opacity, y offset, and optional rotation for complex entrance animations
// All properties are hardware-accelerated (transform + opacity)
function createScaleVariant(
  scaleInitial: number,
  yInitial: number,
  scaleExit: number,
  yExit: number,
  rotateInitial = 0,
  rotateExit = 0
) {
  return {
    initial: {
      opacity: 0,
      scale: scaleInitial,
      y: yInitial,
      rotate: rotateInitial,
    },
    animate: { opacity: 1, scale: 1, y: 0, rotate: 0 },
    exit: { opacity: 0, scale: scaleExit, y: yExit, rotate: rotateExit },
  };
}

export const scaleVariants = {
  in: createScaleVariant(0.94, 0, 0.96, 0),
  pop: createScaleVariant(0.82, 14, 0.9, -10),
  bounce: createScaleVariant(0.75, 20, 0.88, -12),
  rotate: createScaleVariant(0.9, 8, 0.94, -6, -3, 2),
  grow: {
    initial: { opacity: 0, scale: 0.6, y: 24 },
    animate: { opacity: 1, scale: 1, y: 0 },
    exit: { opacity: 0, scale: 0.85, y: -16 },
  },
  shrink: {
    initial: { opacity: 0, scale: 1.15, y: -10 },
    animate: { opacity: 1, scale: 1, y: 0 },
    exit: { opacity: 0, scale: 1.05, y: 8 },
  },
} as const;

// Helper to create slide variants
// Supports both x and y axis translation with scale and opacity for slide-in/out effects
// Hardware-accelerated via transform (x/y) and opacity properties
function createSlideVariant(
  axis: 'x' | 'y',
  valueInitial: number,
  valueExit: number,
  scaleInitial = 1,
  scaleExit = 1
) {
  return {
    initial: { [axis]: valueInitial, opacity: 0, scale: scaleInitial },
    animate: { [axis]: 0, opacity: 1, scale: 1 },
    exit: { [axis]: valueExit, opacity: 0, scale: scaleExit },
  };
}

export const slideVariants = {
  fromLeft: createSlideVariant('x', -52, -28, 0.98, 0.99),
  fromRight: createSlideVariant('x', 52, 28, 0.98, 0.99),
  fromBottom: createSlideVariant('y', 60, 28, 0.96, 0.98),
  fromTop: createSlideVariant('y', -60, -28, 0.96, 0.98),
  diagonal: {
    initial: { x: -30, y: 30, opacity: 0, scale: 0.96 },
    animate: { x: 0, y: 0, opacity: 1, scale: 1 },
    exit: { x: 20, y: -20, opacity: 0, scale: 0.98 },
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
  inScale: {
    initial: { opacity: 0, scale: 0.92 },
    animate: { opacity: 1, scale: 1 },
    exit: { opacity: 0, scale: 0.96 },
  },
  inBlur: {
    initial: { opacity: 0, filter: 'blur(10px)', y: 12 },
    animate: { opacity: 1, filter: 'blur(0px)', y: 0 },
    exit: { opacity: 0, filter: 'blur(6px)', y: -8 },
  },
} as const;

// ============================================================================
// GESTURE VARIANTS
// ============================================================================

// Helper to create gesture variants
function createGestureVariant(
  hoverScale: number,
  hoverY: number,
  tapScale: number,
  hoverRotate = 0
) {
  return {
    rest: { scale: 1, y: 0, rotate: 0 },
    hover: { scale: hoverScale, y: hoverY, rotate: hoverRotate },
    focus: {
      scale: hoverScale - 0.01,
      y: Math.max(hoverY, -2),
      rotate: hoverRotate * 0.5,
    },
    tap: { scale: tapScale, y: 0, rotate: 0 },
  };
}

// Filter presets for lift gestures - use drop-shadow for compositor acceleration
// Per Motion docs: filter drop-shadow is hardware-accelerated vs boxShadow paint operations
export const FILTER_LIFT_REST =
  'drop-shadow(0 4px 12px var(--shadow-color, rgba(0,0,0,0.08)))';
export const FILTER_LIFT_HOVER =
  'drop-shadow(0 20px 40px var(--shadow-color, rgba(0,0,0,0.15)))';
export const FILTER_LIFT_TAP =
  'drop-shadow(0 8px 20px var(--shadow-color, rgba(0,0,0,0.12)))';

// Legacy boxShadow presets (kept for static styles, not animations)
export const SHADOW_LIFT_REST =
  '0 4px 12px var(--shadow-color, rgba(0,0,0,0.08))';
export const SHADOW_LIFT_HOVER =
  '0 20px 40px var(--shadow-color, rgba(0,0,0,0.15))';
export const SHADOW_LIFT_TAP =
  '0 8px 20px var(--shadow-color, rgba(0,0,0,0.12))';

export const gestureVariants = {
  hoverScale: {
    rest: { scale: 1 },
    hover: { scale: 1.06, rotate: 0.5 },
    tap: { scale: 0.94 },
  },
  cardHover: createGestureVariant(1.035, -8, 0.975, 0.3),
  buttonTap: createGestureVariant(1.05, -3, 0.96),
  iconHover: {
    rest: { scale: 1, rotate: 0 },
    hover: { scale: 1.15, rotate: 5 },
    tap: { scale: 0.9, rotate: -5 },
  },
  lift: {
    rest: { y: 0, filter: FILTER_LIFT_REST },
    hover: { y: -10, filter: FILTER_LIFT_HOVER },
    tap: { y: -4, filter: FILTER_LIFT_TAP },
  },
  tilt: {
    rest: { rotateX: 0, rotateY: 0, scale: 1 },
    hover: { rotateX: -5, rotateY: 5, scale: 1.02 },
    tap: { rotateX: 0, rotateY: 0, scale: 0.98 },
  },
  glow: {
    rest: { opacity: 1, filter: 'brightness(1)' },
    hover: { opacity: 1, filter: 'brightness(1.1)' },
    tap: { opacity: 0.9, filter: 'brightness(0.95)' },
  },
} as const;

// ============================================================================
// STAGGER ANIMATIONS
// ============================================================================

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
      transition: {
        staggerChildren,
        delayChildren,
        when: 'beforeChildren',
      },
    },
    exit: {
      opacity: initialOpacity,
      transition: {
        staggerChildren: exitStagger,
        staggerDirection: exitDirection,
        when: 'afterChildren',
      },
    },
  };
}

export const staggerItemVariant: Variants = {
  initial: { opacity: 0, y: 28, scale: 0.96, filter: 'blur(4px)' },
  animate: {
    opacity: 1,
    y: 0,
    scale: 1,
    filter: 'blur(0px)',
    transition: { type: 'spring' as const, stiffness: 280, damping: 24 },
  },
  exit: { opacity: 0, y: -14, scale: 0.94, filter: 'blur(2px)' },
};

// Enhanced stagger with rotation
export const staggerItemRotateVariant: Variants = {
  initial: { opacity: 0, y: 32, scale: 0.94, rotate: -3 },
  animate: {
    opacity: 1,
    y: 0,
    scale: 1,
    rotate: 0,
    transition: { type: 'spring' as const, stiffness: 300, damping: 22 },
  },
  exit: { opacity: 0, y: -16, scale: 0.96, rotate: 2 },
};

// Cascade stagger for lists
export const cascadeStaggerVariant: Variants = {
  initial: { opacity: 0, x: -24, y: 12 },
  animate: {
    opacity: 1,
    x: 0,
    y: 0,
    transition: { type: 'spring' as const, stiffness: 320, damping: 26 },
  },
  exit: { opacity: 0, x: 16, y: -8 },
};

// ============================================================================
// NAVIGATION DRAWER VARIANTS
// ============================================================================

export const navVariants = {
  container: {
    open: {
      transition: { delayChildren: 0.2, staggerChildren: STAGGER_NORMAL },
    },
    closed: {
      transition: { staggerChildren: STAGGER_FAST, staggerDirection: -1 },
    },
  },
  item: {
    open: {
      y: 0,
      opacity: 1,
      scale: 1,
      transition: { type: 'spring', ...SPRING_SNAPPY },
    },
    closed: {
      y: 50,
      opacity: 0,
      scale: 0.95,
      transition: { type: 'spring', ...SPRING_STIFF },
    },
  },
  social: {
    container: {
      open: {
        transition: { delayChildren: 0.4, staggerChildren: STAGGER_SLOW },
      },
      closed: {
        transition: { staggerChildren: STAGGER_FAST, staggerDirection: -1 },
      },
    },
    item: {
      open: {
        scale: 1,
        y: 0,
        opacity: 1,
        rotate: 0,
        transition: { type: 'spring', ...SPRING_SMOOTH },
      },
      closed: {
        scale: 0.7,
        y: 24,
        opacity: 0,
        rotate: -10,
        transition: { duration: 0.2 },
      },
    },
  },
  logo: {
    open: {
      x: 0,
      opacity: 1,
      scale: 1,
      transition: { type: 'spring', ...SPRING_SMOOTH },
    },
    closed: { x: -24, opacity: 0, scale: 0.9, transition: { duration: 0.2 } },
  },
  button: {
    open: { rotate: 90, scale: 1.12 },
    closed: { rotate: 0, scale: 1 },
  },
  overlay: {
    open: { opacity: 1, backdropFilter: 'blur(8px)' },
    closed: { opacity: 0, backdropFilter: 'blur(0px)' },
  },
} as const;

// ============================================================================
// CARD & LIST ITEM VARIANTS
// ============================================================================

// Generic card entrance animation (used in About, Portfolio, etc.)
export const cardEntranceVariants = {
  hidden: { opacity: 0, y: 44, scale: 0.96, filter: 'blur(4px)' },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    scale: 1,
    filter: 'blur(0px)',
    transition: {
      delay: i * 0.18,
      duration: 0.65,
      ease: EASE_OUT_EXPO,
    },
  }),
};

// Card with 3D perspective effect
export const cardPerspectiveVariants = {
  hidden: { opacity: 0, y: 50, rotateX: 15, scale: 0.9 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    rotateX: 0,
    scale: 1,
    transition: {
      delay: i * 0.15,
      duration: 0.7,
      ease: EASE_OUT_QUINT,
    },
  }),
};

// Generic card motion for project cards (used with useInViewMotion)
export const CARD_MOTION_VARIANTS = {
  hidden: { opacity: 0, transform: 'translateY(20px) scale(0.98)' },
  visible: { opacity: 1, transform: 'translateY(0px) scale(1)' },
} as const;

// Generic list item stagger animation
export const listItemStaggerVariants = {
  hidden: { opacity: 0, y: 22, x: -8 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    x: 0,
    transition: {
      delay: i * 0.1,
      duration: 0.5,
      ease: EASE_OUT_EXPO,
    },
  }),
};

// List item with slide effect
export const listItemSlideVariants = {
  hidden: { opacity: 0, x: -30, scale: 0.98 },
  visible: (i: number) => ({
    opacity: 1,
    x: 0,
    scale: 1,
    transition: {
      delay: i * 0.08,
      type: 'spring' as const,
      stiffness: 320,
      damping: 26,
    },
  }),
};

// Button pop-in animation (delayed entrance with spring)
export const buttonPopVariants = {
  hidden: { opacity: 0, scale: 0.75, y: 10 },
  visible: {
    opacity: 1,
    scale: 1,
    y: 0,
    transition: {
      delay: 0.4,
      type: 'spring' as const,
      stiffness: 380,
      damping: 20,
      mass: 0.8,
    },
  },
};

// Button with bounce effect
export const buttonBounceVariants = {
  hidden: { opacity: 0, scale: 0.6, y: 16 },
  visible: {
    opacity: 1,
    scale: 1,
    y: 0,
    transition: {
      delay: 0.35,
      type: 'spring' as const,
      stiffness: 450,
      damping: 15,
      mass: 0.6,
    },
  },
};

// ============================================================================
// FORM FIELD VARIANTS
// ============================================================================

export const formFieldVariants = {
  field: {
    hidden: { opacity: 0, y: 24, x: -8, filter: 'blur(3px)' },
    visible: (i: number) => ({
      opacity: 1,
      y: 0,
      x: 0,
      filter: 'blur(0px)',
      transition: {
        delay: i * 0.08,
        duration: 0.55,
        ease: EASE_OUT_EXPO,
      },
    }),
  },
  action: {
    hidden: { opacity: 0, y: 32, scale: 0.95 },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: {
        delay: 0.4,
        duration: 0.6,
        ease: EASE_OUT_EXPO,
      },
    },
  },
  error: {
    hidden: { opacity: 0, y: -8, scale: 0.95 },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: { type: 'spring' as const, stiffness: 400, damping: 25 },
    },
  },
  success: {
    hidden: { opacity: 0, scale: 0.8, rotate: -8 },
    visible: {
      opacity: 1,
      scale: 1,
      rotate: 0,
      transition: { type: 'spring' as const, stiffness: 350, damping: 20 },
    },
  },
} as const;

// ============================================================================
// CURSOR ANIMATION
// ============================================================================

export const cursorBlinkAnimation = {
  opacity: [0, 1, 0],
} as const;

export const cursorBlinkTransition = {
  duration: 0.9,
  repeat: Infinity,
  ease: 'easeInOut',
} as const;

// Typing cursor with smoother blink
export const cursorPulseAnimation = {
  opacity: [0.3, 1, 0.3],
  scale: [0.98, 1, 0.98],
} as const;

export const cursorPulseTransition = {
  duration: 1.2,
  repeat: Infinity,
  ease: [0.4, 0, 0.2, 1],
} as const;

// ============================================================================
// SCROLL-TRIGGERED VARIANTS
// ============================================================================

export const sectionVariants = {
  default: {
    initial: { opacity: 0, y: 52 },
    whileInView: { opacity: 1, y: 0 },
  },
  fade: {
    initial: { opacity: 0 },
    whileInView: { opacity: 1 },
  },
  slideUp: {
    initial: { opacity: 0, y: 72, scale: 0.98 },
    whileInView: { opacity: 1, y: 0, scale: 1 },
  },
  slideLeft: {
    initial: { opacity: 0, x: -64, rotate: -2 },
    whileInView: { opacity: 1, x: 0, rotate: 0 },
  },
  slideRight: {
    initial: { opacity: 0, x: 64, rotate: 2 },
    whileInView: { opacity: 1, x: 0, rotate: 0 },
  },
  scale: {
    initial: { opacity: 0, scale: 0.88, filter: 'blur(6px)' },
    whileInView: { opacity: 1, scale: 1, filter: 'blur(0px)' },
  },
  reveal: {
    initial: { opacity: 0, y: 40, clipPath: 'inset(100% 0 0 0)' },
    whileInView: { opacity: 1, y: 0, clipPath: 'inset(0% 0 0 0)' },
  },
  expand: {
    initial: { opacity: 0, scaleX: 0.8, scaleY: 0.95 },
    whileInView: { opacity: 1, scaleX: 1, scaleY: 1 },
  },
} as const;

// ============================================================================
// MODAL VARIANTS
// ============================================================================

// Helper to create modal slide variants
// Specialized slide variant for modals with blur filter for layered effect
// Combines y translation, scale, opacity, and blur for smooth modal appearance
function createModalSlideVariant(
  yInitial: number,
  yExit: number,
  scaleInitial = 0.96,
  scaleExit = 0.97
) {
  return {
    initial: {
      opacity: 0,
      y: yInitial,
      scale: scaleInitial,
      filter: 'blur(4px)',
    },
    animate: { opacity: 1, y: 0, scale: 1, filter: 'blur(0px)' },
    exit: { opacity: 0, y: yExit, scale: scaleExit, filter: 'blur(2px)' },
  };
}

export const modalVariants = {
  backdrop: {
    initial: { opacity: 0, backdropFilter: 'blur(0px)' },
    animate: { opacity: 1, backdropFilter: 'blur(8px)' },
    exit: { opacity: 0, backdropFilter: 'blur(0px)' },
  },
  modal: {
    initial: { opacity: 0, scale: 0.88, y: 20, filter: 'blur(6px)' },
    animate: { opacity: 1, scale: 1, y: 0, filter: 'blur(0px)' },
    exit: { opacity: 0, scale: 0.92, y: 16, filter: 'blur(3px)' },
  },
  slideDown: createModalSlideVariant(-56, 36),
  slideUp: createModalSlideVariant(56, -36),
  zoomOut: {
    initial: { opacity: 0, scale: 0.8, rotate: -2 },
    animate: { opacity: 1, scale: 1, rotate: 0 },
    exit: { opacity: 0, scale: 0.88, rotate: 1 },
  },
  drawer: {
    initial: { x: '100%', opacity: 0 },
    animate: { x: 0, opacity: 1 },
    exit: { x: '100%', opacity: 0 },
  },
  drawerLeft: {
    initial: { x: '-100%', opacity: 0 },
    animate: { x: 0, opacity: 1 },
    exit: { x: '-100%', opacity: 0 },
  },
  flip: {
    initial: { opacity: 0, rotateY: -90, scale: 0.9 },
    animate: { opacity: 1, rotateY: 0, scale: 1 },
    exit: { opacity: 0, rotateY: 90, scale: 0.9 },
  },
} as const;

// ============================================================================
// SUCCESS INDICATOR VARIANTS
// ============================================================================

export const successIndicatorVariants = {
  container: {
    initial: { opacity: 0, y: 14, scale: 0.9 },
    animate: { opacity: 1, y: 0, scale: 1 },
    exit: { opacity: 0, y: -10, scale: 0.95 },
  },
  checkmarkCircle: {
    initial: { strokeDasharray: 56.5, strokeDashoffset: 56.5, rotate: -90 },
    animate: { strokeDashoffset: 0, rotate: 0 },
  },
  checkmarkPath: {
    initial: { pathLength: 0, opacity: 0 },
    animate: { pathLength: 1, opacity: 1 },
  },
  pulse: {
    initial: { scale: 0.9, opacity: 0 },
    animate: {
      scale: [0.9, 1.1, 1],
      opacity: [0, 1, 1],
    },
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
      transition: { staggerChildren: 0.028, delayChildren: delay },
    }),
  },
  child: {
    visible: (duration = 0.5) => ({
      opacity: 1,
      y: 0,
      rotateX: 0,
      filter: 'blur(0px)',
      transition: {
        type: 'spring' as const,
        damping: 14,
        stiffness: 140,
        duration,
      },
    }),
    hidden: (duration = 0.5) => ({
      opacity: 0,
      y: 18,
      rotateX: -15,
      filter: 'blur(4px)',
      transition: {
        type: 'spring' as const,
        damping: 14,
        stiffness: 140,
        duration,
      },
    }),
  },
  word: {
    hidden: { opacity: 0, y: 24, rotateZ: -3 },
    visible: {
      opacity: 1,
      y: 0,
      rotateZ: 0,
      transition: { type: 'spring' as const, stiffness: 180, damping: 18 },
    },
  },
  line: {
    hidden: { opacity: 0, x: -30 },
    visible: {
      opacity: 1,
      x: 0,
      transition: { type: 'spring' as const, stiffness: 200, damping: 22 },
    },
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
      when: 'beforeChildren',
    },
  }),
};

export const staggerItemSimpleVariants = {
  initial: { opacity: 0, y: 18, filter: 'blur(3px)' },
  animate: {
    opacity: 1,
    y: 0,
    filter: 'blur(0px)',
    transition: { type: 'spring' as const, stiffness: 280, damping: 24 },
  },
};

export const fadeInViewVariants = {
  initial: { opacity: 0, y: 24, scale: 0.98 },
  animate: { opacity: 1, y: 0, scale: 1 },
  exit: { opacity: 0, y: 20, scale: 0.99 },
};

export const pageTransitionVariants = {
  enter: (direction: 'up' | 'down' | null) => ({
    transform: direction === 'down' ? 'translateY(100%)' : 'translateY(-100%)',
    opacity: 0,
    scale: 0.98,
  }),
  center: {
    transform: 'translateY(0%)',
    opacity: 1,
    scale: 1,
  },
  exit: (direction: 'up' | 'down' | null) => ({
    transform: direction === 'down' ? 'translateY(-100%)' : 'translateY(100%)',
    opacity: 0,
    scale: 0.98,
  }),
};

// Direction-aware variants using usePresenceData
export const presenceAwareVariants = {
  enter: (direction: 'up' | 'down' | null) => ({
    y: direction === 'down' ? 60 : -60,
    opacity: 0,
    scale: 0.96,
    filter: 'blur(4px)',
  }),
  center: {
    y: 0,
    opacity: 1,
    scale: 1,
    filter: 'blur(0px)',
  },
  exit: (direction: 'up' | 'down' | null) => ({
    y: direction === 'down' ? -60 : 60,
    opacity: 0,
    scale: 0.96,
    filter: 'blur(4px)',
  }),
};

// ============================================================================
// TIMELINE VARIANTS (Education & Work Experience)
// ============================================================================

// Shared card entrance animation for timeline items
export const timelineCardVariants = {
  hidden: { opacity: 0, y: 68, scale: 0.93, filter: 'blur(5px)' },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    scale: 1,
    filter: 'blur(0px)',
    transition: {
      delay: i * 0.14,
      duration: 0.75,
      ease: EASE_OUT_QUINT,
    },
  }),
};

// Shared description item stagger animation
export const timelineDescriptionVariants = {
  hidden: { opacity: 0, x: -24, y: 4 },
  visible: (i: number) => ({
    opacity: 1,
    x: 0,
    y: 0,
    transition: {
      delay: 0.3 + i * 0.07,
      duration: 0.5,
      ease: EASE_IN_OUT_CUBIC,
    },
  }),
};

// Timeline connector animation
export const timelineConnectorVariants = {
  hidden: { scaleY: 0, opacity: 0 },
  visible: (i: number) => ({
    scaleY: 1,
    opacity: 1,
    transition: {
      delay: i * 0.12 + 0.2,
      duration: 0.6,
      ease: EASE_OUT_EXPO,
    },
  }),
};

// Timeline dot animation
export const timelineDotVariants = {
  hidden: { scale: 0, opacity: 0 },
  visible: (i: number) => ({
    scale: 1,
    opacity: 1,
    transition: {
      delay: i * 0.12,
      type: 'spring' as const,
      stiffness: 400,
      damping: 20,
    },
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

export const viewportConfigLazy = {
  once: true,
  amount: 0.35,
  margin: '0px 0px -30% 0px',
} as const;

// Full-page scroll sections: use once: false since sections remount on navigation
// and may already be in viewport when mounted
export const viewportConfigFullPage = {
  once: false,
  amount: 0.1,
  margin: '0px',
} as const;

// ============================================================================
// SVG PATH ANIMATION VARIANTS
// ============================================================================

export const svgPathVariants = {
  draw: {
    initial: { pathLength: 0, opacity: 0 },
    animate: { pathLength: 1, opacity: 1 },
    exit: { pathLength: 0, opacity: 0 },
  },
  drawReverse: {
    initial: { pathLength: 1, opacity: 1 },
    animate: { pathLength: 0, opacity: 0 },
  },
  strokeDash: {
    initial: { strokeDashoffset: 100 },
    animate: { strokeDashoffset: 0 },
  },
  morphPath: {
    initial: { pathLength: 0, opacity: 0, strokeWidth: 0 },
    animate: { pathLength: 1, opacity: 1, strokeWidth: 2 },
  },
  fillPath: {
    initial: { pathLength: 0, fillOpacity: 0 },
    animate: { pathLength: 1, fillOpacity: 1 },
  },
} as const;

// ============================================================================
// SCROLL-LINKED ANIMATION PRESETS
// ============================================================================

export const scrollLinkedPresets = {
  parallax: (range: [number, number] = [-50, 50]) => ({
    inputRange: [0, 1],
    outputRange: range,
  }),
  parallaxDeep: (range: [number, number] = [-100, 100]) => ({
    inputRange: [0, 1],
    outputRange: range,
  }),
  fadeOnScroll: {
    inputRange: [0, 0.25, 0.75, 1],
    outputRange: [0, 1, 1, 0],
  },
  scaleOnScroll: {
    inputRange: [0, 0.5, 1],
    outputRange: [0.85, 1, 0.85],
  },
  rotateOnScroll: {
    inputRange: [0, 1],
    outputRange: [-10, 10],
  },
  skewOnScroll: {
    inputRange: [0, 0.5, 1],
    outputRange: [-3, 0, 3],
  },
  blurOnScroll: {
    inputRange: [0, 0.3, 0.7, 1],
    outputRange: ['blur(8px)', 'blur(0px)', 'blur(0px)', 'blur(8px)'],
  },
} as const;

// ============================================================================
// SKELETON & LOADING VARIANTS
// ============================================================================

export const skeletonVariants = {
  pulse: {
    initial: { opacity: 0.5 },
    animate: {
      opacity: [0.5, 0.8, 0.5],
      transition: { duration: 1.5, repeat: Infinity, ease: 'easeInOut' },
    },
  },
  shimmer: {
    initial: { x: '-100%' },
    animate: {
      x: '100%',
      transition: { duration: 1.2, repeat: Infinity, ease: 'linear' },
    },
  },
  wave: {
    initial: { scaleY: 0.8 },
    animate: {
      scaleY: [0.8, 1, 0.8],
      transition: { duration: 0.8, repeat: Infinity, ease: 'easeInOut' },
    },
  },
} as const;

// ============================================================================
// BADGE & CHIP VARIANTS
// ============================================================================

export const badgeVariants = {
  pop: {
    initial: { scale: 0, opacity: 0 },
    animate: {
      scale: 1,
      opacity: 1,
      transition: { type: 'spring', stiffness: 500, damping: 25 },
    },
  },
  bounce: {
    initial: { scale: 0, y: -10 },
    animate: {
      scale: [0, 1.2, 1],
      y: [10, -4, 0],
      transition: { duration: 0.5, ease: EASE_OUT_BACK },
    },
  },
  pulse: {
    initial: { scale: 1 },
    animate: {
      scale: [1, 1.08, 1],
      transition: { duration: 2, repeat: Infinity, ease: 'easeInOut' },
    },
  },
  glow: {
    initial: { opacity: 0.8, filter: 'brightness(1)' },
    animate: {
      opacity: [0.8, 1, 0.8],
      filter: ['brightness(1)', 'brightness(1.2)', 'brightness(1)'],
      transition: { duration: 2, repeat: Infinity, ease: 'easeInOut' },
    },
  },
} as const;

// ============================================================================
// TOOLTIP & POPOVER VARIANTS
// ============================================================================

export const tooltipVariants = {
  fadeUp: {
    initial: { opacity: 0, y: 8, scale: 0.96 },
    animate: { opacity: 1, y: 0, scale: 1 },
    exit: { opacity: 0, y: 4, scale: 0.98 },
  },
  fadeDown: {
    initial: { opacity: 0, y: -8, scale: 0.96 },
    animate: { opacity: 1, y: 0, scale: 1 },
    exit: { opacity: 0, y: -4, scale: 0.98 },
  },
  spring: {
    initial: { opacity: 0, scale: 0.9, y: 6 },
    animate: {
      opacity: 1,
      scale: 1,
      y: 0,
      transition: { type: 'spring' as const, stiffness: 400, damping: 24 },
    },
    exit: { opacity: 0, scale: 0.95, y: 4 },
  },
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

// ============================================================================
// HOVER EFFECT PRESETS
// ============================================================================

// Hover shadow constants
export const SHADOW_HOVER_LIFT =
  '0 16px 40px var(--shadow-color, rgba(0,0,0,0.12))';
export const SHADOW_HOVER_GLOW =
  '0 0 20px var(--glow-color, rgba(255,255,255,0.2))';

export const hoverEffects = {
  lift: {
    y: -6,
    scale: 1.02,
    boxShadow: SHADOW_HOVER_LIFT,
  },
  grow: {
    scale: 1.05,
  },
  shrink: {
    scale: 0.95,
  },
  glow: {
    filter: 'brightness(1.1)',
    boxShadow: SHADOW_HOVER_GLOW,
  },
  tilt: {
    rotateY: 5,
    rotateX: -5,
    scale: 1.02,
  },
  bounce: {
    y: [-4, 0],
    transition: { duration: 0.3, ease: 'easeOut' },
  },
} as const;

// ============================================================================
// TAP EFFECT PRESETS
// ============================================================================

export const tapEffects = {
  press: {
    scale: 0.96,
    y: 2,
  },
  click: {
    scale: 0.92,
  },
  bounce: {
    scale: [0.95, 1.02, 0.98, 1],
    transition: { duration: 0.3 },
  },
  ripple: {
    scale: 0.98,
    filter: 'brightness(0.95)',
  },
} as const;

// ============================================================================
// FOCUS EFFECT PRESETS
// ============================================================================

// Focus shadow constants using CSS variables for theme integration
export const SHADOW_FOCUS_RING =
  '0 0 0 3px var(--focus-ring-color, rgba(66, 153, 225, 0.5))';
export const SHADOW_FOCUS_GLOW =
  '0 0 12px var(--focus-glow-color, rgba(66, 153, 225, 0.4))';

export const focusEffects = {
  ring: {
    boxShadow: SHADOW_FOCUS_RING,
    scale: 1.01,
  },
  glow: {
    filter: 'brightness(1.05)',
    boxShadow: SHADOW_FOCUS_GLOW,
  },
  outline: {
    outline: '2px solid currentColor',
    outlineOffset: '2px',
  },
} as const;
