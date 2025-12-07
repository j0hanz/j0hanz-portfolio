import { useEffect, useRef } from 'react';

import { useMotionValue, useSpring } from 'motion/react';

import type { MagnetMotionProps } from '@/config/types';

// Default spring configuration for cursor magnet effect
const DEFAULT_SPRING_CONFIG = { stiffness: 200, damping: 24, mass: 0.8 } as const;

// Default strength multiplier for cursor offset
const DEFAULT_STRENGTH = 0.15;

export interface CursorMagnetOptions {
  // Multiplier for cursor offset (0-1 range recommended)
  strength?: number;
  // Spring physics configuration
  springConfig?: { stiffness: number; damping: number; mass: number };
}

export function useCursorMagnet(
  disabled: boolean,
  options?: CursorMagnetOptions
): MagnetMotionProps {
  const { strength = DEFAULT_STRENGTH, springConfig = DEFAULT_SPRING_CONFIG } =
    options ?? {};

  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const springX = useSpring(x, springConfig);
  const springY = useSpring(y, springConfig);
  const boundsRef = useRef<{ centerX: number; centerY: number } | null>(null);

  const resolveBounds = (
    element: HTMLElement
  ): { centerX: number; centerY: number } | null => {
    if (boundsRef.current) {
      return boundsRef.current;
    }

    const rect = element.getBoundingClientRect();
    const bounds = {
      centerX: rect.left + rect.width / 2,
      centerY: rect.top + rect.height / 2,
    };
    boundsRef.current = bounds;
    return bounds;
  };

  const reset = () => {
    x.set(0);
    y.set(0);
    boundsRef.current = null;
  };

  const handlePointerMove = (event: React.PointerEvent<HTMLDivElement>) => {
    if (disabled || event.pointerType !== 'mouse') return;

    const bounds = resolveBounds(event.currentTarget);
    if (!bounds) return;

    x.set((event.clientX - bounds.centerX) * strength);
    y.set((event.clientY - bounds.centerY) * strength);
  };

  const handlePointerLeave = reset;

  useEffect(() => {
    if (disabled || typeof window === 'undefined') return;

    const handleResize = () => {
      boundsRef.current = null;
    };

    window.addEventListener('resize', handleResize);
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, [disabled]);

  if (disabled) return {};

  return {
    style: { x: springX, y: springY },
    onPointerMove: handlePointerMove,
    onPointerLeave: handlePointerLeave,
  };
}
