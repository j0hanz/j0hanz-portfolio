import { useRef } from 'react';

import { useMotionValueEvent, useScroll, UseScrollOptions } from 'motion/react';

import { SequenceAnimator } from '@/config/types';

import useEventCallback from './useEventCallback';
import { useAnimationConfig, useAnimationSequence } from './useMotions';

interface UseScrollAnimationOptions {
  // Offset for scroll intersection (default: ['start 0.85', 'end 0.2'])
  offset?: UseScrollOptions['offset'];
  // Threshold to trigger animation (default: 0.2)
  triggerThreshold?: number;
}

// Triggers animation sequence when section scrolls into view
export function useScrollAnimation(
  sectionRef: React.RefObject<HTMLElement | null>,
  animationCallback: (animate: SequenceAnimator) => Promise<void>,
  options: UseScrollAnimationOptions = {}
) {
  const { offset = ['start 0.85', 'end 0.2'], triggerThreshold = 0.2 } =
    options;
  const { prefersReducedMotion } = useAnimationConfig();
  const { runSequence } = useAnimationSequence();
  const hasPlayed = useRef(false);

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset,
  });

  const handleScrollChange = useEventCallback((value: number) => {
    if (
      prefersReducedMotion ||
      hasPlayed.current ||
      value <= triggerThreshold
    ) {
      return;
    }

    hasPlayed.current = true;
    runSequence(animationCallback);
  });

  useMotionValueEvent(scrollYProgress, 'change', handleScrollChange);

  return { scrollYProgress, hasPlayed };
}

export default useScrollAnimation;
