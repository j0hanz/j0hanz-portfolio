import React from 'react';

import { IconBadgeProps } from '@/config/types';

import appStyles from '@/styles/App.module.css';

function IconBadge({ icon: Icon, text }: IconBadgeProps): React.JSX.Element {
  return (
    <div className={appStyles.customBadge}>
      <Icon className="me-1" />
      <span className={appStyles.badgeText}>{text}</span>
    </div>
  );
}

export default IconBadge;
