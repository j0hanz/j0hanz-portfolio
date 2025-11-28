import { useRef } from 'react';

import { Box } from '@mui/material';
import { motion } from 'motion/react';

import { textRevealVariants } from '@/config/motion';
import type { ElementRef, TextRevealProps } from '@/config/types';
import { useAnimationConfig, useInView, useReducedMotion } from '@/hooks';

const wrapperSx = { display: 'flex', flexWrap: 'wrap' } as const;
const wordSx = { marginRight: '0.25em', display: 'inline-block' } as const;
const charSx = { display: 'inline-block' } as const;

// Character animation variants for staggered reveal
const charVariants = {
  hidden: {
    opacity: 0,
    y: 20,
    rotateX: -15,
    filter: 'blur(4px)',
  },
  visible: {
    opacity: 1,
    y: 0,
    rotateX: 0,
    filter: 'blur(0px)',
  },
};

// Container variant for stagger orchestration
const containerVariants = {
  hidden: { opacity: 1 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.025,
      delayChildren: 0,
    },
  },
};

interface TextRevealExtendedProps extends TextRevealProps {
  // 'word' = word-by-word (default), 'char' = character-by-character
  splitBy?: 'word' | 'char';
}

// Reveals text word-by-word or character-by-character with stagger animation
export function TextReveal({
  text,
  className,
  delay = 0,
  duration = 0.5,
  as: Component = 'h2',
  style,
  sx,
  splitBy = 'word',
}: TextRevealExtendedProps) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref as ElementRef, {
    amount: 0.5,
    once: true,
  });
  const prefersReducedMotion = useReducedMotion();
  const { getTransition } = useAnimationConfig();

  if (prefersReducedMotion) {
    return (
      <Box component={Component} className={className} style={style} sx={sx}>
        {text}
      </Box>
    );
  }

  // Character-by-character animation
  if (splitBy === 'char') {
    const words = text.split(' ');

    return (
      <Box
        component={Component}
        ref={ref}
        className={className}
        style={style}
        sx={{ ...wrapperSx, ...sx }}
        aria-label={text}
      >
        <motion.span
          variants={{
            ...containerVariants,
            visible: {
              ...containerVariants.visible,
              transition: {
                ...containerVariants.visible.transition,
                delayChildren: delay,
              },
            },
          }}
          initial="hidden"
          animate={isInView ? 'visible' : 'hidden'}
          style={{ display: 'flex', flexWrap: 'wrap' }}
        >
          {words.map((word, wordIndex) => (
            <Box
              component="span"
              key={`word-${wordIndex}`}
              sx={wordSx}
              aria-hidden="true"
            >
              {[...word].map((char, charIndex) => (
                <Box
                  component={motion.span}
                  key={`char-${wordIndex}-${charIndex}`}
                  sx={charSx}
                  variants={charVariants}
                  transition={getTransition('springSmooth', { duration })}
                >
                  {char}
                </Box>
              ))}
            </Box>
          ))}
        </motion.span>
      </Box>
    );
  }

  // Word-by-word animation (default)
  const container = {
    hidden: textRevealVariants.container.hidden,
    visible: textRevealVariants.container.visible(delay),
  };

  const child = {
    visible: textRevealVariants.child.visible(duration),
    hidden: textRevealVariants.child.hidden(duration),
  };

  return (
    <Box
      component={Component}
      ref={ref}
      className={className}
      style={style}
      sx={{ ...wrapperSx, ...sx }}
    >
      <motion.span
        variants={container}
        initial="hidden"
        animate={isInView ? 'visible' : 'hidden'}
        style={{ display: 'flex', flexWrap: 'wrap' }}
      >
        {text.split(' ').map((word, wordIndex) => (
          <Box
            component={motion.span}
            key={`${word}-${wordIndex}`}
            sx={wordSx}
            variants={child}
          >
            {word}
          </Box>
        ))}
      </motion.span>
    </Box>
  );
}
