import {
  Box,
  Container,
  Stack,
  type SxProps,
  type Theme,
  Typography,
} from '@mui/material';

import {
  CONTAINER_MAX_WIDTH,
  containerPaddingSx,
  RESPONSIVE_FONT_SIZE,
  RESPONSIVE_SIZE,
  sectionCenteredSx,
  sectionHeaderSx,
} from '@/config/responsive';
import { SectionContainerProps } from '@/config/types';

const iconSx: SxProps<Theme> = {
  mr: 1.5,
  fontSize: RESPONSIVE_SIZE.iconMd,
  color: 'primary.main',
};

const titleSx: SxProps<Theme> = {
  fontWeight: 400,
  fontSize: RESPONSIVE_FONT_SIZE.sectionTitle,
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
  maxWidth = CONTAINER_MAX_WIDTH.wide,
}: SectionContainerProps): React.JSX.Element {
  return (
    <Box
      component="section"
      id={id}
      className={className}
      sx={[sectionCenteredSx, ...(Array.isArray(sx) ? sx : sx ? [sx] : [])]}
    >
      <Container maxWidth={maxWidth} sx={containerPaddingSx}>
        <Stack
          direction="row"
          justifyContent="center"
          alignItems="center"
          sx={sectionHeaderSx}
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
