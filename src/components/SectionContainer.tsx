import React from 'react';

import { Container } from '@mui/material';

import { SectionContainerProps } from '@/config/types';

import appStyles from '@/styles/App.module.css';

function SectionContainer({
  id,
  title,
  icon: Icon,
  children,
  className = '',
}: SectionContainerProps): React.JSX.Element {
  return (
    <section id={id} className={className}>
      <Container className={appStyles.sectionContainer}>
        <div className={appStyles.sectionTitleContainer}>
          <div>
            <Icon className={appStyles.mainIcon} />
          </div>
          <div className={appStyles.sectionTitle}>{title}</div>
        </div>
        {children}
      </Container>
    </section>
  );
}

export default SectionContainer;
