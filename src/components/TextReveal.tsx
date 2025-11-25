import { useRef } from 'react';

import { Box } from '@mui/material';
import { motion } from 'motion/react';

import { textRevealVariants } from '@/config/motion';
import type { ElementRef, TextRevealProps } from '@/config/types';
import { useInView, useReducedMotion } from '@/hooks';

const wrapperSx = { display: 'flex', flexWrap: 'wrap' } as const;
const wordSx = { marginRight: '0.25em', display: 'inline-block' } as const;

// Reveals text character by character with stagger animation
export function TextReveal({
  text,
  className,
  delay = 0,
  duration = 0.5,
  as: Component = 'h2',
  style,
  sx,
}: TextRevealProps) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref as ElementRef, {
    amount: 0.5,
    once: true,
  });
  const prefersReducedMotion = useReducedMotion();

  const container = {
    hidden: textRevealVariants.container.hidden,
    visible: textRevealVariants.container.visible(delay),
  };

  const child = {
    visible: textRevealVariants.child.visible(duration),
    hidden: textRevealVariants.child.hidden(duration),
  };

  if (prefersReducedMotion) {
    return (
      <Box component={Component} className={className} style={style} sx={sx}>
        {text}
      </Box>
    );
  }

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
