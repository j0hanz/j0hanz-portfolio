// ============================================================================
// MOTION COMPONENTS
// ============================================================================
import { Box, type SxProps, type Theme } from '@mui/material';
import { AnimatePresence, m, useTime, useTransform } from 'motion/react';

import {
  pageTransitionVariants,
  staggerContainerVariants,
} from '@/config/motion';
import type { StaggerContainerProps } from '@/config/types';
import { useAnimationConfig, useNavigationState } from '@/hooks';

// ============================================================================
// SHARED STYLES
// ============================================================================

const PAGE_TRANSITION_SX = {
  position: 'absolute',
  width: 1,
  height: 1,
  top: 0,
  left: 0,
  overflowY: 'auto',
  overflowX: 'hidden',
} as const;

// ============================================================================
// STAGGER CONTAINER
// ============================================================================

// Container that staggers child animations
export function StaggerContainer({
  children,
  stagger = 0.06,
  className,
  style,
  sx,
}: Readonly<StaggerContainerProps>) {
  const { prefersReducedMotion } = useAnimationConfig();

  if (prefersReducedMotion) {
    return (
      <Box className={className} style={style} sx={sx}>
        {children}
      </Box>
    );
  }

  return (
    <Box
      component={m.div}
      className={className}
      style={style}
      sx={sx}
      initial="initial"
      whileInView="animate"
      viewport={{ once: true, amount: 0.1 }}
      variants={staggerContainerVariants}
      custom={stagger}
    >
      {children}
    </Box>
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
}: Readonly<{
  children: React.ReactNode;
  className?: string;
  ref?: React.Ref<HTMLDivElement>;
}>) {
  const { direction } = useNavigationState();
  const { prefersReducedMotion } = useAnimationConfig();

  return (
    <Box
      ref={ref}
      component={m.div}
      id="active-section-container"
      className={className}
      custom={direction}
      variants={pageTransitionVariants}
      initial="enter"
      animate="center"
      exit="exit"
      transition={{
        y: prefersReducedMotion
          ? { duration: 0 }
          : { type: 'spring' as const, stiffness: 260, damping: 28, mass: 0.9 },
        scale: prefersReducedMotion
          ? { duration: 0 }
          : { type: 'spring' as const, stiffness: 240, damping: 26, mass: 0.9 },
        opacity: { duration: prefersReducedMotion ? 0 : 0.22 },
      }}
      sx={PAGE_TRANSITION_SX}
    >
      {children}
    </Box>
  );
}

// ============================================================================
// BLINKING CURSOR
// ============================================================================

// Blinking cursor for text input effects using time-based animation
export function BlinkingCursor({
  sx,
  blinkDuration = 900,
}: Readonly<{
  sx?: SxProps<Theme>;
  blinkDuration?: number;
}>) {
  const { prefersReducedMotion } = useAnimationConfig();
  const time = useTime();

  // Smooth sine-wave opacity: 0 → 1 → 0 over the cycle
  const opacity = useTransform(time, (t) => {
    const normalized = (t / blinkDuration) % 1;
    return Math.sin(normalized * Math.PI);
  });

  if (prefersReducedMotion) {
    return (
      <Box component="span" aria-hidden="true" sx={{ opacity: 1, ...sx }} />
    );
  }

  return (
    <Box
      component={m.span}
      aria-hidden="true"
      sx={sx}
      // Motion requires style prop for motion values (not sx)
      style={{ opacity }}
    />
  );
}

// ============================================================================
// ANIMATED CHECKMARK
// ============================================================================

// Circle circumference for stroke-dasharray (r=9)
const CIRCLE_CIRCUMFERENCE = 2 * Math.PI * 9;

// Animated checkmark with circle and path draw effect
export function AnimatedCheckmark({
  size = 38,
  strokeWidth = 2,
}: Readonly<{
  size?: number;
  strokeWidth?: number;
}>) {
  const { prefersReducedMotion } = useAnimationConfig();
  const rootInitial = prefersReducedMotion ? false : { opacity: 0, scale: 0.8 };
  const rootAnimate = { opacity: 1, scale: 1 };
  const rootTransition = prefersReducedMotion
    ? { duration: 0 }
    : { type: 'spring' as const, stiffness: 200, damping: 20 };

  return (
    <m.svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={strokeWidth}
      initial={rootInitial}
      animate={rootAnimate}
      transition={rootTransition}
    >
      <m.circle
        cx="12"
        cy="12"
        r="9"
        initial={{
          strokeDasharray: CIRCLE_CIRCUMFERENCE,
          strokeDashoffset: prefersReducedMotion ? 0 : CIRCLE_CIRCUMFERENCE,
        }}
        animate={{ strokeDashoffset: 0 }}
        transition={{
          type: 'spring',
          stiffness: 100,
          damping: 20,
          duration: 0.6,
        }}
      />
      <m.path
        d="M7.5 12.5l3 3.2 6-6.7"
        strokeLinecap="round"
        strokeLinejoin="round"
        initial={{ pathLength: prefersReducedMotion ? 1 : 0 }}
        animate={{ pathLength: 1 }}
        transition={{
          type: 'spring',
          stiffness: 100,
          damping: 20,
          delay: 0.2,
          duration: 0.6,
        }}
      />
    </m.svg>
  );
}

// ============================================================================
// EXPORTS
// ============================================================================

export { AnimatePresence };
