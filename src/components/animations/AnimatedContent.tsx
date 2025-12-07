import type { HTMLAttributes, ReactNode } from 'react';
import { useEffect, useEffectEvent, useLayoutEffect, useRef } from 'react';

import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

interface AnimatedContentProps extends HTMLAttributes<HTMLDivElement> {
  children: ReactNode;
  container?: Element | string | null;
  distance?: number;
  direction?: 'vertical' | 'horizontal';
  reverse?: boolean;
  duration?: number;
  ease?: string;
  initialOpacity?: number;
  animateOpacity?: boolean;
  scale?: number;
  threshold?: number;
  delay?: number;
  disappearAfter?: number;
  disappearDuration?: number;
  disappearEase?: string;
  onComplete?: () => void;
  onDisappearanceComplete?: () => void;
}

export function AnimatedContent({
  children,
  container,
  distance = 200,
  direction = 'vertical',
  reverse = false,
  duration = 0.8,
  ease = 'power2.out',
  initialOpacity = 0,
  animateOpacity = true,
  scale = 1,
  threshold = 0.1,
  delay = 0.15,
  disappearAfter = 0,
  disappearDuration = 0.5,
  disappearEase = 'power2.in',
  onComplete,
  onDisappearanceComplete,
  className = '',
  style,
  ...props
}: AnimatedContentProps) {
  const ref = useRef<HTMLDivElement>(null);

  // Wrap callbacks in useEffectEvent to prevent Effect re-runs when callbacks change
  const handleComplete = useEffectEvent(() => onComplete?.());
  const handleDisappearanceComplete = useEffectEvent(() =>
    onDisappearanceComplete?.()
  );

  // Set initial GSAP state synchronously before paint to prevent flash
  useLayoutEffect(() => {
    const el = ref.current;
    if (!el) return;

    const prefersReducedMotion = window.matchMedia(
      '(prefers-reduced-motion: reduce)'
    ).matches;

    if (prefersReducedMotion) {
      gsap.set(el, { opacity: 1, visibility: 'visible', x: 0, y: 0, scale: 1 });
      return;
    }

    const axis = direction === 'horizontal' ? 'x' : 'y';
    const offset = reverse ? -distance : distance;

    gsap.set(el, {
      [axis]: offset,
      scale,
      opacity: animateOpacity ? initialOpacity : 1,
      visibility: 'visible',
    });
  }, [direction, reverse, distance, scale, animateOpacity, initialOpacity]);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    // Respect reduced motion preferences (WCAG 2.1)
    const prefersReducedMotion = window.matchMedia(
      '(prefers-reduced-motion: reduce)'
    ).matches;
    if (prefersReducedMotion) {
      handleComplete();
      return;
    }

    const axis = direction === 'horizontal' ? 'x' : 'y';

    // Create animation timeline
    const tl = gsap.timeline({
      paused: true,
      delay,
      onComplete: () => {
        handleComplete();

        if (disappearAfter > 0) {
          gsap.to(el, {
            [axis]: reverse ? distance : -distance,
            scale: 0.8,
            opacity: animateOpacity ? initialOpacity : 0,
            delay: disappearAfter,
            duration: disappearDuration,
            ease: disappearEase,
            onComplete: handleDisappearanceComplete,
          });
        }
      },
    });

    tl.to(el, {
      [axis]: 0,
      scale: 1,
      opacity: 1,
      duration,
      ease,
    });

    // Determine scroll container
    let scrollerTarget: Element | string | null =
      container || document.getElementById('snap-main-container') || null;

    if (typeof scrollerTarget === 'string') {
      scrollerTarget = document.querySelector(scrollerTarget);
    }

    // Use IntersectionObserver for full-page scroll (no scroller) or ScrollTrigger otherwise
    if (!scrollerTarget) {
      // No scrollable container - use IntersectionObserver to trigger on visibility
      const observer = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) {
            tl.play();
            observer.disconnect();
          }
        },
        { threshold, rootMargin: '0px' }
      );
      observer.observe(el);

      return () => {
        observer.disconnect();
        tl.kill();
        gsap.killTweensOf(el);
      };
    }

    // Traditional scrollable container - use ScrollTrigger
    const startPct = (1 - threshold) * 100;
    const st = ScrollTrigger.create({
      trigger: el,
      scroller: scrollerTarget,
      start: `top ${startPct}%`,
      once: true,
      onEnter: () => tl.play(),
    });

    return () => {
      st.kill();
      tl.kill();
    };
  }, [
    container,
    distance,
    direction,
    reverse,
    duration,
    ease,
    initialOpacity,
    animateOpacity,
    scale,
    threshold,
    delay,
    disappearAfter,
    disappearDuration,
    disappearEase,
  ]);

  return (
    <div
      ref={ref}
      className={className}
      style={{ visibility: 'hidden', ...style }}
      {...props}
    >
      {children}
    </div>
  );
}
