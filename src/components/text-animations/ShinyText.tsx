import { type JSX, type ReactNode, useId } from 'react';

import { Box, type SxProps, type Theme } from '@mui/material';

import { useReducedMotion } from '@/hooks';

interface ShinyTextProps {
  /** Content to apply shine effect to */
  children: ReactNode;
  /** Disable the animation */
  disabled?: boolean;
  /** Animation speed in seconds */
  speed?: number;
  /** Base text color */
  textColor?: string;
  /** Shine color */
  shineColor?: string;
  /** MUI sx prop */
  sx?: SxProps<Theme>;
  /** Additional className */
  className?: string;
}

/**
 * ShinyText - Animated shine/shimmer text effect
 *
 * Ported from ReactBits ShinyText component.
 * CSS-based shine animation with MUI integration.
 *
 * @example
 * <ShinyText>Download CV</ShinyText>
 * <ShinyText speed={3} shineColor="rgba(255,255,255,0.9)">Premium</ShinyText>
 */
export function ShinyText({
  children,
  disabled = false,
  speed = 5,
  textColor = 'inherit',
  shineColor = 'rgba(255, 255, 255, 0.8)',
  sx,
  className,
}: ShinyTextProps): JSX.Element {
  const prefersReducedMotion = useReducedMotion();
  const isDisabled = disabled || prefersReducedMotion;
  const uniqueId = useId();
  const keyframeName = `shine-sweep-${uniqueId.replace(/:/g, '')}`;

  // Build keyframes dynamically with unique name
  const keyframesCss = `
    @keyframes ${keyframeName} {
      0% { background-position: 100%; }
      100% { background-position: -100%; }
    }
  `;

  const shinySx: SxProps<Theme> = {
    color: textColor,
    background: `linear-gradient(
      120deg,
      rgba(255, 255, 255, 0) 40%,
      ${shineColor} 50%,
      rgba(255, 255, 255, 0) 60%
    )`,
    backgroundSize: '200% 100%',
    WebkitBackgroundClip: 'text',
    backgroundClip: 'text',
    display: 'inline-block',
    animationName: isDisabled ? 'none' : keyframeName,
    animationDuration: `${speed}s`,
    animationTimingFunction: 'linear',
    animationIterationCount: 'infinite',
    ...sx,
  };

  return (
    <>
      {/* Inject keyframes with unique ID */}
      {!isDisabled && <style>{keyframesCss}</style>}

      <Box component="span" className={className} sx={shinySx}>
        {children}
      </Box>
    </>
  );
}
