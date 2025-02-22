import React, { FC, ReactNode, memo } from 'react';
import { Card as BootstrapCard } from 'react-bootstrap';
import styles from './styles/Card.module.css';
import appStyles from '@/App.module.css';

interface CardProps {
  title: string;
  subtitle?: ReactNode;
  children: ReactNode;
  className?: string;
}

// Card component with title, subtitle, and children
const Card: FC<CardProps> = ({ title, subtitle, children, className }) => (
  <BootstrapCard
    className={`h-100 ${styles.card} ${appStyles.cardBgColor} ${className}`}
  >
    <BootstrapCard.Body className={appStyles.cardBody}>
      <BootstrapCard.Title className={`${appStyles.cardHeader} pb-1`}>
        <div>{title}</div>
      </BootstrapCard.Title>
      {subtitle && (
        <BootstrapCard.Subtitle className="pb-3">
          {subtitle}
        </BootstrapCard.Subtitle>
      )}
      {children}
    </BootstrapCard.Body>
  </BootstrapCard>
);

export default memo(Card);
