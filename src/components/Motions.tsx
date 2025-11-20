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

// Wrapper component for applying motion animations to sections
function MotionWrapper({
  children,
  sectionId,
  ...props
}: MotionWrapperProps): React.JSX.Element {
  const { prefersReducedMotion, getTransition } = useAnimationConfig();
  const variant = motionVariants.sections[sectionId] ?? fallbackVariant;

  // Calculate delay based on section order
  const sectionIndex = SECTION_ORDER.indexOf(
    sectionId as (typeof SECTION_ORDER)[number]
  );
  const batchDelay =
    prefersReducedMotion || sectionIndex === -1
      ? 0
      : sectionIndex * BATCH_DELAY_INCREMENT;

  const baseMotion = { opacity: prefersReducedMotion ? 1 : 0, y: 0 };
  const resolvedInitial: MotionProps['initial'] = prefersReducedMotion
    ? baseMotion
    : ((variant.initial ?? baseMotion) as MotionProps['initial']);
  const resolvedWhileInView: MotionProps['whileInView'] = prefersReducedMotion
    ? baseMotion
    : ((variant.whileInView ??
        variant.animate ?? { opacity: 1 }) as MotionProps['whileInView']);

  return (
    <motion.div
      initial={resolvedInitial}
      whileInView={resolvedWhileInView}
      transition={getTransition('smooth', { delay: batchDelay })}
      viewport={{ once: true, amount: 0.15, margin: '0px' }}
      style={{ position: 'relative' }}
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
  ...props
}: SlideFromSideProps): React.JSX.Element {
  const { prefersReducedMotion, getTransition } = useAnimationConfig();
  const initialX = from === 'left' ? -100 : 100;
  const initial = prefersReducedMotion
    ? ({ opacity: 1, x: 0 } as const)
    : ({ opacity: 0, x: initialX } as const);
  const target = { opacity: 1, x: 0 } as const;

  return (
    <motion.div
      initial={initial}
      whileInView={target}
      transition={getTransition('smooth')}
      {...props}
    >
      {children}
    </motion.div>
  );
}

export { MotionWrapper, SlideFromSide };
