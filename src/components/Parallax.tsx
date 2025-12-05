import { useRef } from 'react';

import { Box } from '@mui/material';
import {
  motion,
  type MotionProps,
  useScroll,
  useTransform,
} from 'motion/react';

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
  sx,
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
      <Box ref={ref} className={className} sx={sx} style={style}>
        {children}
      </Box>
    );
  }

  return (
    <Box
      component={motion.div}
      ref={ref}
      className={className}
      sx={{
        ...sx,
        willChange: prefersReducedMotion ? 'auto' : 'transform',
      }}
      style={{ y, ...style } as MotionProps['style']}
    >
      {children}
    </Box>
  );
}
