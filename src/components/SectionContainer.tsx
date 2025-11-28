import {
  Box,
  Container,
  Stack,
  type SxProps,
  type Theme,
  Typography,
} from '@mui/material';

import { SectionContainerProps } from '@/config/types';

// Centers content vertically in viewport
const sectionCenteredSx: SxProps<Theme> = {
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  minHeight: '100vh',
  py: { xs: 4, md: 0 },
};

const containerSx: SxProps<Theme> = {
  px: { xs: 2, sm: 3 },
};

const headerStackSx: SxProps<Theme> = {
  mb: { xs: 3, md: 4 },
};

const iconSx: SxProps<Theme> = {
  mr: 1.5,
  fontSize: { xs: '2rem', md: '2.5rem' },
  color: 'primary.main',
};

const titleSx: SxProps<Theme> = {
  fontWeight: 400,
  fontSize: { xs: '1.75rem', md: '2.125rem' },
};

const subtitleSx: SxProps<Theme> = {
  color: 'text.secondary',
  mt: 1,
  textAlign: 'center',
};

const headerActionsSx: SxProps<Theme> = {
  mt: 2,
  display: 'flex',
  justifyContent: 'center',
};

function SectionContainer({
  id,
  title,
  icon: Icon,
  children,
  className = '',
  sx,
  headingLevel = 'h2',
  subtitle,
  headerActions,
}: SectionContainerProps): React.JSX.Element {
  return (
    <Box
      component="section"
      id={id}
      className={className}
      sx={[sectionCenteredSx, ...(Array.isArray(sx) ? sx : sx ? [sx] : [])]}
    >
      <Container maxWidth="lg" sx={containerSx}>
        <Stack
          direction="row"
          justifyContent="center"
          alignItems="center"
          sx={headerStackSx}
        >
          <Box component={Icon} sx={iconSx} />
          <Typography variant="h3" component={headingLevel} sx={titleSx}>
            {title}
          </Typography>
        </Stack>
        {subtitle && (
          <Typography variant="body1" sx={subtitleSx}>
            {subtitle}
          </Typography>
        )}
        {headerActions && <Box sx={headerActionsSx}>{headerActions}</Box>}
        {children}
      </Container>
    </Box>
  );
}

export default SectionContainer;
