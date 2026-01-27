import { Fragment, type JSX } from 'react';

import Avatar from '@mui/material/Avatar';
import Box from '@mui/material/Box';
import Tooltip from '@mui/material/Tooltip';
import { motion, MotionStyle } from 'motion/react';

import { SocialLinkListProps, SocialLinkRenderProps } from '@/config/types';
import { useAnimationConfig, useCursorMagnet } from '@/hooks';
import { socialLinks } from '@/lib/data/socialLinks';

// Responsive avatar and icon sizes
const AVATAR_SIZE = { xs: 36, md: 38, lg: 40 };
const ICON_SIZE_DEFAULT = { xs: 24, md: 24, lg: 26 };

export function SocialLinkButton({
  href,
  onClick,
  tooltip,
  icon,
  bgColor,
  iconColor,
}: Readonly<SocialLinkRenderProps>): JSX.Element {
  const { prefersReducedMotion } = useAnimationConfig();
  const magnetProps = useCursorMagnet(prefersReducedMotion);

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
          // MUI sx prop resolves dot-notation color paths natively
          bgcolor: bgColor ?? 'primary.main',
          color: iconColor ?? 'primary.contrastText',
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
}: Readonly<SocialLinkListProps>): JSX.Element {
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
