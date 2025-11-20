import React from 'react';

import { Box, Container, Typography } from '@mui/material';

import { SectionContainerProps } from '@/config/types';

function SectionContainer({
  id,
  title,
  icon: Icon,
  children,
  className = '',
}: SectionContainerProps): React.JSX.Element {
  return (
    <Box component="section" id={id} className={className}>
      <Container
        sx={{
          paddingRight: 0,
          paddingLeft: 0,
          paddingBottom: '2.5rem',
        }}
      >
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            marginBottom: '1.2rem',
            lineHeight: 0,
            paddingTop: '8rem',
          }}
        >
          <Box>
            <Icon
              style={{
                color: 'text.primary', // var(--text-color)
                marginRight: '0.65rem',
                fontSize: '1.8rem',
              }}
            />
          </Box>
          <Typography
            variant="h2"
            sx={{
              fontSize: '2.1rem',
              fontWeight: 500,
              color: 'text.primary', // var(--text-color)
            }}
          >
            {title}
          </Typography>
        </Box>
        {children}
      </Container>
    </Box>
  );
}

export default SectionContainer;
