import React from 'react';

import { Box, Stack, Typography } from '@mui/material';

import { BadgeItemProps } from '@/config/types';

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
        <Box
          component="img"
          src={imgSrc}
          alt="badge"
          sx={{
            width: { xs: '85px', sm: '105px', md: '115px', lg: '140px' },
            objectFit: 'cover',
            boxShadow:
              '0 4px 12px rgba(0, 0, 0, 0.3), 0 6px 24px rgba(0, 0, 0, 0.3)',
            transition: 'all 0.3s ease',
            cursor: 'pointer',
            filter: 'contrast(0.9) brightness(0.9)',
          }}
        />
      </a>
      <Typography
        component="div"
        sx={{
          color: 'text.secondary',
          opacity: 0.9,
          textDecoration: 'none',
          textTransform: 'uppercase',
          fontSize: '0.7rem',
          mt: 1,
        }}
      >
        <div>Awarded:</div>
        {date}
      </Typography>
    </Box>
  );
}

// Component for displaying a list of badges
function Badges(): React.JSX.Element {
  return (
    <Stack
      direction="row"
      justifyContent="space-between"
      sx={{
        textAlign: 'center',
        pt: '3rem',
      }}
    >
      {badgeItems.map((badge) => (
        <BadgeItem key={badge.href} {...badge} />
      ))}
    </Stack>
  );
}

export default Badges;
