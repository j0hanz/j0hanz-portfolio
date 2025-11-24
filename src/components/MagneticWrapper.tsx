import { useEffect, useRef } from 'react';

import { motion, useMotionValue, useSpring } from 'motion/react';

import type { MagneticWrapperProps } from '@/config/types';
import { useReducedMotion } from '@/hooks';

// Creates magnetic cursor effect on hover (hardware-accelerated)
export function MagneticWrapper({
  children,
  strength = 0.2,
  disabled = false,
  className,
  style,
}: MagneticWrapperProps) {
  const ref = useRef<HTMLDivElement>(null);
  const prefersReducedMotion = useReducedMotion();
  const frameRef = useRef<number | null>(null);
  const pendingPoint = useRef<{ clientX: number; clientY: number } | null>(
    null
  );

  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const springConfig = { damping: 20, stiffness: 200, mass: 0.5 };
  const springX = useSpring(x, springConfig);
  const springY = useSpring(y, springConfig);

  const scheduleUpdate = () => {
    if (frameRef.current !== null) return;

    frameRef.current = window.requestAnimationFrame(() => {
      frameRef.current = null;
      const point = pendingPoint.current;
      pendingPoint.current = null;

      const target = ref.current;
      if (!point || !target) {
        return;
      }

      const { clientX, clientY } = point;
      const { height, width, left, top } = target.getBoundingClientRect();
      const middleX = clientX - (left + width / 2);
      const middleY = clientY - (top + height / 2);

      x.set(middleX * strength);
      y.set(middleY * strength);
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
    if (frameRef.current !== null) {
      cancelAnimationFrame(frameRef.current);
      frameRef.current = null;
    }
  };

  useEffect(() => {
    return () => {
      if (frameRef.current !== null) {
        cancelAnimationFrame(frameRef.current);
      }
    };
  }, []);

  if (disabled || prefersReducedMotion) {
    return (
      <div className={className} style={style}>
        {children}
      </div>
    );
  }

  return (
    <motion.div
      ref={ref}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{
        x: springX,
        y: springY,
        display: 'inline-block',
      }}
      className={className}
    >
      {children}
    </motion.div>
  );
}
