import { Fragment, type JSX } from 'react';

import { Palette, useTheme } from '@mui/material';
import Avatar from '@mui/material/Avatar';
import Box from '@mui/material/Box';
import Tooltip from '@mui/material/Tooltip';
import { motion, MotionStyle } from 'motion/react';

import { SocialLinkListProps, SocialLinkRenderProps } from '@/config/types';
import { useAnimationConfig, useCursorMagnet } from '@/hooks';
import { socialLinks } from '@/lib/data/socialLinks';

// Avatar dimensions
const AVATAR_SIZE = 38;
const ICON_SIZE_DEFAULT = '1.25rem';

// Type-safe palette key for nested color access
type PaletteColorKey = keyof {
  [K in keyof Palette as Palette[K] extends { main: string } | string
    ? K
    : never]: Palette[K];
};

// Resolves dot-notation color path (e.g., 'primary.main') to actual theme color
function resolveThemeColor(palette: Palette, colorPath?: string): string {
  if (!colorPath) return palette.primary.main;

  const [paletteKey, shade = 'main'] = colorPath.split('.') as [
    PaletteColorKey,
    string,
  ];
  const paletteValue = palette[paletteKey];

  // Handle simple string palettes (e.g., divider, heroGradient)
  if (typeof paletteValue === 'string') {
    return paletteValue;
  }

  // Handle object palettes with shades (PaletteColor, CommonColors, etc.)
  if (
    paletteValue &&
    typeof paletteValue === 'object' &&
    shade in paletteValue
  ) {
    const shadeValue = (paletteValue as unknown as Record<string, string>)[
      shade
    ];
    if (typeof shadeValue === 'string') {
      return shadeValue;
    }
  }

  return palette.primary.main;
}

export function SocialLinkButton({
  href,
  onClick,
  tooltip,
  icon,
  bgColor,
  iconColor,
}: SocialLinkRenderProps): JSX.Element {
  const { prefersReducedMotion } = useAnimationConfig();
  const magnetProps = useCursorMagnet(prefersReducedMotion);
  const theme = useTheme();

  const wrapperStyle: MotionStyle = magnetProps.style
    ? { ...magnetProps.style, display: 'inline-flex' }
    : { display: 'inline-flex' };

  const linkProps = href
    ? {
        component: 'a' as const,
        href,
        target: '_blank' as const,
        rel: 'noopener noreferrer' as const,
      }
    : {};

  const bgColorValue = resolveThemeColor(theme.palette, bgColor);
  const iconColorValue = iconColor
    ? resolveThemeColor(theme.palette, iconColor)
    : undefined;

  return (
    <motion.div
      style={wrapperStyle}
      onPointerMove={magnetProps.onPointerMove}
      onPointerLeave={magnetProps.onPointerLeave}
    >
      <Avatar
        {...linkProps}
        onClick={onClick}
        aria-label={tooltip}
        sx={{
          width: AVATAR_SIZE,
          height: AVATAR_SIZE,
          bgcolor: bgColorValue,
          color: iconColorValue ?? 'common.white',
          cursor: 'pointer',
        }}
      >
        {icon}
      </Avatar>
    </motion.div>
  );
}

export function SocialLinkList({
  openModal,
  renderLink,
  wrapItem,
  iconSize = ICON_SIZE_DEFAULT,
}: SocialLinkListProps): JSX.Element {
  return (
    <>
      {socialLinks.map(
        (
          { id, icon: Icon, href, onClick, tooltip, color, iconColor },
          index
        ) => {
          const isDownloadPdf = id === 'download-pdf';
          const resolvedOnClick = isDownloadPdf ? openModal : onClick;

          const linkElement = renderLink({
            href,
            onClick: resolvedOnClick,
            tooltip,
            icon: <Icon sx={{ fontSize: iconSize }} />,
            bgColor: color,
            iconColor,
            index,
          });

          const wrappedLink = (
            <Tooltip title={tooltip} placement="top" arrow>
              <Box component="span">{linkElement}</Box>
            </Tooltip>
          );

          return wrapItem ? (
            wrapItem(id, wrappedLink)
          ) : (
            <Fragment key={id}>{wrappedLink}</Fragment>
          );
        }
      )}
    </>
  );
}
