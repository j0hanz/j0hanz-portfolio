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

const willChangeTransformOpacity = {
  willChange: 'transform, opacity',
};

const createFadeVariant = (offset = 72): SectionVariant => ({
  initial: { opacity: 0, y: offset, ...willChangeTransformOpacity },
  whileInView: { opacity: 1, y: 0, ...willChangeTransformOpacity },
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
    initial: { opacity: 0, x: -95, ...willChangeTransformOpacity },
    whileInView: { opacity: 1, x: 0, ...willChangeTransformOpacity },
  },
  slideFromRight: {
    initial: { opacity: 0, x: 95, ...willChangeTransformOpacity },
    whileInView: { opacity: 1, x: 0, ...willChangeTransformOpacity },
  },
  slideFromLeftAndRight: {
    initial: { opacity: 0, x: -95, ...willChangeTransformOpacity },
    whileInView: { opacity: 1, x: 95, ...willChangeTransformOpacity },
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
      ...willChangeTransformOpacity,
    },
    hover: {
      y: -8,
      scale: 1.02,
      boxShadow: '0 16px 45px rgba(15, 23, 42, 0.14)',
      ...willChangeTransformOpacity,
    },
    tap: {
      scale: 0.98,
      y: -2,
      ...willChangeTransformOpacity,
    },
  },
  buttonTap: {
    rest: { scale: 1, rotate: 0, ...willChangeTransformOpacity },
    hover: { scale: 1.05, rotate: 0, ...willChangeTransformOpacity },
    focus: { scale: 1.02, ...willChangeTransformOpacity },
    tap: { scale: 0.95, rotate: -1, ...willChangeTransformOpacity },
  },
};

const scroll = {
  scrollFadeUp: createFadeVariant(36),
  scrollParallax: {
    initial: { y: 0, ...willChangeTransformOpacity },
    animate: { y: [-12, 12], ...willChangeTransformOpacity },
    transition: { duration: 6, repeat: Infinity, repeatType: 'mirror' },
  },
};

const exit = {
  modal: {
    initial: { opacity: 0, scale: 0.95, ...willChangeTransformOpacity },
    animate: { opacity: 1, scale: 1, ...willChangeTransformOpacity },
    exit: { opacity: 0, scale: 0.9, ...willChangeTransformOpacity },
  },
  slideDown: {
    initial: { opacity: 0, y: -24, ...willChangeTransformOpacity },
    animate: { opacity: 1, y: 0, ...willChangeTransformOpacity },
    exit: { opacity: 0, y: 48, ...willChangeTransformOpacity },
  },
  zoomOut: {
    initial: { opacity: 0, scale: 0.9, ...willChangeTransformOpacity },
    animate: { opacity: 1, scale: 1, ...willChangeTransformOpacity },
    exit: { opacity: 0, scale: 0.8, ...willChangeTransformOpacity },
  },
  formField: {
    initial: { opacity: 0, y: 12, ...willChangeTransformOpacity },
    animate: { opacity: 1, y: 0, ...willChangeTransformOpacity },
    exit: { opacity: 0, y: -12, scale: 0.96, ...willChangeTransformOpacity },
  },
  toast: {
    initial: { opacity: 0, y: -12, scale: 0.95, ...willChangeTransformOpacity },
    animate: { opacity: 1, y: 0, scale: 1, ...willChangeTransformOpacity },
    exit: { opacity: 0, y: 16, scale: 0.92, ...willChangeTransformOpacity },
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
