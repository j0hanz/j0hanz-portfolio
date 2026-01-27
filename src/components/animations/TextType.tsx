import { type ElementType, useEffect, useRef, useState } from 'react';

import { gsap } from 'gsap';

import { useEventCallback } from '@/hooks';

import './TextType.css';

type TextTypeProps = Readonly<{
  className?: string;
  showCursor?: boolean;
  hideCursorWhileTyping?: boolean;
  cursorCharacter?: string | React.ReactNode;
  cursorBlinkDuration?: number;
  cursorClassName?: string;
  text: string | string[];
  as?: ElementType;
  typingSpeed?: number;
  initialDelay?: number;
  pauseDuration?: number;
  deletingSpeed?: number;
  loop?: boolean;
  textColors?: string[];
  variableSpeed?: { min: number; max: number };
  onSentenceComplete?: (sentence: string, index: number) => void;
  startOnVisible?: boolean;
  reverseMode?: boolean;
}>;

type TypingAction =
  | { type: 'type'; delay: number }
  | { type: 'delete'; delay: number }
  | { type: 'start-delete'; delay: number }
  | { type: 'advance'; delay: number }
  | { type: 'stop' };

type TypingActionParams = {
  displayedText: string;
  currentCharIndex: number;
  isDeleting: boolean;
  processedTextLength: number;
  textCount: number;
  currentTextIndex: number;
  loop: boolean;
  typingSpeed: number;
  deletingSpeed: number;
  pauseDuration: number;
  variableSpeed?: { min: number; max: number };
};

const getSecureRandom = (): number => {
  if (typeof crypto === 'undefined' || !crypto.getRandomValues) return 0.5;
  const buffer = new Uint32Array(1);
  crypto.getRandomValues(buffer);
  return buffer[0] / (0xffffffff + 1);
};

const getTypingDelay = (
  variableSpeed: { min: number; max: number } | undefined,
  typingSpeed: number
): number => {
  if (!variableSpeed) return typingSpeed;
  const { min, max } = variableSpeed;
  if (max <= min) return min;
  return getSecureRandom() * (max - min) + min;
};

const normalizeTextArray = (text: string | string[]): string[] =>
  Array.isArray(text) ? text : [text];

const getProcessedText = (text: string, reverseMode: boolean): string =>
  reverseMode ? text.split('').reverse().join('') : text;

const getNextTypingAction = ({
  displayedText,
  currentCharIndex,
  isDeleting,
  processedTextLength,
  textCount,
  currentTextIndex,
  loop,
  typingSpeed,
  deletingSpeed,
  pauseDuration,
  variableSpeed,
}: TypingActionParams): TypingAction => {
  if (textCount === 0) return { type: 'stop' };

  if (isDeleting) {
    if (displayedText.length === 0) {
      if (!loop && currentTextIndex === textCount - 1) {
        return { type: 'stop' };
      }
      return { type: 'advance', delay: 0 };
    }
    return { type: 'delete', delay: deletingSpeed };
  }

  if (currentCharIndex < processedTextLength) {
    return {
      type: 'type',
      delay: getTypingDelay(variableSpeed, typingSpeed),
    };
  }

  if (!loop && currentTextIndex === textCount - 1) {
    return { type: 'stop' };
  }

  return { type: 'start-delete', delay: pauseDuration };
};

export const TextType = ({
  text,
  as: Component = 'div',
  typingSpeed = 50,
  initialDelay = 0,
  pauseDuration = 2000,
  deletingSpeed = 30,
  loop = true,
  className = '',
  showCursor = true,
  hideCursorWhileTyping = false,
  cursorCharacter = '|',
  cursorClassName = '',
  cursorBlinkDuration = 0.5,
  textColors = [],
  variableSpeed,
  onSentenceComplete,
  startOnVisible = false,
  reverseMode = false,
  ...props
}: Readonly<TextTypeProps & React.HTMLAttributes<HTMLElement>>) => {
  const [displayedText, setDisplayedText] = useState('');
  const [currentCharIndex, setCurrentCharIndex] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);
  const [currentTextIndex, setCurrentTextIndex] = useState(0);
  const [isVisible, setIsVisible] = useState(!startOnVisible);
  const cursorRef = useRef<HTMLSpanElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  const handleSentenceComplete = useEventCallback(
    (sentence: string, index: number) => {
      onSentenceComplete?.(sentence, index);
    }
  );

  // Derive text array inline - React Compiler handles optimization
  const textArray = normalizeTextArray(text);

  const getCurrentTextColor = () => {
    if (textColors.length === 0) return;
    return textColors[currentTextIndex % textColors.length];
  };

  useEffect(() => {
    if (!startOnVisible || !containerRef.current) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setIsVisible(true);
          }
        });
      },
      { threshold: 0.1 }
    );

    observer.observe(containerRef.current);
    return () => observer.disconnect();
  }, [startOnVisible]);

  useEffect(() => {
    if (showCursor && cursorRef.current) {
      gsap.set(cursorRef.current, { opacity: 1 });
      gsap.to(cursorRef.current, {
        opacity: 0,
        duration: cursorBlinkDuration,
        repeat: -1,
        yoyo: true,
        ease: 'power2.inOut',
      });
    }
  }, [showCursor, cursorBlinkDuration]);

  useEffect(() => {
    if (!isVisible) return;

    const effectTextArray = normalizeTextArray(text);
    const currentText = effectTextArray[currentTextIndex] ?? '';
    const processedText = getProcessedText(currentText, reverseMode);
    const action = getNextTypingAction({
      displayedText,
      currentCharIndex,
      isDeleting,
      processedTextLength: processedText.length,
      textCount: effectTextArray.length,
      currentTextIndex,
      loop,
      typingSpeed,
      deletingSpeed,
      pauseDuration,
      variableSpeed,
    });

    if (action.type === 'stop') return;

    const shouldDelayStart =
      currentCharIndex === 0 && !isDeleting && displayedText === '';
    const delay = shouldDelayStart ? initialDelay : action.delay;

    const timeout = setTimeout(() => {
      switch (action.type) {
        case 'type': {
          const nextChar = processedText[currentCharIndex] ?? '';
          setDisplayedText(displayedText + nextChar);
          setCurrentCharIndex(currentCharIndex + 1);
          break;
        }
        case 'delete': {
          setDisplayedText(displayedText.slice(0, -1));
          break;
        }
        case 'start-delete': {
          setIsDeleting(true);
          break;
        }
        case 'advance': {
          setIsDeleting(false);
          handleSentenceComplete(currentText, currentTextIndex);
          const nextIndex = (currentTextIndex + 1) % effectTextArray.length;
          setCurrentTextIndex(nextIndex);
          setCurrentCharIndex(0);
          break;
        }
        default:
          break;
      }
    }, delay);

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
    isVisible,
    reverseMode,
    variableSpeed,
    handleSentenceComplete,
  ]);

  const shouldHideCursor =
    hideCursorWhileTyping &&
    (currentCharIndex < textArray[currentTextIndex].length || isDeleting);

  const textColor = getCurrentTextColor() || 'inherit';
  const cursorClasses = `text-type__cursor ${cursorClassName} ${shouldHideCursor ? 'text-type__cursor--hidden' : ''}`;

  return (
    <Component
      ref={containerRef}
      className={`text-type ${className}`}
      {...props}
    >
      <span className="text-type__content" style={{ color: textColor }}>
        {displayedText}
      </span>
      {showCursor && (
        <span ref={cursorRef} className={cursorClasses}>
          {cursorCharacter}
        </span>
      )}
    </Component>
  );
};
