import React from 'react';

import { motion } from 'framer-motion';

import { MotionWrapperProps, SlideFromSideProps } from '@/config/types';
import { motionVariants, transition } from '@/utils/motionVariants';

// Use a stable fallback variant so missing ids do not break motion rendering.
const fallbackVariant = motionVariants.aboutMe;

// Wrapper component for applying motion animations to sections
function MotionWrapper({
  children,
  sectionId,
  ...props
}: MotionWrapperProps): React.JSX.Element {
  const variant = motionVariants[sectionId] ?? fallbackVariant;

  return (
    <motion.div
      initial={variant.initial}
      whileInView={variant.whileInView}
      transition={transition}
      viewport={{ once: true, amount: 0.2 }}
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
  const initialX = from === 'left' ? -100 : 100;
  return (
    <motion.div
      initial={{ opacity: 0, x: initialX }}
      whileInView={{ opacity: 1, x: 0 }}
      transition={transition}
      {...props}
    >
      {children}
    </motion.div>
  );
}

export { MotionWrapper, SlideFromSide };
