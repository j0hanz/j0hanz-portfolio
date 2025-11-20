import React, { useEffect, useId } from 'react';

import { motion } from 'motion/react';
import type { MotionProps } from 'motion/react';

import { MotionWrapperProps, SlideFromSideProps } from '@/config/types';
import { useAnimationConfig } from '@/hooks/useMotions';
import { motionVariants } from '@/utils/motionVariants';

// Use a stable fallback variant so missing ids do not break motion rendering.
const fallbackVariant = motionVariants.sections.aboutMe;
const SECTION_BATCH_SIZE = 3;
const SECTION_BATCH_WINDOW = 0.8;
const sectionDelayMap = new Map<string, number>();

const assignBatchDelay = (id: string): number => {
  if (sectionDelayMap.has(id)) {
    return sectionDelayMap.get(id)!;
  }

  const index = sectionDelayMap.size;
  const batchGroup = Math.floor(index / SECTION_BATCH_SIZE);
  const delay = batchGroup * SECTION_BATCH_WINDOW;
  sectionDelayMap.set(id, delay);
  return delay;
};

const releaseBatchDelay = (id: string): void => {
  sectionDelayMap.delete(id);
};

// Wrapper component for applying motion animations to sections
function MotionWrapper({
  children,
  sectionId,
  ...props
}: MotionWrapperProps): React.JSX.Element {
  const { prefersReducedMotion, getTransition } = useAnimationConfig();
  const variant = motionVariants.sections[sectionId] ?? fallbackVariant;
  const instanceId = useId();

  useEffect(
    () => () => {
      if (!prefersReducedMotion) {
        releaseBatchDelay(instanceId);
      }
    },
    [instanceId, prefersReducedMotion]
  );

  const batchDelay = prefersReducedMotion ? 0 : assignBatchDelay(instanceId);

  const resolvedInitial: MotionProps['initial'] = prefersReducedMotion
    ? ({ opacity: 1, y: 0 } as MotionProps['initial'])
    : ((variant.initial ?? { opacity: 0 }) as MotionProps['initial']);
  const resolvedWhileInView: MotionProps['whileInView'] = prefersReducedMotion
    ? ({ opacity: 1, y: 0 } as MotionProps['whileInView'])
    : ((variant.whileInView ??
        variant.animate ?? { opacity: 1 }) as MotionProps['whileInView']);

  return (
    <motion.div
      initial={resolvedInitial}
      whileInView={resolvedWhileInView}
      transition={getTransition('smooth', {
        delay: prefersReducedMotion ? 0 : batchDelay,
      })}
      viewport={{ once: false, amount: 0.3, margin: '-100px' }}
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
    ? { opacity: 1, x: 0 }
    : { opacity: 0, x: initialX };
  const target = { opacity: 1, x: 0 };
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
