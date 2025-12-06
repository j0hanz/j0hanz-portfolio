import type { Variants } from 'motion/react';

import type {
  SectionMotionVariantId,
  StaggerContainerOptions,
} from '@/config/types';

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

// Shared hover transform for cards
export const CARD_HOVER_LIFT = { y: -5 } as const;

// Viewport preset configurations for useInView
// Base presets (once: true) - for standard scroll-triggered animations
// Replay presets (once: false) - for full-page scroll where sections remount
export const viewportPresets = {
  section: { once: true, amount: 0.1 },
  card: { once: true, amount: 0.25 },
  list: { once: true, amount: 0.2 },
  sectionReplay: { once: false, amount: 0.1 },
  cardReplay: { once: false, amount: 0.2 },
  listReplay: { once: false, amount: 0.15 },
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

// Unified shadow constants for static styles (non-animated)
export const SHADOWS = {
  liftRest: '0 4px 12px var(--shadow-color, rgba(0,0,0,0.08))',
  liftHover: '0 20px 40px var(--shadow-color, rgba(0,0,0,0.15))',
  liftTap: '0 8px 20px var(--shadow-color, rgba(0,0,0,0.12))',
  hoverLift: '0 16px 40px var(--shadow-color, rgba(0,0,0,0.12))',
  hoverGlow: '0 0 20px var(--glow-color, rgba(255,255,255,0.2))',
  focusRing: '0 0 0 3px var(--focus-ring-color, rgba(66, 153, 225, 0.5))',
  focusGlow: '0 0 12px var(--focus-glow-color, rgba(66, 153, 225, 0.4))',
} as const;

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
    transition: {
      type: 'spring' as const,
      stiffness: 280,
      damping: 24,
      filter: {
        type: 'tween' as const,
        duration: 0.35,
        ease: 'easeOut' as const,
      },
    },
  },
  exit: { opacity: 0, y: -14, scale: 0.94, filter: 'blur(2px)' },
};

// Mobile-optimized variant without blur filters for better performance
export const staggerItemVariantMobile: Variants = {
  initial: { opacity: 0, y: 28, scale: 0.96 },
  animate: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { type: 'spring' as const, stiffness: 280, damping: 24 },
  },
  exit: { opacity: 0, y: -14, scale: 0.94 },
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

// Mobile-optimized card entrance without blur for better performance
export const cardEntranceVariantsMobile = {
  hidden: { opacity: 0, y: 44, scale: 0.96 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    scale: 1,
    transition: {
      delay: i * 0.18,
      duration: 0.65,
      ease: EASE_OUT_EXPO,
    },
  }),
};

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

// Map section IDs to variants
export const variantMap: Record<
  SectionMotionVariantId,
  keyof typeof sectionVariants
> = {
  hero: 'default',
  aboutMe: 'slideUp',
  portfolio: 'slideUp',
  workExperience: 'slideUp',
  contact: 'slideUp',
};

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
        filter: {
          type: 'tween' as const,
          duration: duration * 0.8,
          ease: 'easeOut' as const,
        },
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
        filter: {
          type: 'tween' as const,
          duration: duration * 0.6,
          ease: 'easeIn' as const,
        },
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
// BADGE & CHIP VARIANTS
// ============================================================================

// Skill badge stagger variants for hero section
export const skillBadgeVariants = {
  container: {
    initial: {},
    animate: {
      transition: {
        staggerChildren: 0.04,
        delayChildren: 0.3,
      },
    },
  },
  item: {
    initial: { opacity: 0, y: 15, scale: 0.9 },
    animate: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: {
        type: 'spring' as const,
        stiffness: 300,
        damping: 24,
      },
    },
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
