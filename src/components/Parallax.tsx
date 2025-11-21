import { useRef } from 'react';

import { motion, useScroll, useTransform } from 'motion/react';

import { useReducedMotion } from '@/hooks';

interface ParallaxProps {
  children: React.ReactNode;
  offset?: number;
  className?: string;
  style?: React.CSSProperties;
}

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
