import { useRef } from 'react';

import { motion, useScroll, useTransform } from 'motion/react';

import type { ParallaxProps } from '@/config/types';
import { useMobileBreakpoint, useReducedMotion } from '@/hooks';

// Creates parallax scrolling effect with hardware-accelerated transforms
// Uses useTransform for 120fps updates without React re-renders
// Disabled on mobile for better performance and scroll behavior
export function Parallax({
  children,
  offset = 50,
  className,
  style,
}: ParallaxProps) {
  const ref = useRef(null);
  const prefersReducedMotion = useReducedMotion() ?? false;
  const isMobile = useMobileBreakpoint('md');
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start end', 'end start'],
  });

  // useTransform provides hardware-accelerated animations at 120fps
  const y = useTransform(scrollYProgress, [0, 1], [-offset, offset]);

  // Disable parallax on mobile devices to prevent touch scroll conflicts
  if (prefersReducedMotion || isMobile) {
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
      style={{
        y,
        ...style,
        willChange: prefersReducedMotion ? 'auto' : 'transform',
      }}
    >
      {children}
    </motion.div>
  );
}
