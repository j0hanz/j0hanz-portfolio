import {
  Box,
  Container,
  Stack,
  type SxProps,
  type Theme,
  Typography,
} from '@mui/material';

import { SectionContainerProps } from '@/config/types';

const containerSx: SxProps<Theme> = {
  pb: 5,
};

const stackSx: SxProps<Theme> = {
  mb: 2.5,
  pt: 16,
};

const iconSx: SxProps<Theme> = {
  mr: 2,
  fontSize: '2.5rem',
};

const titleSx: SxProps<Theme> = {
  fontWeight: 400,
};

function SectionContainer({
  id,
  title,
  icon: Icon,
  children,
  className = '',
  sx,
  headingLevel = 'h2',
}: SectionContainerProps): React.JSX.Element {
  return (
    <Box component="section" id={id} className={className} sx={sx}>
      <Container disableGutters maxWidth="lg" sx={containerSx}>
        <Stack
          direction="row"
          justifyContent="center"
          alignItems="center"
          sx={stackSx}
        >
          <Box component={Icon} sx={iconSx} />
          <Typography variant="h3" component={headingLevel} sx={titleSx}>
            {title}
          </Typography>
        </Stack>
        {children}
      </Container>
    </Box>
  );
}

export default SectionContainer;
