import { AnimatePresence, motion } from 'motion/react';
import type { MotionProps } from 'motion/react';

import { MotionWrapperProps, SlideFromSideProps } from '@/config/types';
import { useAnimationConfig } from '@/hooks';
import { motionVariants } from '@/utils/motionVariants';

// Use a stable fallback variant so missing ids do not break motion rendering.
const fallbackVariant = motionVariants.fadeUp;

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

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const variant = (motionVariants.sections[sectionId] ??
    fallbackVariant) as any;

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
      fallbackVariant.animate ??
      reducedMotionTarget) as MotionProps['whileInView'],
    reducedMotionTarget as MotionProps['whileInView']
  );

  const viewport =
    viewportOverride ?? (prefersReducedMotion ? undefined : motionViewport);
  const transition = transitionOverride ?? getTransition('smooth');

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
  const initialX = from === 'left' ? -50 : 50;
  const viewport =
    viewportOverride ?? (prefersReducedMotion ? undefined : motionViewport);
  const transition = transitionOverride ?? getTransition('spring');
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

export { MotionWrapper, SlideFromSide, AnimatePresence };
