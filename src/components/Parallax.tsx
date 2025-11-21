import { useRef } from 'react';

import { motion, useScroll, useTransform } from 'motion/react';

import type { ParallaxProps } from '@/config/types';
import { useReducedMotion } from '@/hooks';

/**
 * Creates a parallax scrolling effect
 * Uses useTransform for hardware-accelerated performance
 */
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

  // Use useTransform for better performance
  const y = useTransform(scrollYProgress, [0, 1], [-offset, offset]);

  if (prefersReducedMotion) {
    return (
      <div ref={ref} className={className} style={style}>
        {children}
      </div>
    );
  }

  return (
    <motion.div ref={ref} className={className} style={{ y, ...style }}>
      {children}
    </motion.div>
  );
}
