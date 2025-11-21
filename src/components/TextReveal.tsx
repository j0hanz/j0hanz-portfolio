import { RefObject, useRef } from 'react';

import { motion, Variants } from 'motion/react';

import { useInView, useReducedMotion } from '@/hooks';

interface TextRevealProps {
  text: string;
  className?: string;
  delay?: number;
  duration?: number;
  as?: React.ElementType;
  style?: React.CSSProperties;
}

/**
 * Reveals text character by character with stagger animation
 */
export function TextReveal({
  text,
  className,
  delay = 0,
  duration = 0.5,
  as: Component = 'h2',
  style,
}: TextRevealProps) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref as RefObject<Element>, {
    amount: 0.5,
    once: true,
  });
  const prefersReducedMotion = useReducedMotion();

  const container: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.025, delayChildren: delay },
    },
  };

  const child: Variants = {
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        type: 'spring',
        damping: 12,
        stiffness: 120,
        duration,
      },
    },
    hidden: {
      opacity: 0,
      y: 16,
      transition: {
        type: 'spring',
        damping: 12,
        stiffness: 120,
        duration,
      },
    },
  };

  if (prefersReducedMotion) {
    return (
      <Component className={className} style={style}>
        {text}
      </Component>
    );
  }

  return (
    <Component
      ref={ref}
      className={className}
      style={{ display: 'flex', flexWrap: 'wrap', ...style }}
    >
      <motion.span
        style={{ display: 'flex', flexWrap: 'wrap' }}
        variants={container}
        initial="hidden"
        animate={isInView ? 'visible' : 'hidden'}
      >
        {text.split(' ').map((word, index) => (
          <motion.span
            key={index}
            style={{ marginRight: '0.25em', display: 'inline-block' }}
            variants={child}
          >
            {word}
          </motion.span>
        ))}
      </motion.span>
    </Component>
  );
}
