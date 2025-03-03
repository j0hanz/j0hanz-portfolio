import React, { FC, ReactNode } from 'react';
import { Card as CustomCard } from 'react-bootstrap';
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
  <CustomCard
    className={`h-100 ${styles.card} ${appStyles.cardBgColor} ${className}`}
  >
    <CustomCard.Body className={appStyles.cardBody}>
      <CustomCard.Title>{title}</CustomCard.Title>
      {subtitle ? (
        <CustomCard.Subtitle className="mb-2">{subtitle}</CustomCard.Subtitle>
      ) : null}
      {children}
    </CustomCard.Body>
  </CustomCard>
);

export default Card;
