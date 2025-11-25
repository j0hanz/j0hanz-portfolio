import { useRef } from 'react';

import { Box } from '@mui/material';
import {
  AnimatePresence,
  motion,
  usePresenceData,
  useTime,
  useTransform,
} from 'motion/react';

import {
  fadeInViewVariants,
  pageTransitionVariants,
  presenceAwareVariants,
  sectionVariants,
  staggerContainerVariants,
  staggerItemSimpleVariants,
  svgPathVariants,
  viewportConfig,
} from '@/config/motion';
import type {
  AnimateActivityProps,
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

// Simple fade-in when element enters viewport (React 19: ref as prop)
export function FadeInView({
  children,
  delay = 0,
  threshold = 0.2,
  ref,
  ...props
}: FadeInViewProps) {
  const { prefersReducedMotion, getTransition } = useAnimationConfig();
  const localRef = useRef<HTMLDivElement>(null);
  const effectiveRef = (ref as React.RefObject<Element>) || localRef;
  const isInView = useInView(effectiveRef, {
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

// Page transition wrapper (React 19: ref as prop)
export function PageTransitionWrapper({
  children,
  className,
  ref,
}: {
  children: React.ReactNode;
  className?: string;
  ref?: React.Ref<HTMLDivElement>;
}) {
  const { direction } = useNavigationState();
  const { prefersReducedMotion } = useAnimationConfig();

  return (
    <Box
      ref={ref}
      component={motion.div}
      id="active-section-container"
      className={className}
      custom={direction}
      variants={pageTransitionVariants}
      initial={false}
      animate="center"
      exit="exit"
      transition={{
        transform: prefersReducedMotion
          ? { duration: 0 }
          : { type: 'spring', visualDuration: 0.4, bounce: 0.15 },
        opacity: { duration: prefersReducedMotion ? 0 : 0.2 },
      }}
      sx={{
        position: 'absolute',
        width: '100%',
        height: '100%',
        top: 0,
        left: 0,
        overflowY: 'auto',
        overflowX: 'hidden',
        willChange: 'transform, opacity',
      }}
    >
      {children}
    </Box>
  );
}

// ============================================================================
// ANIMATE ACTIVITY WRAPPER
// ============================================================================

// AnimateActivity-style wrapper for tab/section visibility transitions
export function AnimateActivityWrapper({
  children,
  mode,
  layoutMode = 'sync',
  onExitComplete,
}: AnimateActivityProps) {
  const { prefersReducedMotion } = useAnimationConfig();

  if (prefersReducedMotion) {
    return mode === 'visible' ? <>{children}</> : null;
  }

  return (
    <AnimatePresence
      mode={layoutMode === 'pop' ? 'popLayout' : 'sync'}
      onExitComplete={onExitComplete}
    >
      {mode === 'visible' && children}
    </AnimatePresence>
  );
}

// ============================================================================
// PRESENCE-AWARE WRAPPER
// ============================================================================

// Wrapper that uses direction data from parent AnimatePresence
export function PresenceAwareWrapper({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  const direction = usePresenceData() as 'up' | 'down' | null;
  const { prefersReducedMotion, getTransition } = useAnimationConfig();

  if (prefersReducedMotion) {
    return <div className={className}>{children}</div>;
  }

  return (
    <motion.div
      className={className}
      custom={direction}
      variants={presenceAwareVariants}
      initial="enter"
      animate="center"
      exit="exit"
      transition={getTransition('springVisual')}
    >
      {children}
    </motion.div>
  );
}

// ============================================================================
// SVG PATH ANIMATION
// ============================================================================

// Animated SVG path with draw effect
export function AnimatedSvgPath({
  d,
  className,
  stroke = 'currentColor',
  strokeWidth = 2,
  fill = 'transparent',
  duration = 1.5,
}: {
  d: string;
  className?: string;
  stroke?: string;
  strokeWidth?: number;
  fill?: string;
  duration?: number;
}) {
  const { prefersReducedMotion, getTransition } = useAnimationConfig();

  return (
    <motion.path
      d={d}
      className={className}
      stroke={stroke}
      strokeWidth={strokeWidth}
      fill={fill}
      variants={svgPathVariants.draw}
      initial="initial"
      whileInView="animate"
      viewport={{ once: true, amount: 0.5 }}
      transition={
        prefersReducedMotion
          ? { duration: 0 }
          : getTransition('easeInOut', { duration })
      }
    />
  );
}

// ============================================================================
// BLINKING CURSOR
// ============================================================================

// Blinking cursor for text input effects using time-based animation
export function BlinkingCursor({
  style,
  blinkDuration = 900,
}: {
  style?: React.CSSProperties;
  blinkDuration?: number;
}): React.JSX.Element | null {
  const { prefersReducedMotion } = useAnimationConfig();
  const time = useTime();

  // Smooth sine-wave opacity: 0 → 1 → 0 over the cycle
  const opacity = useTransform(time, (t) => {
    const normalized = (t / blinkDuration) % 1;
    return Math.sin(normalized * Math.PI);
  });

  if (prefersReducedMotion) return null;

  return <motion.span aria-hidden="true" style={{ ...style, opacity }} />;
}

// ============================================================================
// ANIMATED CHECKMARK
// ============================================================================

// Animated checkmark with circle and path draw effect
export function AnimatedCheckmark({
  size = 38,
  strokeWidth = 2,
}: {
  size?: number;
  strokeWidth?: number;
}): React.JSX.Element {
  const pathRef = useRef<SVGPathElement>(null);
  const { prefersReducedMotion } = useAnimationConfig();

  // Circle circumference for stroke-dasharray
  const circleCircumference = 2 * Math.PI * 9; // r=9

  return (
    <motion.svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={strokeWidth}
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ type: 'spring', stiffness: 200, damping: 20 }}
    >
      <motion.circle
        cx="12"
        cy="12"
        r="9"
        initial={{
          strokeDasharray: circleCircumference,
          strokeDashoffset: prefersReducedMotion ? 0 : circleCircumference,
        }}
        animate={{ strokeDashoffset: 0 }}
        transition={{
          type: 'spring',
          stiffness: 100,
          damping: 20,
          duration: 0.6,
        }}
      />
      <motion.path
        ref={pathRef}
        d="M7.5 12.5l3 3.2 6-6.7"
        strokeLinecap="round"
        strokeLinejoin="round"
        initial={{
          pathLength: prefersReducedMotion ? 1 : 0,
        }}
        animate={{ pathLength: 1 }}
        transition={{
          type: 'spring',
          stiffness: 100,
          damping: 20,
          delay: 0.2,
          duration: 0.6,
        }}
      />
    </motion.svg>
  );
}

// ============================================================================
// EXPORTS
// ============================================================================

export { MotionWrapper, SlideFromSide, AnimatePresence };
