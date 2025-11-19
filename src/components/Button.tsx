import React from 'react';

import { Button as MuiButton } from '@mui/material';

import { CustomButtonProps } from '@/config/types';

import styles from './Button.module.css';

// Button component with optional icon and text
function Button({
  icon,
  text = '',
  className = '',
  children,
  ...props
}: CustomButtonProps): React.JSX.Element {
  return (
    <MuiButton {...props} className={`${styles.customButton} ${className}`}>
      {icon ? <span className={styles.buttonIcon}>{icon}</span> : null}
      {text ? <span className={styles.buttonText}>{text}</span> : null}
      {children}
    </MuiButton>
  );
}

export default Button;
