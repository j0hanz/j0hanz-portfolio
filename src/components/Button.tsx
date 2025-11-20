import React from 'react';

import { Button as MuiButton } from '@mui/material';
import { styled } from '@mui/material/styles';

import { CustomButtonProps } from '@/config/types';

const StyledButton = styled(MuiButton)(({ theme }) => ({
  textTransform: 'uppercase',
  transform: 'skew(-10deg)',
  maxWidth: '100%',
  display: 'flex',
  justifyContent: 'space-evenly',
  alignItems: 'center',
  borderRadius: theme.shape.borderRadius,
  transition: theme.transitions.create(
    ['transform', 'box-shadow', 'background-color'],
    {
      duration: theme.transitions.duration.short,
    }
  ),
  color: theme.palette.primary.contrastText,
  padding: theme.spacing(1, 2),
  '&:active': {
    transform: 'skew(-10deg) scale(0.96)',
  },
  '& .MuiButton-startIcon, & .MuiButton-endIcon': {
    lineHeight: 0,
    display: 'flex',
    alignItems: 'center',
  },
}));

// Button component with optional icon and text, supports MUI v7 best practices
function Button({
  text = '',
  className = '',
  children,
  sx,
  variant = 'contained',
  startIcon,
  endIcon,
  ...props
}: CustomButtonProps): React.JSX.Element {
  return (
    <StyledButton
      {...props}
      variant={variant}
      startIcon={startIcon}
      endIcon={endIcon}
      className={className}
      sx={{
        '&:hover': {
          transform: 'skew(-10deg) translateY(-2px)',
          boxShadow: 2,
        },
        ...sx,
      }}
    >
      {text || children}
    </StyledButton>
  );
}

export default Button;
