import {
  type ElementType,
  type JSX,
  type ReactNode,
  useEffect,
  useRef,
  useState,
} from 'react';

import { Box, type SxProps, type Theme } from '@mui/material';
import type { SystemStyleObject } from '@mui/system';
import { animate } from 'motion/react';

import { useReducedMotion } from '@/hooks';

interface TextTypeProps {
  /** Text string or array of strings to type */
  text: string | string[];
  /** Element type to render as */
  as?: ElementType;
  /** Typing speed in milliseconds per character */
  typingSpeed?: number;
  /** Initial delay before starting in milliseconds */
  initialDelay?: number;
  /** Pause duration between sentences in milliseconds */
  pauseDuration?: number;
  /** Deleting speed in milliseconds per character */
  deletingSpeed?: number;
  /** Loop through text array */
  loop?: boolean;
  /** Show blinking cursor */
  showCursor?: boolean;
  /** Hide cursor while typing */
  hideCursorWhileTyping?: boolean;
  /** Custom cursor character */
  cursorCharacter?: ReactNode;
  /** Cursor blink duration in seconds */
  cursorBlinkDuration?: number;
  /** MUI sx prop */
  sx?: SxProps<Theme>;
  /** Cursor sx prop */
  cursorSx?: SxProps<Theme>;
  /** Additional className */
  className?: string;
  /** Callback when a sentence completes */
  onSentenceComplete?: (sentence: string, index: number) => void;
}

// Base styles
const containerSx: SystemStyleObject<Theme> = {
  display: 'inline-block',
  whiteSpace: 'pre-wrap',
};

const cursorBaseSx: SystemStyleObject<Theme> = {
  ml: 0.25,
  display: 'inline-block',
};

/**
 * TextType - Typewriter effect with blinking cursor
 *
 * Ported from ReactBits TextType component.
 * Uses motion/react for cursor animation, native timeouts for typing.
 *
 * @example
 * <TextType text="Hello World" />
 * <TextType text={["First", "Second", "Third"]} loop typingSpeed={80} />
 */
export function TextType({
  text,
  as: Component = 'span',
  typingSpeed = 50,
  initialDelay = 0,
  pauseDuration = 2000,
  deletingSpeed = 30,
  loop = true,
  showCursor = true,
  hideCursorWhileTyping = false,
  cursorCharacter = '|',
  cursorBlinkDuration = 0.5,
  sx,
  cursorSx,
  className,
  onSentenceComplete,
}: TextTypeProps): JSX.Element {
  const prefersReducedMotion = useReducedMotion();
  const cursorRef = useRef<HTMLSpanElement>(null);

  const textArray = Array.isArray(text) ? text : [text];

  // Initialize state - show full text if reduced motion
  const [displayedText, setDisplayedText] = useState(() =>
    prefersReducedMotion ? textArray[0] : ''
  );
  const [currentCharIndex, setCurrentCharIndex] = useState(() =>
    prefersReducedMotion ? textArray[0].length : 0
  );
  const [isDeleting, setIsDeleting] = useState(false);
  const [currentTextIndex, setCurrentTextIndex] = useState(0);

  // Cursor blink animation using motion/react
  useEffect(() => {
    if (!showCursor || !cursorRef.current || prefersReducedMotion) return;

    const controls = animate(
      cursorRef.current,
      { opacity: [1, 0, 1] },
      {
        duration: cursorBlinkDuration * 2,
        repeat: Infinity,
        ease: 'easeInOut',
      }
    );

    return () => controls.stop();
  }, [showCursor, cursorBlinkDuration, prefersReducedMotion]);

  // Typing animation logic
  useEffect(() => {
    // Skip animation for reduced motion
    if (prefersReducedMotion) return;

    const currentTextArray = Array.isArray(text) ? text : [text];
    let timeout: ReturnType<typeof setTimeout>;
    const currentText = currentTextArray[currentTextIndex];

    const executeTyping = () => {
      if (isDeleting) {
        if (displayedText === '') {
          setIsDeleting(false);
          if (currentTextIndex === currentTextArray.length - 1 && !loop) return;

          onSentenceComplete?.(
            currentTextArray[currentTextIndex],
            currentTextIndex
          );
          setCurrentTextIndex((prev) => (prev + 1) % currentTextArray.length);
          setCurrentCharIndex(0);
        } else {
          timeout = setTimeout(() => {
            setDisplayedText((prev) => prev.slice(0, -1));
          }, deletingSpeed);
        }
      } else {
        if (currentCharIndex < currentText.length) {
          timeout = setTimeout(() => {
            setDisplayedText((prev) => prev + currentText[currentCharIndex]);
            setCurrentCharIndex((prev) => prev + 1);
          }, typingSpeed);
        } else if (currentTextArray.length > 1 || loop) {
          if (!loop && currentTextIndex === currentTextArray.length - 1) return;
          timeout = setTimeout(() => {
            setIsDeleting(true);
          }, pauseDuration);
        }
      }
    };

    if (currentCharIndex === 0 && !isDeleting && displayedText === '') {
      timeout = setTimeout(executeTyping, initialDelay);
    } else {
      executeTyping();
    }

    return () => clearTimeout(timeout);
  }, [
    currentCharIndex,
    displayedText,
    isDeleting,
    typingSpeed,
    deletingSpeed,
    pauseDuration,
    text,
    currentTextIndex,
    loop,
    initialDelay,
    onSentenceComplete,
    prefersReducedMotion,
  ]);

  const shouldHideCursor =
    hideCursorWhileTyping &&
    (currentCharIndex < textArray[currentTextIndex].length || isDeleting);

  return (
    <Box
      component={Component}
      className={className}
      sx={{ ...containerSx, ...(sx as object) }}
    >
      <Box component="span">{displayedText}</Box>
      {showCursor && !prefersReducedMotion && (
        <Box
          component="span"
          ref={cursorRef}
          sx={{
            ...cursorBaseSx,
            ...(cursorSx as object),
            visibility: shouldHideCursor ? 'hidden' : 'visible',
          }}
        >
          {cursorCharacter}
        </Box>
      )}
    </Box>
  );
}
