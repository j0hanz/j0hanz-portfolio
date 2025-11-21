import { useEffect, useRef } from 'react';

import { useMotionValue, useSpring } from 'motion/react';

import type { MagnetMotionProps } from '@/config/types';

export function useCursorMagnet(disabled: boolean): MagnetMotionProps {
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const springX = useSpring(x, { stiffness: 200, damping: 24, mass: 0.8 });
  const springY = useSpring(y, { stiffness: 200, damping: 24, mass: 0.8 });
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

    x.set((event.clientX - bounds.centerX) * 0.15);
    y.set((event.clientY - bounds.centerY) * 0.15);
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
