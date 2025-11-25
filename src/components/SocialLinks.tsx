import { Fragment, type JSX } from 'react';

import { Box, IconButton, Tooltip } from '@mui/material';
import { motion, MotionStyle } from 'motion/react';

import { socialLinkButtonSx } from '@/components/NavBar.styles';
import { SocialLinkListProps, SocialLinkRenderProps } from '@/config/types';
import { useAnimationConfig, useCursorMagnet } from '@/hooks';
import { socialLinks } from '@/lib/data/socialLinks';

export function SocialLinkButton({
  href,
  onClick,
  tooltip,
  icon,
}: SocialLinkRenderProps): JSX.Element {
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
      <IconButton
        {...linkProps}
        onClick={onClick}
        size="large"
        color="inherit"
        aria-label={tooltip}
        sx={socialLinkButtonSx}
      >
        {icon}
      </IconButton>
    </motion.div>
  );
}

export function SocialLinkList({
  openModal,
  renderLink,
  wrapItem,
  iconSize = '1.5rem',
}: SocialLinkListProps): JSX.Element {
  return (
    <>
      {socialLinks.map(
        ({ id, icon: Icon, href, onClick, tooltip, color }, index) => {
          const isDownloadPdf = id === 'download-pdf';
          const resolvedOnClick = isDownloadPdf ? openModal : onClick;

          const linkElement = renderLink({
            href,
            onClick: resolvedOnClick,
            tooltip,
            icon: (
              <Icon
                sx={{
                  fontSize: iconSize,
                  color: color,
                }}
              />
            ),
            index,
          });

          const wrappedLink = (
            <Tooltip title={tooltip} placement="top">
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
