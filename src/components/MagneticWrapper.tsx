import { useRef } from 'react';

import { Box } from '@mui/material';
import {
  motion,
  type MotionProps,
  useMotionValue,
  useSpring,
} from 'motion/react';

import type { MagneticWrapperProps } from '@/config/types';
import { useBatchedDomUpdate, useReducedMotion } from '@/hooks';

// Creates magnetic cursor effect on hover (hardware-accelerated)
export function MagneticWrapper({
  children,
  disabled = false,
  className,
  style,
  sx,
}: MagneticWrapperProps) {
  const ref = useRef<HTMLDivElement>(null);
  const prefersReducedMotion = useReducedMotion();
  const pendingPoint = useRef<{ clientX: number; clientY: number } | null>(
    null
  );
  const isScheduled = useRef(false);
  const { scheduleRead, scheduleRender } = useBatchedDomUpdate();

  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const springConfig = { stiffness: 150, mass: 0.3, damping: 15 };
  const springX = useSpring(x, springConfig);
  const springY = useSpring(y, springConfig);

  const scheduleUpdate = () => {
    if (isScheduled.current) return;
    isScheduled.current = true;

    // Use Motion's frame utility for optimal batching
    scheduleRead(() => {
      const point = pendingPoint.current;
      const target = ref.current;
      if (!point || !target) {
        isScheduled.current = false;
        return;
      }

      // Schedule motion value updates in render phase
      scheduleRender(() => {
        pendingPoint.current = null;
        isScheduled.current = false;
      });
    });
  };

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (disabled || prefersReducedMotion || !ref.current) return;

    pendingPoint.current = {
      clientX: e.clientX,
      clientY: e.clientY,
    };
    scheduleUpdate();
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
    pendingPoint.current = null;
    isScheduled.current = false;
  };

  if (disabled || prefersReducedMotion) {
    return (
      <Box className={className} sx={sx} style={style}>
        {children}
      </Box>
    );
  }

  return (
    <Box
      component={motion.div}
      ref={ref}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className={className}
      sx={{
        display: 'inline-block',
        ...sx,
      }}
      style={
        { x: springX, y: springY, ...(style ?? {}) } as MotionProps['style']
      }
    >
      {children}
    </Box>
  );
}
