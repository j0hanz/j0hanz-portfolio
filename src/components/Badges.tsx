import React from 'react';

import { Box } from '@mui/material';

import Image from '@/components/Image';
import { BadgeItemProps } from '@/config/types';

import styles from './Badge.module.css';

const badgeItems: BadgeItemProps[] = [
  {
    href: 'https://api.eu.badgr.io/public/assertions/pv52CsVuSI2V_KIyzgiahA',
    imgSrc:
      'https://api.eu.badgr.io/public/assertions/pv52CsVuSI2V_KIyzgiahA/image',
    date: '25 sep. 2024',
  },
  {
    href: 'https://api.eu.badgr.io/public/assertions/pO3q7BfdQFyGCP_gpMZb1A',
    imgSrc:
      'https://api.eu.badgr.io/public/assertions/pO3q7BfdQFyGCP_gpMZb1A/image',
    date: '20 nov. 2024',
  },
  {
    href: 'https://api.eu.badgr.io/public/assertions/7UoBkH6QRSKa8iGISrs9Zg',
    imgSrc:
      'https://api.eu.badgr.io/public/assertions/7UoBkH6QRSKa8iGISrs9Zg/image',
    date: '18 dec. 2024',
  },
];

// Component for individual badge items
function BadgeItem({ href, imgSrc, date }: BadgeItemProps): React.JSX.Element {
  return (
    <Box sx={{ width: 'auto' }}>
      <a href={href} target="_blank" rel="noopener noreferrer">
        <Image className={styles.badgeImage} src={imgSrc} alt="badge" />
      </a>
      <div className={styles.badgeText}>
        <div>Awarded:</div>
        {date}
      </div>
    </Box>
  );
}

// Component for displaying a list of badges
function Badges(): React.JSX.Element {
  return (
    <div className={styles.badgeContainer}>
      {badgeItems.map((badge) => (
        <BadgeItem key={badge.href} {...badge} />
      ))}
    </div>
  );
}

export default Badges;
