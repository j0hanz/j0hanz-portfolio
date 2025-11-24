import { useRef } from 'react';

import { motion, useScroll, useTransform } from 'motion/react';

import type { ParallaxProps } from '@/config/types';
import { useReducedMotion } from '@/hooks';

// Creates parallax scrolling effect with hardware-accelerated transforms
// Uses useTransform for 120fps updates without React re-renders
export function Parallax({
  children,
  offset = 50,
  className,
  style,
}: ParallaxProps) {
  const ref = useRef(null);
  const prefersReducedMotion = useReducedMotion();
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start end', 'end start'],
  });

  // useTransform provides hardware-accelerated animations at 120fps
  const y = useTransform(scrollYProgress, [0, 1], [-offset, offset]);

  if (prefersReducedMotion) {
    return (
      <div ref={ref} className={className} style={style}>
        {children}
      </div>
    );
  }

  return (
    <motion.div
      ref={ref}
      className={className}
      style={{ y, ...style, willChange: 'transform' }}
    >
      {children}
    </motion.div>
  );
}
