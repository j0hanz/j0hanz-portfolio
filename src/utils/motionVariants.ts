import type { MotionProps, Transition, Variants } from 'motion/react';

import type {
  SectionMotionVariantId,
  StaggerConfig,
  TransitionPreset,
} from '@/config/types';

const transitions: Record<TransitionPreset, Transition> = {
  springy: {
    type: 'spring',
    stiffness: 220,
    damping: 24,
    mass: 1,
  },
  smooth: {
    duration: 0.65,
    ease: [0.42, 0, 0.58, 1],
  },
  snappy: {
    duration: 0.28,
    ease: [0.33, 1, 0.68, 1],
  },
  bounce: {
    type: 'spring',
    stiffness: 320,
    damping: 18,
    mass: 0.85,
  },
};

type SectionVariant = Pick<MotionProps, 'initial' | 'whileInView' | 'animate'>;

const WILL_CHANGE_TRANSFORM_OPACITY = {
  willChange: 'transform, opacity' as const,
};

const createFadeVariant = (offset = 72): SectionVariant => ({
  initial: { opacity: 0, y: offset, ...WILL_CHANGE_TRANSFORM_OPACITY },
  whileInView: { opacity: 1, y: 0, ...WILL_CHANGE_TRANSFORM_OPACITY },
});

const sections: Record<SectionMotionVariantId, SectionVariant> = {
  hero: {
    initial: { opacity: 0, y: 24 },
    whileInView: { opacity: 1, y: 0 },
  },
  aboutMe: createFadeVariant(),
  education: createFadeVariant(),
  skills: createFadeVariant(64),
  portfolio: createFadeVariant(80),
  workExperience: createFadeVariant(64),
  contact: createFadeVariant(72),
};

const slides: Record<
  'slideFromLeft' | 'slideFromRight' | 'slideFromLeftAndRight',
  Variants
> = {
  slideFromLeft: {
    initial: { opacity: 0, x: -95, ...WILL_CHANGE_TRANSFORM_OPACITY },
    whileInView: { opacity: 1, x: 0, ...WILL_CHANGE_TRANSFORM_OPACITY },
  },
  slideFromRight: {
    initial: { opacity: 0, x: 95, ...WILL_CHANGE_TRANSFORM_OPACITY },
    whileInView: { opacity: 1, x: 0, ...WILL_CHANGE_TRANSFORM_OPACITY },
  },
  slideFromLeftAndRight: {
    initial: { opacity: 0, x: -95, ...WILL_CHANGE_TRANSFORM_OPACITY },
    whileInView: { opacity: 1, x: 95, ...WILL_CHANGE_TRANSFORM_OPACITY },
  },
};

const stagger: StaggerConfig = {
  container: {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.12,
        delayChildren: 0.08,
      },
    },
  },
  item: {
    hidden: { opacity: 0, y: 24 },
    show: { opacity: 1, y: 0 },
  },
};

const gesture = {
  cardHover: {
    rest: {
      y: 0,
      scale: 1,
      boxShadow: '0 8px 30px rgba(15, 23, 42, 0.08)',
      ...WILL_CHANGE_TRANSFORM_OPACITY,
    },
    hover: {
      y: -8,
      scale: 1.02,
      boxShadow: '0 16px 45px rgba(15, 23, 42, 0.14)',
      ...WILL_CHANGE_TRANSFORM_OPACITY,
    },
    tap: {
      scale: 0.98,
      y: -2,
      ...WILL_CHANGE_TRANSFORM_OPACITY,
    },
  },
  buttonTap: {
    rest: { scale: 1, rotate: 0, ...WILL_CHANGE_TRANSFORM_OPACITY },
    hover: { scale: 1.05, rotate: 0, ...WILL_CHANGE_TRANSFORM_OPACITY },
    focus: { scale: 1.02, ...WILL_CHANGE_TRANSFORM_OPACITY },
    tap: { scale: 0.95, rotate: -1, ...WILL_CHANGE_TRANSFORM_OPACITY },
  },
};

const scroll = {
  scrollFadeUp: createFadeVariant(36),
  scrollParallax: {
    initial: { y: 0, ...WILL_CHANGE_TRANSFORM_OPACITY },
    animate: { y: [-12, 12], ...WILL_CHANGE_TRANSFORM_OPACITY },
    transition: { duration: 6, repeat: Infinity, repeatType: 'mirror' },
  },
};

const exit = {
  modal: {
    initial: { opacity: 0, scale: 0.95, ...WILL_CHANGE_TRANSFORM_OPACITY },
    animate: { opacity: 1, scale: 1, ...WILL_CHANGE_TRANSFORM_OPACITY },
    exit: { opacity: 0, scale: 0.9, ...WILL_CHANGE_TRANSFORM_OPACITY },
  },
  slideDown: {
    initial: { opacity: 0, y: -24, ...WILL_CHANGE_TRANSFORM_OPACITY },
    animate: { opacity: 1, y: 0, ...WILL_CHANGE_TRANSFORM_OPACITY },
    exit: { opacity: 0, y: 48, ...WILL_CHANGE_TRANSFORM_OPACITY },
  },
  zoomOut: {
    initial: { opacity: 0, scale: 0.9, ...WILL_CHANGE_TRANSFORM_OPACITY },
    animate: { opacity: 1, scale: 1, ...WILL_CHANGE_TRANSFORM_OPACITY },
    exit: { opacity: 0, scale: 0.8, ...WILL_CHANGE_TRANSFORM_OPACITY },
  },
  formField: {
    initial: { opacity: 0, y: 12, ...WILL_CHANGE_TRANSFORM_OPACITY },
    animate: { opacity: 1, y: 0, ...WILL_CHANGE_TRANSFORM_OPACITY },
    exit: { opacity: 0, y: -12, scale: 0.96, ...WILL_CHANGE_TRANSFORM_OPACITY },
  },
  toast: {
    initial: {
      opacity: 0,
      y: -12,
      scale: 0.95,
      ...WILL_CHANGE_TRANSFORM_OPACITY,
    },
    animate: { opacity: 1, y: 0, scale: 1, ...WILL_CHANGE_TRANSFORM_OPACITY },
    exit: { opacity: 0, y: 16, scale: 0.92, ...WILL_CHANGE_TRANSFORM_OPACITY },
  },
};

const layout = {
  layoutGroup: {
    layout: true,
    transition: transitions.smooth,
  },
};

const motionVariants = {
  sections,
  slides,
  stagger,
  gesture,
  scroll,
  exit,
  layout,
} as const;

export { transitions, motionVariants };
