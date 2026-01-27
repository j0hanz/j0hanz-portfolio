import { useRef } from 'react';

import { Box } from '@mui/material';
import { m, type MotionProps, useMotionValue, useSpring } from 'motion/react';

import type { MagneticWrapperProps } from '@/config/types';
import { useBatchedDomUpdate, useReducedMotion } from '@/hooks';

// Creates magnetic cursor effect on hover (hardware-accelerated)
export function MagneticWrapper({
  children,
  strength = 0.15,
  disabled = false,
  className,
  style,
  sx,
}: Readonly<MagneticWrapperProps>) {
  const ref = useRef<HTMLDivElement>(null);
  const prefersReducedMotion = useReducedMotion();
  const pendingPointRef = useRef<{ clientX: number; clientY: number } | null>(
    null
  );
  const isScheduledRef = useRef(false);
  const { scheduleRead, scheduleRender } = useBatchedDomUpdate();

  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const springConfig = { stiffness: 150, mass: 0.3, damping: 15 };
  const springX = useSpring(x, springConfig);
  const springY = useSpring(y, springConfig);

  const scheduleUpdate = () => {
    if (isScheduledRef.current) return;
    isScheduledRef.current = true;

    // Use Motion's frame utility for optimal batching
    scheduleRead(() => {
      const point = pendingPointRef.current;
      const target = ref.current;
      if (!point || !target) {
        isScheduledRef.current = false;
        return;
      }

      const rect = target.getBoundingClientRect();
      const dx = (point.clientX - (rect.left + rect.width / 2)) * strength;
      const dy = (point.clientY - (rect.top + rect.height / 2)) * strength;

      // Schedule motion value updates in render phase
      scheduleRender(() => {
        x.set(dx);
        y.set(dy);
        pendingPointRef.current = null;
        isScheduledRef.current = false;
      });
    });
  };

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (disabled || prefersReducedMotion || !ref.current) return;

    pendingPointRef.current = {
      clientX: e.clientX,
      clientY: e.clientY,
    };
    scheduleUpdate();
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
    pendingPointRef.current = null;
    isScheduledRef.current = false;
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
      component={m.div}
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
