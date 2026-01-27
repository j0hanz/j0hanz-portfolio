import type { ElementType, JSX, ReactNode } from 'react';

import {
  Box,
  Container,
  Stack,
  type SxProps,
  type Theme,
  Typography,
} from '@mui/material';
import type { SystemStyleObject } from '@mui/system';

import { AnimatedContent, FadeContent } from '@/components/animations';
import { SPACING } from '@/config/responsive';
import type { SectionContainerProps } from '@/config/types';
import { mergeSxEntries, normalizeSx, SIZING } from '@/styles/shared';

// ============================================================================
// STYLE CONSTANTS
// Inlined from responsive.ts - component-specific patterns
// ============================================================================

const sectionCenteredSx: SxProps<Theme> = {
  display: 'grid',
  placeItems: 'center',
  minHeight: '100vh',
  my: SPACING.section,
  overflowX: 'hidden',
};

const containerPaddingSx: SxProps<Theme> = {
  px: SPACING.containerPadding,
};

const sectionHeaderSx: SxProps<Theme> = {
  mb: SPACING.headerMargin,
};

const iconSx: SxProps<Theme> = {
  mr: { xs: 1, sm: 1.25, md: 1.5 },
  fontSize: SIZING.iconXl,
  color: 'primary.main',
};

const titleSx: SxProps<Theme> = {
  fontWeight: 400,
  fontSize: (theme) => theme.typography.h3.fontSize,
  my: { xs: 1.5, sm: 1.75, md: 2, lg: 2.5 },
};

const subtitleSx: SxProps<Theme> = {
  color: 'text.secondary',
  mt: { xs: 0.75, sm: 0.875, md: 1, lg: 1.25 },
  textAlign: 'center',
};

const headerActionsSx: SxProps<Theme> = {
  mt: 2,
  display: 'flex',
  justifyContent: 'center',
};

// ============================================================================
// COMPOUND COMPONENT SLOTS
// ============================================================================

type SectionHeaderProps = Readonly<{
  children: ReactNode;
  icon?: ElementType;
  headingLevel?: 'h1' | 'h2' | 'h3' | 'h4';
}>;

type SectionSlotProps = Readonly<{
  children: ReactNode;
  sx?: SxProps<Theme>;
}>;

function SectionHeader({
  children,
  icon: Icon,
  headingLevel = 'h3',
}: SectionHeaderProps): JSX.Element {
  return (
    <Stack
      direction="row"
      justifyContent="center"
      alignItems="center"
      sx={sectionHeaderSx}
    >
      {Icon && <Box component={Icon} sx={iconSx} />}
      <Typography variant="h3" component={headingLevel} sx={titleSx}>
        {children}
      </Typography>
    </Stack>
  );
}

function SectionContent({ children, sx }: SectionSlotProps): JSX.Element {
  return <Box sx={sx}>{children}</Box>;
}

function SectionActions({ children, sx }: SectionSlotProps): JSX.Element {
  return (
    <Box sx={[headerActionsSx, ...(Array.isArray(sx) ? sx : [sx])]}>
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
  headingLevel = 'h3',
  subtitle,
  headerActions,
  maxWidth = false,
}: Readonly<SectionContainerProps>): JSX.Element {
  const resolvedSx = normalizeSx(sx);
  const sectionSx = (theme: Theme): SystemStyleObject<Theme> =>
    mergeSxEntries(theme, [
      sectionCenteredSx as SystemStyleObject<Theme>,
      ...resolvedSx,
    ]);

  return (
    <Box component="section" id={id} className={className} sx={sectionSx}>
      <Container maxWidth={maxWidth} sx={containerPaddingSx}>
        <AnimatedContent distance={40} delay={0.05}>
          <SectionHeader icon={Icon} headingLevel={headingLevel}>
            {title}
          </SectionHeader>
          {subtitle && (
            <FadeContent
              blur={false}
              duration={600}
              delay={200}
              threshold={0.15}
            >
              <Typography variant="body1" sx={subtitleSx}>
                {subtitle}
              </Typography>
            </FadeContent>
          )}
          {headerActions && <SectionActions>{headerActions}</SectionActions>}
        </AnimatedContent>
        {children}
      </Container>
    </Box>
  );
}

const SectionContainer = Object.assign(SectionContainerBase, {
  Header: SectionHeader,
  Content: SectionContent,
  Actions: SectionActions,
});

export { SectionContainer };
