import { useRef } from 'react';

import { useMotionValueEvent, useScroll, UseScrollOptions } from 'motion/react';

import { SequenceAnimator } from '@/config/types';

import useEventCallback from './useEventCallback';
import { useAnimationConfig, useAnimationSequence } from './useMotions';

interface UseScrollAnimationOptions {
  /**
   * Offset for the scroll intersection.
   * @default ['start 0.85', 'end 0.2']
   */
  offset?: UseScrollOptions['offset'];
  /**
   * Threshold value of scroll progress to trigger the animation.
   * @default 0.2
   */
  triggerThreshold?: number;
}

/**
 * Triggers an animation sequence when a section is scrolled into view.
 *
 * @param sectionRef - Ref to the section element to track.
 * @param animationCallback - Callback function containing the animation sequence.
 * @param options - Configuration options.
 * @returns The scroll progress motion value.
 */
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
