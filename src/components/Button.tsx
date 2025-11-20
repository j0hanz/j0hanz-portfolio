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
  borderRadius: '10px',
  transition: 'all 0.3s ease',
  color: '#f5f4f4',
  padding: '8px 16px',
  '&:active': {
    transform: 'skew(-10deg) scale(0.96)',
  },
  '& .button-icon': {
    lineHeight: 0,
    display: 'flex',
    alignItems: 'center',
  },
  '& .button-text': {
    marginLeft: theme.spacing(1),
    marginRight: theme.spacing(1),
  },
}));

// Button component with optional icon and text
function Button({
  icon,
  text = '',
  className = '',
  children,
  sx,
  ...props
}: CustomButtonProps): React.JSX.Element {
  return (
    <StyledButton
      {...props}
      className={className}
      sx={{
        '&:hover': {
          transform: 'skew(-10deg) translateY(-2px)',
          boxShadow: 2,
        },
        ...sx,
      }}
    >
      {icon && <span className="button-icon">{icon}</span>}
      {text && <span className="button-text">{text}</span>}
      {children}
    </StyledButton>
  );
}

export default Button;
