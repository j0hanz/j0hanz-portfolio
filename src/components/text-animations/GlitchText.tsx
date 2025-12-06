import type { CSSProperties, JSX } from 'react';

import { Box, type SxProps, type Theme } from '@mui/material';
import type { SystemStyleObject } from '@mui/system';

import { useReducedMotion } from '@/hooks';

interface GlitchTextProps {
  /** Text content to display with glitch effect */
  children: string;
  /** Animation speed multiplier (lower = faster) */
  speed?: number;
  /** Enable RGB shadow effects */
  enableShadows?: boolean;
  /** Only show glitch on hover */
  enableOnHover?: boolean;
  /** MUI sx prop for styling */
  sx?: SxProps<Theme>;
  /** Additional className */
  className?: string;
}

// CSS custom properties for glitch animation timing
interface GlitchCSSProperties extends CSSProperties {
  '--after-duration': string;
  '--before-duration': string;
  '--after-shadow': string;
  '--before-shadow': string;
}

// Keyframes for glitch clip-path animation
const glitchKeyframes = `
@keyframes glitch-effect {
  0% { clip-path: inset(20% 0 50% 0); }
  5% { clip-path: inset(10% 0 60% 0); }
  10% { clip-path: inset(15% 0 55% 0); }
  15% { clip-path: inset(25% 0 35% 0); }
  20% { clip-path: inset(30% 0 40% 0); }
  25% { clip-path: inset(40% 0 20% 0); }
  30% { clip-path: inset(10% 0 60% 0); }
  35% { clip-path: inset(15% 0 55% 0); }
  40% { clip-path: inset(25% 0 35% 0); }
  45% { clip-path: inset(30% 0 40% 0); }
  50% { clip-path: inset(20% 0 50% 0); }
  55% { clip-path: inset(10% 0 60% 0); }
  60% { clip-path: inset(15% 0 55% 0); }
  65% { clip-path: inset(25% 0 35% 0); }
  70% { clip-path: inset(30% 0 40% 0); }
  75% { clip-path: inset(40% 0 20% 0); }
  80% { clip-path: inset(20% 0 50% 0); }
  85% { clip-path: inset(10% 0 60% 0); }
  90% { clip-path: inset(15% 0 55% 0); }
  95% { clip-path: inset(25% 0 35% 0); }
  100% { clip-path: inset(30% 0 40% 0); }
}
`;

// Base styles for glitch container
const glitchBaseSx: SystemStyleObject<Theme> = {
  position: 'relative',
  display: 'inline-block',
  userSelect: 'none',
  whiteSpace: 'nowrap',
};

// Pseudo-element base styles (shared between ::before and ::after)
const pseudoBase = {
  content: 'attr(data-text)',
  position: 'absolute',
  top: 0,
  overflow: 'hidden',
  clipPath: 'inset(0 0 0 0)',
} as const;

/**
 * GlitchText - RGB split and distortion glitch effect
 *
 * Ported from ReactBits GlitchText component.
 * Uses CSS animations for the glitch effect with customizable speed and shadows.
 *
 * @example
 * <GlitchText>Hello World</GlitchText>
 * <GlitchText speed={0.3} enableOnHover>Hover Me</GlitchText>
 */
export function GlitchText({
  children,
  speed = 0.5,
  enableShadows = true,
  enableOnHover = false,
  sx,
  className,
}: GlitchTextProps): JSX.Element {
  const prefersReducedMotion = useReducedMotion();

  // Disable animations for reduced motion preference
  if (prefersReducedMotion) {
    return (
      <Box component="span" className={className} sx={sx}>
        {children}
      </Box>
    );
  }

  const inlineStyles: GlitchCSSProperties = {
    '--after-duration': `${speed * 3}s`,
    '--before-duration': `${speed * 2}s`,
    '--after-shadow': enableShadows ? '-5px 0 red' : 'none',
    '--before-shadow': enableShadows ? '5px 0 cyan' : 'none',
  };

  // Build animation sx based on hover mode
  const animationSx: SystemStyleObject<Theme> = enableOnHover
    ? {
        '&::before, &::after': {
          ...pseudoBase,
          opacity: 0,
        },
        '&:hover::after': {
          ...pseudoBase,
          left: '3px',
          opacity: 1,
          color: 'inherit',
          bgcolor: 'background.paper',
          textShadow: 'var(--after-shadow)',
          animation:
            'glitch-effect var(--after-duration) infinite linear alternate-reverse',
        },
        '&:hover::before': {
          ...pseudoBase,
          left: '-3px',
          opacity: 1,
          color: 'inherit',
          bgcolor: 'background.paper',
          textShadow: 'var(--before-shadow)',
          animation:
            'glitch-effect var(--before-duration) infinite linear alternate-reverse',
        },
      }
    : {
        '&::after': {
          ...pseudoBase,
          left: '3px',
          color: 'inherit',
          bgcolor: 'background.paper',
          textShadow: 'var(--after-shadow)',
          animation:
            'glitch-effect var(--after-duration) infinite linear alternate-reverse',
        },
        '&::before': {
          ...pseudoBase,
          left: '-3px',
          color: 'inherit',
          bgcolor: 'background.paper',
          textShadow: 'var(--before-shadow)',
          animation:
            'glitch-effect var(--before-duration) infinite linear alternate-reverse',
        },
      };

  return (
    <>
      <style>{glitchKeyframes}</style>
      <Box
        component="span"
        className={className}
        data-text={children}
        sx={{ ...glitchBaseSx, ...animationSx, ...(sx as object) }}
        style={inlineStyles}
      >
        {children}
      </Box>
    </>
  );
}
