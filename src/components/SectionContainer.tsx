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
              mr: 2,
              fontSize: '2.5rem',
            }}
          />
          <Typography
            variant="h3"
            component="h3"
            sx={{
              fontWeight: 400,
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
