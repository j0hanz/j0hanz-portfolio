import type { CSSProperties } from 'react';

import { Box } from '@mui/material';

import './GlitchText.css';

type GlitchTextProps = Readonly<{
  children: string;
  speed?: number;
  enableShadows?: boolean;
  enableOnHover?: boolean;
  className?: string;
}>;

interface GlitchCSSVariables extends CSSProperties {
  '--after-duration': string;
  '--before-duration': string;
  '--after-shadow': string;
  '--before-shadow': string;
}

export function GlitchText({
  children,
  speed = 0.5,
  enableShadows = true,
  enableOnHover = false,
  className = '',
}: GlitchTextProps) {
  // CSS variables must be passed via style prop (not supported in sx)
  const cssVariables: GlitchCSSVariables = {
    '--after-duration': `${speed * 3}s`,
    '--before-duration': `${speed * 2}s`,
    '--after-shadow': enableShadows ? '-5px 0 red' : 'none',
    '--before-shadow': enableShadows ? '5px 0 cyan' : 'none',
  };

  const combinedClassName = `glitch ${enableOnHover ? 'enable-on-hover' : ''} ${className}`;

  return (
    <Box
      component="div"
      className={combinedClassName}
      style={cssVariables}
      data-text={children}
    >
      {children}
    </Box>
  );
}
