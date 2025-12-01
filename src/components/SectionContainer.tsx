import type { ElementType, JSX, ReactNode } from 'react';

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
import type { SectionContainerProps } from '@/config/types';

// ============================================================================
// STYLE CONSTANTS
// ============================================================================

const ICON_SX: SxProps<Theme> = {
  mr: 1.5,
  fontSize: RESPONSIVE_SIZE.iconMd,
  color: 'primary.main',
};

const TITLE_SX: SxProps<Theme> = {
  fontWeight: 400,
  fontSize: RESPONSIVE_FONT_SIZE.sectionTitle,
};

const SUBTITLE_SX: SxProps<Theme> = {
  color: 'text.secondary',
  mt: 1,
  textAlign: 'center',
};

const HEADER_ACTIONS_SX: SxProps<Theme> = {
  mt: 2,
  display: 'flex',
  justifyContent: 'center',
};

// ============================================================================
// COMPOUND COMPONENT SLOTS
// ============================================================================

// Header slot for custom section headers
function SectionHeader({
  children,
  icon: Icon,
  headingLevel = 'h2',
}: {
  children: ReactNode;
  icon?: ElementType;
  headingLevel?: 'h1' | 'h2' | 'h3' | 'h4';
}): JSX.Element {
  return (
    <Stack
      direction="row"
      justifyContent="center"
      alignItems="center"
      sx={sectionHeaderSx}
    >
      {Icon && <Box component={Icon} sx={ICON_SX} />}
      <Typography variant="h3" component={headingLevel} sx={TITLE_SX}>
        {children}
      </Typography>
    </Stack>
  );
}

// Content slot for section body
function SectionContent({
  children,
  sx,
}: {
  children: ReactNode;
  sx?: SxProps<Theme>;
}): JSX.Element {
  return <Box sx={sx}>{children}</Box>;
}

// Actions slot for header-level actions
function SectionActions({
  children,
  sx,
}: {
  children: ReactNode;
  sx?: SxProps<Theme>;
}): JSX.Element {
  return (
    <Box sx={[HEADER_ACTIONS_SX, ...(Array.isArray(sx) ? sx : [sx])]}>
      {children}
    </Box>
  );
}

// ============================================================================
// MAIN COMPONENT
// ============================================================================

function SectionContainerBase({
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
}: SectionContainerProps): JSX.Element {
  return (
    <Box
      component="section"
      id={id}
      className={className}
      sx={[sectionCenteredSx, ...(Array.isArray(sx) ? sx : sx ? [sx] : [])]}
    >
      <Container maxWidth={maxWidth} sx={containerPaddingSx}>
        <SectionHeader icon={Icon} headingLevel={headingLevel}>
          {title}
        </SectionHeader>
        {subtitle && (
          <Typography variant="body1" sx={SUBTITLE_SX}>
            {subtitle}
          </Typography>
        )}
        {headerActions && <SectionActions>{headerActions}</SectionActions>}
        {children}
      </Container>
    </Box>
  );
}

// Compound component with attached slots
const SectionContainer = Object.assign(SectionContainerBase, {
  Header: SectionHeader,
  Content: SectionContent,
  Actions: SectionActions,
});

export default SectionContainer;
