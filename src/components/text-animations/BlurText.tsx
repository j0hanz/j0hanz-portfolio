import type { JSX } from 'react';
import { useEffect, useRef, useState } from 'react';

import { Box, type SxProps, type Theme } from '@mui/material';
import { motion, type Transition } from 'motion/react';

import { useReducedMotion } from '@/hooks';

// Animation state type for keyframes
type AnimationState = Record<string, string | number>;

interface BlurTextProps {
  /** Text content to animate */
  text: string;
  /** Delay between each element animation (ms) */
  delay?: number;
  /** Animate by 'words' or 'letters' */
  animateBy?: 'words' | 'letters';
  /** Animation direction (used for default animation) */
  direction?: 'top' | 'bottom';
  /** Viewport threshold for triggering */
  threshold?: number;
  /** Root margin for intersection observer */
  rootMargin?: string;
  /** Custom initial animation state */
  animationFrom?: AnimationState;
  /** Custom animation keyframes (array of states) */
  animationTo?: AnimationState[];
  /** Custom easing function */
  easing?: (t: number) => number;
  /** Duration of each animation step */
  stepDuration?: number;
  /** MUI sx prop */
  sx?: SxProps<Theme>;
  /** Additional className */
  className?: string;
  /** Callback when animation completes */
  onAnimationComplete?: () => void;
  /** HTML element to render as (default: 'span') */
  as?: 'p' | 'span' | 'div' | 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6';
  /** Whether to wait for element to be in view before animating (default: true) */
  startOnView?: boolean;
}

// Build keyframes from initial state and step array
const buildKeyframes = (
  from: AnimationState,
  steps: AnimationState[]
): Record<string, (string | number)[]> => {
  const keys = new Set<string>([
    ...Object.keys(from),
    ...steps.flatMap((s) => Object.keys(s)),
  ]);

  const keyframes: Record<string, (string | number)[]> = {};
  keys.forEach((k) => {
    keyframes[k] = [from[k], ...steps.map((s) => s[k])];
  });
  return keyframes;
};

// Wrapper styles
const wrapperSx = { display: 'flex', flexWrap: 'wrap' } as const;

/**
 * BlurText - Text reveal with blur effect
 *
 * Ported from ReactBits BlurText component.
 * Uses motion/react for blur-based text animations.
 *
 * @example
 * <BlurText text="Hello World" direction="top" />
 * <BlurText text="Welcome" animateBy="letters" delay={50} />
 * <BlurText
 *   text="Custom"
 *   animationFrom={{ opacity: 0, filter: 'blur(6px)', y: 20 }}
 *   animationTo={[
 *     { opacity: 0.5, filter: 'blur(5px)', y: 10 },
 *     { opacity: 1, filter: 'blur(0px)', y: 0 }
 *   ]}
 * />
 */
export function BlurText({
  text = '',
  delay = 200,
  animateBy = 'words',
  direction = 'top',
  threshold = 0.1,
  rootMargin = '0px',
  animationFrom,
  animationTo,
  easing = (t) => t,
  stepDuration = 0.35,
  sx,
  className,
  onAnimationComplete,
  as = 'span',
  startOnView = true,
}: BlurTextProps): JSX.Element {
  const elements = animateBy === 'words' ? text.split(' ') : text.split('');
  const [inView, setInView] = useState(!startOnView);
  const ref = useRef<HTMLElement>(null);
  const prefersReducedMotion = useReducedMotion();

  useEffect(() => {
    // Skip IntersectionObserver if startOnView is false
    if (!startOnView) return;
    if (!ref.current) return;

    const element = ref.current;

    // Use requestAnimationFrame to ensure DOM has painted before checking visibility
    const rafId = requestAnimationFrame(() => {
      if (!element) return;

      // Check if already in view on mount (fixes first render issue)
      const rect = element.getBoundingClientRect();
      const isAlreadyVisible =
        rect.top < window.innerHeight && rect.bottom > 0 && rect.height > 0;

      if (isAlreadyVisible) {
        setInView(true);
        return;
      }

      const observer = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) {
            setInView(true);
            observer.unobserve(element);
          }
        },
        { threshold, rootMargin }
      );

      observer.observe(element);
    });

    return () => {
      cancelAnimationFrame(rafId);
    };
  }, [startOnView, threshold, rootMargin]);

  // Default animation states based on direction
  const defaultFrom =
    direction === 'top'
      ? { filter: 'blur(6px)', opacity: 0, y: -50 }
      : { filter: 'blur(6px)', opacity: 0, y: 50 };

  const defaultTo = [
    {
      filter: 'blur(5px)',
      opacity: 0.1,
      y: direction === 'top' ? 5 : -5,
    },
    { filter: 'blur(0px)', opacity: 1, y: 0 },
  ];

  // Use custom or default animation states
  const fromSnapshot = animationFrom ?? defaultFrom;
  const toSnapshots = animationTo ?? defaultTo;

  // Calculate timing
  const stepCount = toSnapshots.length + 1;
  const totalDuration = stepDuration * (stepCount - 1);
  const times = Array.from({ length: stepCount }, (_, i) =>
    stepCount === 1 ? 0 : i / (stepCount - 1)
  );

  // Reduced motion fallback
  if (prefersReducedMotion) {
    return (
      <Box component={as} className={className} sx={sx}>
        {text}
      </Box>
    );
  }

  return (
    <Box
      component={as}
      ref={ref}
      className={className}
      sx={{ ...wrapperSx, ...sx }}
    >
      {elements.map((segment, index) => {
        const animateKeyframes = buildKeyframes(fromSnapshot, toSnapshots);

        const spanTransition: Transition = {
          duration: totalDuration,
          times,
          delay: (index * delay) / 1000,
          ease: easing,
        };

        return (
          <motion.span
            key={index}
            initial={fromSnapshot}
            animate={inView ? animateKeyframes : fromSnapshot}
            transition={spanTransition}
            onAnimationComplete={
              index === elements.length - 1 ? onAnimationComplete : undefined
            }
            style={{
              display: 'inline-block',
              willChange: 'transform, filter, opacity',
            }}
          >
            {segment === ' ' ? '\u00A0' : segment}
            {animateBy === 'words' && index < elements.length - 1 && '\u00A0'}
          </motion.span>
        );
      })}
    </Box>
  );
}
