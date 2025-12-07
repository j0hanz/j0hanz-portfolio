import { Box } from '@mui/material';

import './ShinyText.css';

interface ShinyTextProps {
  text: string;
  disabled?: boolean;
  speed?: number;
  className?: string;
}

export function ShinyText({
  text,
  disabled = false,
  speed = 5,
  className = '',
}: ShinyTextProps) {
  const animationDuration = `${speed}s`;
  const combinedClassName = `shiny-text ${disabled ? 'disabled' : ''} ${className}`;

  return (
    <Box className={combinedClassName} sx={{ animationDuration }}>
      {text}
    </Box>
  );
}
