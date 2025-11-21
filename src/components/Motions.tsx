import React from 'react';

import { motion } from 'motion/react';
import type { MotionProps } from 'motion/react';

import { MotionWrapperProps, SlideFromSideProps } from '@/config/types';
import { useAnimationConfig } from '@/hooks/useMotions';
import { motionVariants } from '@/utils/motionVariants';

// Use a stable fallback variant so missing ids do not break motion rendering.
const fallbackVariant = motionVariants.sections.aboutMe;

// Static section order for predictable batch delays
const SECTION_ORDER = [
  'hero',
  'aboutMe',
  'education',
  'skills',
  'portfolio',
  'workExperience',
  'contact',
] as const;
const BATCH_DELAY_INCREMENT = 0.1;

type SectionIdentifier = MotionWrapperProps['sectionId'];

const SECTION_BATCH_DELAYS = SECTION_ORDER.reduce(
  (accumulator, section, index) => {
    accumulator[section as SectionIdentifier] = index * BATCH_DELAY_INCREMENT;
    return accumulator;
  },
  {} as Record<SectionIdentifier, number>
);

// Wrapper component for applying motion animations to sections
function MotionWrapper({
  children,
  sectionId,
  style,
  transition: transitionOverride,
  viewport: viewportOverride,
  ...props
}: MotionWrapperProps): React.JSX.Element {
  const {
    prefersReducedMotion,
    getTransition,
    motionViewport,
    resolveMotionState,
    reducedMotionTarget,
  } = useAnimationConfig();
  const variant = motionVariants.sections[sectionId] ?? fallbackVariant;

  // Calculate delay based on section order
  const batchDelay = prefersReducedMotion
    ? 0
    : (SECTION_BATCH_DELAYS[sectionId] ?? 0);

  const resolvedInitial: MotionProps['initial'] = resolveMotionState(
    prefersReducedMotion,
    (variant.initial ??
      fallbackVariant.initial ??
      reducedMotionTarget) as MotionProps['initial'],
    reducedMotionTarget as MotionProps['initial']
  );
  const resolvedWhileInView: MotionProps['whileInView'] = resolveMotionState(
    prefersReducedMotion,
    (variant.whileInView ??
      variant.animate ??
      fallbackVariant.whileInView ??
      fallbackVariant.animate ??
      reducedMotionTarget) as MotionProps['whileInView'],
    reducedMotionTarget as MotionProps['whileInView']
  );
  const viewport =
    viewportOverride ?? (prefersReducedMotion ? undefined : motionViewport);
  const transition =
    transitionOverride ?? getTransition('smooth', { delay: batchDelay });
  const motionStates = prefersReducedMotion
    ? {
        initial: reducedMotionTarget,
        animate: reducedMotionTarget,
      }
    : {
        initial: resolvedInitial,
        whileInView: resolvedWhileInView,
      };

  return (
    <motion.div
      {...motionStates}
      transition={transition}
      viewport={viewport}
      style={{ position: 'relative', ...(style ?? {}) }}
      {...props}
    >
      {children}
    </motion.div>
  );
}

// Component for sliding animations from left or right
function SlideFromSide({
  children,
  from,
  style,
  transition: transitionOverride,
  viewport: viewportOverride,
  ...props
}: SlideFromSideProps): React.JSX.Element {
  const {
    prefersReducedMotion,
    getTransition,
    motionViewport,
    reducedMotionTarget,
  } = useAnimationConfig();
  const initialX = from === 'left' ? -100 : 100;
  const viewport =
    viewportOverride ?? (prefersReducedMotion ? undefined : motionViewport);
  const transition = transitionOverride ?? getTransition('smooth');
  const motionStates = prefersReducedMotion
    ? {
        initial: reducedMotionTarget,
        animate: reducedMotionTarget,
      }
    : {
        initial: { opacity: 0, x: initialX } as const,
        whileInView: { opacity: 1, x: 0 } as const,
      };

  return (
    <motion.div
      {...motionStates}
      transition={transition}
      viewport={viewport}
      style={style}
      {...props}
    >
      {children}
    </motion.div>
  );
}

export { MotionWrapper, SlideFromSide };
