import type { HTMLAttributes, ReactNode } from 'react';
import { useEffect, useEffectEvent, useLayoutEffect, useRef } from 'react';

import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

type FadeContentProps = Readonly<
  HTMLAttributes<HTMLDivElement> & {
    children: ReactNode;
    container?: Element | string | null;
    blur?: boolean;
    duration?: number;
    ease?: string;
    delay?: number;
    threshold?: number;
    initialOpacity?: number;
    disappearAfter?: number;
    disappearDuration?: number;
    disappearEase?: string;
    onComplete?: () => void;
    onDisappearanceComplete?: () => void;
  }
>;

export function FadeContent({
  children,
  container,
  duration = 1000,
  ease = 'power2.out',
  delay = 0,
  threshold = 0,
  initialOpacity = 0,
  disappearAfter = 0,
  disappearDuration = 0.5,
  disappearEase = 'power2.in',
  onComplete,
  onDisappearanceComplete,
  className = '',
  style,
  ...props
}: FadeContentProps) {
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
      gsap.set(el, { autoAlpha: 1, filter: 'none', visibility: 'visible' });
      return;
    }

    gsap.set(el, {
      autoAlpha: initialOpacity,
      willChange: 'opacity, filter, transform',
    });
  }, [initialOpacity]);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    // Respect reduced motion preferences
    const prefersReducedMotion = window.matchMedia(
      '(prefers-reduced-motion: reduce)'
    ).matches;
    if (prefersReducedMotion) {
      handleComplete();
      return;
    }

    let scrollerTarget: Element | string | null =
      container || document.getElementById('snap-main-container') || null;

    if (typeof scrollerTarget === 'string') {
      scrollerTarget = document.querySelector(scrollerTarget);
    }

    const startPct = (1 - threshold) * 100;
    const getSeconds = (val: number) => (val > 10 ? val / 1000 : val);

    const tl = gsap.timeline({
      paused: true,
      delay: getSeconds(delay),
      onComplete: () => {
        handleComplete();
        if (disappearAfter > 0) {
          gsap.to(el, {
            autoAlpha: initialOpacity,

            delay: getSeconds(disappearAfter),
            duration: getSeconds(disappearDuration),
            ease: disappearEase,
            onComplete: handleDisappearanceComplete,
          });
        }
      },
    });

    tl.to(el, {
      autoAlpha: 1,

      duration: getSeconds(duration),
      ease: ease,
    });

    const st = ScrollTrigger.create({
      trigger: el,
      scroller: scrollerTarget || window,
      start: `top ${startPct}%`,
      once: true,
      onEnter: () => tl.play(),
    });

    return () => {
      st.kill();
      tl.kill();
      gsap.killTweensOf(el);
    };
  }, [
    container,
    duration,
    ease,
    delay,
    threshold,
    initialOpacity,
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
