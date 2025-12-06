import type { ElementType, JSX } from 'react';
import { useRef } from 'react';

import { Box, type SxProps, type Theme } from '@mui/material';
import { motion, type Transition, type Variants } from 'motion/react';

import type { ElementRef } from '@/config/types';
import { useAnimationConfig, useInView, useReducedMotion } from '@/hooks';

// Default animation variants
const DEFAULT_CHAR_FROM = {
  opacity: 0,
  y: 40,
  filter: 'blur(4px)',
};

const DEFAULT_CHAR_TO = {
  opacity: 1,
  y: 0,
  filter: 'blur(0px)',
};

const DEFAULT_WORD_FROM = {
  opacity: 0,
  y: 24,
};

const DEFAULT_WORD_TO = {
  opacity: 1,
  y: 0,
};

// Container orchestrates stagger timing
const createContainerVariants = (
  staggerDelay: number,
  initialDelay: number
): Variants => ({
  hidden: { opacity: 1 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: staggerDelay,
      delayChildren: initialDelay,
    },
  },
});

// Props interface matching ReactBits API
interface SplitTextProps {
  /** Text content to animate */
  text: string;
  /** HTML tag to render */
  as?: ElementType;
  /** Split by 'chars' or 'words' */
  splitBy?: 'chars' | 'words';
  /** Delay before animation starts (seconds) */
  delay?: number;
  /** Stagger delay between elements (seconds) */
  stagger?: number;
  /** Animation duration for each element */
  duration?: number;
  /** Custom animation from state */
  from?: Record<string, string | number>;
  /** Custom animation to state */
  to?: Record<string, string | number>;
  /** Viewport threshold for triggering (0-1) */
  threshold?: number;
  /** Only animate once */
  once?: boolean;
  /** MUI sx prop for styling */
  sx?: SxProps<Theme>;
  /** Additional className */
  className?: string;
  /** Callback when animation completes */
  onAnimationComplete?: () => void;
}

// Internal wrapper styles
const wrapperSx = { display: 'flex', flexWrap: 'wrap' } as const;
const wordSx = { marginRight: '0.25em', display: 'inline-block' } as const;
const charSx = { display: 'inline-block' } as const;

/**
 * SplitText - Animated text reveal component
 *
 * Inspired by ReactBits SplitText but uses Framer Motion (motion/react)
 * instead of GSAP SplitText plugin for better bundle size and licensing.
 *
 * @example
 * <SplitText text="Hello World" splitBy="chars" />
 * <SplitText text="Welcome" as="h1" sx={{ fontSize: '3rem' }} />
 * <SplitText
 *   text="Custom"
 *   from={{ opacity: 0, y: 50 }}
 *   to={{ opacity: 1, y: 0 }}
 * />
 */
export function SplitText({
  text,
  as: Component = 'p',
  splitBy = 'chars',
  delay = 0,
  stagger = 0.025,
  duration = 0.5,
  from,
  to,
  threshold = 0.5,
  once = true,
  sx,
  className,
  onAnimationComplete,
}: SplitTextProps): JSX.Element {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref as ElementRef, {
    amount: threshold,
    once,
  });
  const prefersReducedMotion = useReducedMotion();
  const { getTransition } = useAnimationConfig();

  // Select default animation states based on split type
  const defaultFrom =
    splitBy === 'chars' ? DEFAULT_CHAR_FROM : DEFAULT_WORD_FROM;
  const defaultTo = splitBy === 'chars' ? DEFAULT_CHAR_TO : DEFAULT_WORD_TO;

  // Use custom or default animation states
  const fromState = from ?? defaultFrom;
  const toState = to ?? defaultTo;

  // Build variants
  const itemVariants: Variants = {
    hidden: fromState,
    visible: toState,
  };

  const containerVariants = createContainerVariants(stagger, delay);

  const transition: Transition = getTransition('springSmooth', { duration });

  // Split text into words
  const words = text.split(' ');

  // Track completion
  const lastWordIndex = words.length - 1;
  const getLastCharIndex = (word: string) => word.length - 1;

  // Reduced motion fallback - render static text
  if (prefersReducedMotion) {
    return (
      <Box component={Component} className={className} sx={sx}>
        {text}
      </Box>
    );
  }

  return (
    <Box
      component={Component}
      ref={ref}
      className={className}
      sx={{ ...wrapperSx, ...sx }}
      aria-label={text}
    >
      <Box
        component={motion.span}
        variants={containerVariants}
        initial="hidden"
        animate={isInView ? 'visible' : 'hidden'}
        sx={wrapperSx}
      >
        {splitBy === 'chars'
          ? // Character-by-character animation
            words.map((word, wordIndex) => (
              <Box
                component="span"
                key={`word-${wordIndex}`}
                sx={wordSx}
                aria-hidden="true"
              >
                {[...word].map((char, charIndex) => {
                  const isLast =
                    wordIndex === lastWordIndex &&
                    charIndex === getLastCharIndex(word);
                  return (
                    <Box
                      component={motion.span}
                      key={`char-${wordIndex}-${charIndex}`}
                      sx={charSx}
                      variants={itemVariants}
                      transition={transition}
                      onAnimationComplete={
                        isLast ? onAnimationComplete : undefined
                      }
                    >
                      {char}
                    </Box>
                  );
                })}
              </Box>
            ))
          : // Word-by-word animation
            words.map((word, wordIndex) => {
              const isLast = wordIndex === lastWordIndex;
              return (
                <Box
                  component={motion.span}
                  key={`word-${wordIndex}`}
                  sx={wordSx}
                  variants={itemVariants}
                  transition={transition}
                  onAnimationComplete={isLast ? onAnimationComplete : undefined}
                >
                  {word}
                </Box>
              );
            })}
      </Box>
    </Box>
  );
}
