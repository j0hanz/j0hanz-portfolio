import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

type ScrollContainer = Element | string | null;

const PREFERS_REDUCED_MOTION_QUERY = '(prefers-reduced-motion: reduce)';

const registerScrollTrigger = (() => {
  let registered = false;
  return () => {
    if (!registered) {
      gsap.registerPlugin(ScrollTrigger);
      registered = true;
    }
    return ScrollTrigger;
  };
})();

export const getScrollTrigger = () => registerScrollTrigger();

export const getPrefersReducedMotion = () =>
  typeof window !== 'undefined' &&
  window.matchMedia(PREFERS_REDUCED_MOTION_QUERY).matches;

export const resolveScrollContainer = (
  container?: ScrollContainer
): Element | null => {
  let scrollerTarget =
    container || document.getElementById('snap-main-container') || null;

  if (typeof scrollerTarget === 'string') {
    scrollerTarget = document.querySelector(scrollerTarget);
  }

  return scrollerTarget ?? null;
};
