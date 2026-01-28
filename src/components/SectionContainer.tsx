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
import type { SectionContainerProps } from '@/config/types';

// ============================================================================
// STYLE CONSTANTS
// Component-specific patterns derived from theme tokens
// ============================================================================

const sectionCenteredSx: SxProps<Theme> = {
  display: 'grid',
  placeItems: 'center',
  minHeight: '100vh',
  py: (theme) => theme.custom.spacing.section,
  overflowX: 'hidden',
};

const containerPaddingSx: SxProps<Theme> = {
  px: (theme) => theme.custom.spacing.containerPadding,
};

const sectionHeaderSx: SxProps<Theme> = {
  mb: (theme) => theme.custom.spacing.headerMargin,
};

const iconSx: SxProps<Theme> = {
  mr: { xs: 1, sm: 1.25, md: 1.5 },
  fontSize: (theme) => theme.custom.sizing.iconXl,
  color: 'primary.main',
};

const titleSx: SxProps<Theme> = {
  fontWeight: 400,
  fontSize: (theme) => theme.custom.typography.fontSize.sectionTitle,
  py: { xs: 0.5, sm: 0.75, md: 1 },
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

const resolveSx = (
  theme: Theme,
  sxProp?: SxProps<Theme>
): SystemStyleObject<Theme> => {
  if (!sxProp) return {};
  const entries = (Array.isArray(sxProp) ? sxProp : [sxProp]) as Array<
    | SystemStyleObject<Theme>
    | ((theme: Theme) => SystemStyleObject<Theme>)
    | boolean
    | null
    | undefined
  >;

  return entries.reduce<SystemStyleObject<Theme>>((acc, entry) => {
    if (!entry || entry === true) return acc;
    const next = typeof entry === 'function' ? entry(theme) : entry;
    return { ...acc, ...next };
  }, {});
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
}: SectionHeaderProps): JSX.Element {
  return (
    <Stack
      direction="row"
      justifyContent="center"
      alignItems="baseline"
      sx={sectionHeaderSx}
    >
      {Icon && <Box component={Icon} sx={iconSx} />}
      <Typography variant="h4" sx={titleSx}>
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
  return (
    <Box
      component="section"
      id={id}
      className={className}
      sx={(theme) => ({
        ...resolveSx(theme, sectionCenteredSx),
        ...resolveSx(theme, sx),
      })}
    >
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
