import React from 'react';

import { Box, Container, Stack, Typography } from '@mui/material';

import { SectionContainerProps } from '@/config/types';

function SectionContainer({
  id,
  title,
  icon: Icon,
  children,
  className = '',
  sx,
}: SectionContainerProps): React.JSX.Element {
  return (
    <Box component="section" id={id} className={className} sx={sx}>
      <Container
        disableGutters
        maxWidth="lg"
        sx={{
          pb: 5,
        }}
      >
        <Stack
          direction="row"
          justifyContent="center"
          alignItems="center"
          sx={{
            mb: 2.5,
            pt: 16,
          }}
        >
          <Box
            component={Icon}
            sx={{
              color: 'text.primary',
              mr: 1.5,
              fontSize: '1.8rem',
            }}
          />
          <Typography
            variant="h2"
            component="h2"
            sx={{
              fontSize: '2.1rem',
              fontWeight: 500,
              color: 'text.primary',
            }}
          >
            {title}
          </Typography>
        </Stack>
        {children}
      </Container>
    </Box>
  );
}

export default SectionContainer;
