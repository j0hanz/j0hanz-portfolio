import { FC, ReactNode } from 'react';
import { Button as CustomButton, ButtonProps } from 'react-bootstrap';
import styles from './styles/Button.module.css';

interface CustomButtonProps extends ButtonProps {
  icon?: ReactNode;
  text?: string;
  className?: string;
}

// Button component with optional icon and text
const Button: FC<CustomButtonProps> = ({
  icon,
  text = '',
  className = '',
  children,
  ...props
}) => {
  const buttonClassName = `${styles.customButton} ${className}`.trim();

  return (
    <CustomButton {...props} className={buttonClassName}>
      {icon ? <span className={styles.buttonIcon}>{icon}</span> : null}
      {text ? <span className={styles.buttonText}>{text}</span> : null}
      {children}
    </CustomButton>
  );
};

export default Button;
