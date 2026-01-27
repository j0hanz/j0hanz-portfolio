import type { CSSProperties } from 'react';
import { useEffect, useRef } from 'react';

import { useGSAP } from '@gsap/react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { SplitText as GSAPSplitText } from 'gsap/SplitText';

gsap.registerPlugin(ScrollTrigger, GSAPSplitText, useGSAP);

// Check if fonts are loaded synchronously (runs once at module load)
const getInitialFontsLoaded = () =>
  typeof document !== 'undefined' && document.fonts?.status === 'loaded';

type SplitTextProps = Readonly<{
  text: string;
  className?: string;
  delay?: number;
  duration?: number;
  ease?: string | ((t: number) => number);
  splitType?: 'chars' | 'words' | 'lines' | 'words, chars';
  from?: gsap.TweenVars;
  to?: gsap.TweenVars;
  threshold?: number;
  rootMargin?: string;
  textAlign?: CSSProperties['textAlign'];
  onLetterAnimationComplete?: () => void;
}>;

const DEFAULT_FROM: gsap.TweenVars = { opacity: 0, y: 20 };
const DEFAULT_TO: gsap.TweenVars = { opacity: 1, y: 0 };

export function SplitText({
  text,
  className = '',
  delay = 0,
  duration = 0.1,
  ease = 'power2.out',
  splitType = 'chars',
  from = DEFAULT_FROM,
  to = DEFAULT_TO,
  threshold = 0.1,
  rootMargin = '0px',
  textAlign = 'center',
  onLetterAnimationComplete,
}: SplitTextProps) {
  const ref = useRef<HTMLParagraphElement>(null);
  const animationCompletedRef = useRef(false);
  const fontsLoadedRef = useRef(getInitialFontsLoaded());
  const splitInstanceRef = useRef<GSAPSplitText | null>(null);

  // Subscribe to font loading if not already loaded
  useEffect(() => {
    if (fontsLoadedRef.current) return;

    let cancelled = false;
    document.fonts.ready.then(() => {
      if (!cancelled) {
        fontsLoadedRef.current = true;
        // Force re-render by triggering GSAP setup
        if (ref.current) {
          ref.current.dispatchEvent(new CustomEvent('fontsloaded'));
        }
      }
    });

    return () => {
      cancelled = true;
    };
  }, []);

  useGSAP(
    () => {
      if (!ref.current || !text || !fontsLoadedRef.current) return;

      const el = ref.current;

      if (splitInstanceRef.current) {
        try {
          splitInstanceRef.current.revert();
        } catch {
          // Silently ignore revert errors
        }
        splitInstanceRef.current = null;
      }

      const startPct = (1 - threshold) * 100;
      const marginMatch = /^(-?\d+(?:\.\d+)?)(px|em|rem|%)?$/.exec(
        rootMargin.toString()
      );
      const marginValue = marginMatch?.[1] ? parseFloat(marginMatch[1]) : 0;
      const marginUnit = marginMatch ? marginMatch[2] || 'px' : 'px';
      let sign = '';
      if (marginValue !== 0) {
        sign =
          marginValue < 0
            ? `-=${Math.abs(marginValue)}${marginUnit}`
            : `+=${marginValue}${marginUnit}`;
      }
      const start = `top ${startPct}%${sign}`;
      let targets: Element[] = [];
      const assignTargets = (self: GSAPSplitText) => {
        if (splitType.includes('chars') && self.chars.length)
          targets = self.chars;
        if (!targets.length && splitType.includes('words') && self.words.length)
          targets = self.words;
        if (!targets.length && splitType.includes('lines') && self.lines.length)
          targets = self.lines;
        if (!targets.length) targets = self.chars || self.words || self.lines;
      };
      const splitInstance = new GSAPSplitText(el, {
        type: splitType,
        smartWrap: true,
        autoSplit: splitType === 'lines',
        linesClass: 'split-line',
        wordsClass: 'split-word',
        charsClass: 'split-char',
        reduceWhiteSpace: false,
        onSplit: (self: GSAPSplitText) => {
          assignTargets(self);
          return gsap.fromTo(
            targets,
            { ...from },
            {
              ...to,
              duration,
              ease,
              stagger: delay / 1000,
              scrollTrigger: {
                trigger: el,
                start,
                once: true,
                fastScrollEnd: true,
                anticipatePin: 0.4,
              },
              onComplete: () => {
                animationCompletedRef.current = true;
                onLetterAnimationComplete?.();
              },
              willChange: 'transform, opacity',
              force3D: true,
            }
          );
        },
      });
      splitInstanceRef.current = splitInstance;
      return () => {
        ScrollTrigger.getAll().forEach((st) => {
          if (st.trigger === el) st.kill();
        });
        try {
          splitInstance.revert();
        } catch {
          // Silently ignore revert errors
        }
        splitInstanceRef.current = null;
      };
    },
    {
      dependencies: [
        text,
        delay,
        duration,
        ease,
        splitType,
        from,
        to,
        threshold,
        rootMargin,
        onLetterAnimationComplete,
      ],
      scope: ref,
    }
  );

  // Style is necessary for GSAP SplitText - cannot use sx prop
  // Note: willChange is set dynamically by GSAP during animation
  const splitTextStyle: CSSProperties = {
    textAlign,
    overflow: 'hidden',
    display: 'inline-block',
    whiteSpace: 'normal',
    wordWrap: 'break-word',
  };

  return (
    <span
      ref={ref}
      style={splitTextStyle}
      className={`split-parent ${className}`}
    >
      {text}
    </span>
  );
}
