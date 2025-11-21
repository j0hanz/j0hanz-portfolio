import { useRef } from 'react';

import { motion, useMotionValue, useSpring } from 'motion/react';

import { useReducedMotion } from '@/hooks';

interface MagneticWrapperProps {
  children: React.ReactNode;
  strength?: number;
  disabled?: boolean;
  className?: string;
  style?: React.CSSProperties;
}

/**
 * Creates a magnetic cursor effect on hover
 * Uses hardware-accelerated transforms for smooth performance
 */
export function MagneticWrapper({
  children,
  strength = 0.2,
  disabled = false,
  className,
  style,
}: MagneticWrapperProps) {
  const ref = useRef<HTMLDivElement>(null);
  const prefersReducedMotion = useReducedMotion();

  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const springConfig = { damping: 20, stiffness: 200, mass: 0.5 };
  const springX = useSpring(x, springConfig);
  const springY = useSpring(y, springConfig);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (disabled || prefersReducedMotion || !ref.current) return;

    const { clientX, clientY } = e;
    const { height, width, left, top } = ref.current.getBoundingClientRect();

    const middleX = clientX - (left + width / 2);
    const middleY = clientY - (top + height / 2);

    x.set(middleX * strength);
    y.set(middleY * strength);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

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
        ...style,
      }}
      className={className}
    >
      {children}
    </motion.div>
  );
}
