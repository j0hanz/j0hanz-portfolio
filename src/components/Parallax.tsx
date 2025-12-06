import { useRef } from 'react';

import { Box } from '@mui/material';
import { motion, useScroll, useTransform } from 'motion/react';

import type { ParallaxProps } from '@/config/types';
import { useMobileBreakpoint, useReducedMotion } from '@/hooks';

// Creates parallax scrolling effect with hardware-accelerated transforms
// Disabled on mobile for better performance and scroll behavior
export function Parallax({
  children,
  offset = 50,
  className,
  style,
  sx,
}: ParallaxProps) {
  const ref = useRef(null);
  const prefersReducedMotion = useReducedMotion();
  const isMobile = useMobileBreakpoint('md');
  const disabled = prefersReducedMotion || isMobile;
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start end', 'end start'],
  });

  const y = useTransform(scrollYProgress, [0, 1], [-offset, offset]);

  if (disabled) {
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
      sx={{ ...sx, willChange: 'transform' }}
      // Motion requires style prop for motion values (not sx)
      style={{ y, ...style }}
    >
      {children}
    </Box>
  );
}
