import { forwardRef, useRef } from 'react';

import { Box } from '@mui/material';
import { AnimatePresence, motion } from 'motion/react';

import {
  fadeInViewVariants,
  pageTransitionVariants,
  sectionVariants,
  staggerContainerVariants,
  staggerItemSimpleVariants,
  viewportConfig,
} from '@/config/motion';
import type {
  FadeInViewProps,
  MotionWrapperProps,
  SectionMotionVariantId,
  SlideFromSideProps,
  StaggerContainerProps,
  StaggerItemProps,
} from '@/config/types';
import { useAnimationConfig, useInView } from '@/hooks';
import { useNavigationState } from '@/hooks/useNavigation';

// ============================================================================
// SECTION MOTION WRAPPER
// ============================================================================

// Map section IDs to variants
const variantMap: Record<SectionMotionVariantId, keyof typeof sectionVariants> =
  {
    hero: 'default',
    aboutMe: 'slideUp',
    education: 'slideUp',
    skills: 'scale',
    portfolio: 'slideUp',
    workExperience: 'slideUp',
    contact: 'slideUp',
  };

// Wraps sections with scroll-triggered animations (auto handles reduced motion)
function MotionWrapper({
  children,
  sectionId,
  style,
  transition: transitionOverride,
  viewport: viewportOverride,
  ...props
}: MotionWrapperProps): React.JSX.Element {
  const { prefersReducedMotion, getTransition, reducedMotionTarget } =
    useAnimationConfig();

  const variantKey = variantMap[sectionId] ?? 'default';
  const variant = sectionVariants[variantKey];

  const viewport =
    viewportOverride ?? (prefersReducedMotion ? undefined : viewportConfig);
  const transition = transitionOverride ?? getTransition('easeOut');

  if (prefersReducedMotion) {
    return (
      <motion.div
        initial={reducedMotionTarget}
        animate={reducedMotionTarget}
        style={style}
        {...props}
      >
        {children}
      </motion.div>
    );
  }

  return (
    <motion.div
      initial={variant.initial}
      whileInView={variant.whileInView}
      transition={transition}
      viewport={viewport}
      style={style}
      {...props}
    >
      {children}
    </motion.div>
  );
}

// ============================================================================
// SLIDE FROM SIDE
// ============================================================================

// Animates elements sliding in from left or right
function SlideFromSide({
  children,
  from,
  style,
  transition: transitionOverride,
  viewport: viewportOverride,
  ...props
}: SlideFromSideProps): React.JSX.Element {
  const { prefersReducedMotion, getTransition, reducedMotionTarget } =
    useAnimationConfig();

  const initialTransform =
    from === 'left' ? 'translateX(-50px)' : 'translateX(50px)';
  const viewport =
    viewportOverride ?? (prefersReducedMotion ? undefined : viewportConfig);
  const transition = transitionOverride ?? getTransition('easeOut');

  if (prefersReducedMotion) {
    return (
      <motion.div
        initial={reducedMotionTarget}
        animate={reducedMotionTarget}
        style={style}
        {...props}
      >
        {children}
      </motion.div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0, transform: initialTransform }}
      whileInView={{ opacity: 1, transform: 'translateX(0px)' }}
      transition={transition}
      viewport={viewport}
      style={style}
      {...props}
    >
      {children}
    </motion.div>
  );
}

// ============================================================================
// FADE IN VIEW
// ============================================================================

// Simple fade-in when element enters viewport
export const FadeInView = forwardRef<HTMLDivElement, FadeInViewProps>(
  function FadeInView({ children, delay = 0, threshold = 0.2, ...props }, ref) {
    const { prefersReducedMotion, getTransition } = useAnimationConfig();
    const localRef = useRef<HTMLDivElement>(null);
    const isInView = useInView((ref as React.RefObject<Element>) || localRef, {
      once: true,
      amount: threshold,
    });

    if (prefersReducedMotion) {
      return <div ref={ref || localRef}>{children}</div>;
    }

    return (
      <motion.div
        ref={ref || localRef}
        variants={fadeInViewVariants}
        initial="initial"
        animate={isInView ? 'animate' : 'initial'}
        transition={getTransition('easeOut', { delay })}
        {...props}
      >
        {children}
      </motion.div>
    );
  }
);

// ============================================================================
// STAGGER CONTAINER
// ============================================================================

// Container that staggers child animations
export function StaggerContainer({
  children,
  stagger = 0.07,
  className,
  style,
}: StaggerContainerProps) {
  const { prefersReducedMotion } = useAnimationConfig();

  if (prefersReducedMotion) {
    return (
      <div className={className} style={style}>
        {children}
      </div>
    );
  }

  return (
    <motion.div
      className={className}
      style={style}
      initial="initial"
      whileInView="animate"
      viewport={{ once: true, amount: 0.15 }}
      variants={staggerContainerVariants}
      custom={stagger}
    >
      {children}
    </motion.div>
  );
}

// ============================================================================
// STAGGER ITEM
// ============================================================================

// Item to be used inside StaggerContainer
export function StaggerItem({ children, className, style }: StaggerItemProps) {
  const { prefersReducedMotion } = useAnimationConfig();

  if (prefersReducedMotion) {
    return (
      <div className={className} style={style}>
        {children}
      </div>
    );
  }

  return (
    <motion.div
      className={className}
      style={style}
      variants={staggerItemSimpleVariants}
    >
      {children}
    </motion.div>
  );
}

// ============================================================================
// PAGE TRANSITION WRAPPER
// ============================================================================

export function PageTransitionWrapper({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}): React.JSX.Element {
  const { direction } = useNavigationState();
  const { prefersReducedMotion } = useAnimationConfig();

  return (
    <Box
      component={motion.div}
      id="active-section-container"
      className={className}
      layout
      layoutDependency={direction}
      custom={direction}
      variants={pageTransitionVariants}
      initial="enter"
      animate="center"
      exit="exit"
      transition={{
        transform: prefersReducedMotion
          ? { duration: 0 }
          : { type: 'spring', stiffness: 300, damping: 30 },
        opacity: { duration: prefersReducedMotion ? 0 : 0.2 },
        layout: { duration: prefersReducedMotion ? 0 : 0.3 },
      }}
      sx={{
        position: 'absolute',
        width: '100%',
        height: '100%',
        top: 0,
        left: 0,
        overflowY: 'auto',
        overflowX: 'hidden',
        // Hardware acceleration: transform and opacity are GPU-accelerated
        willChange: 'transform, opacity',
      }}
    >
      {children}
    </Box>
  );
}

// ============================================================================
// EXPORTS
// ============================================================================

export { MotionWrapper, SlideFromSide, AnimatePresence };
