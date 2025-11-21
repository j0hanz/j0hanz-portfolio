import React from 'react';

import CloseRounded from '@mui/icons-material/CloseRounded';
import MenuRounded from '@mui/icons-material/MenuRounded';
import {
  Box,
  Container,
  Divider,
  IconButton,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Stack,
  SwipeableDrawer,
  Theme,
  Tooltip,
  Typography,
} from '@mui/material';
import { SxProps, SystemStyleObject } from '@mui/system';
import { motion, MotionStyle } from 'motion/react';

import navLogo from '@/assets/imgBg.webp';
import DarkModeToggle from '@/components/DarkModeToggle';
import ModalCv from '@/components/ModalCv';
import {
  OffcanvasMenuProps,
  SocialLinkListProps,
  SocialLinkRenderProps,
} from '@/config/types';
import {
  useAnimationConfig,
  useCursorMagnet,
  useNavigation,
  useToggle,
} from '@/hooks';
import { navLinks } from '@/lib/data/navLinks';
import { socialLinks } from '@/lib/data/socialLinks';

const socialLinkButtonSx: SxProps<Theme> = {
  '&:hover': {
    color: 'primary.main',
    bgcolor: 'action.hover',
  },
};

const navLogoStackSx: SxProps<Theme> = {
  height: 50,
  textDecoration: 'none',
  cursor: 'pointer',
};

const navLogoImgSx: SxProps<Theme> = {
  width: '2.2rem',
  transition: 'all 0.3s ease',
  '&:hover': {
    opacity: 0.8,
    transform: 'scale(1.05)',
  },
};

const navLinksListSx: SxProps<Theme> = {
  flexGrow: 1,
  display: 'flex',
  flexDirection: 'column',
  position: 'relative',
  p: 2,
  // Replicating .cardBgImage
  '&::before': {
    content: '""',
    position: 'absolute',
    inset: 0,
    backgroundSize: 'contain',
    backgroundPosition: 'center',
    backgroundRepeat: 'no-repeat',
    zIndex: 0,
    backgroundImage: 'var(--card-bg-image-url)',
    opacity: 0.03,
    pointerEvents: 'none',
  },
  '& > *': {
    position: 'relative',
    zIndex: 1,
  },
};

const listItemButtonSx: SystemStyleObject<Theme> = {
  borderRadius: 2,
  py: 1.5,
  px: 2,
  transition: 'all 0.2s ease',
  '&:hover': {
    bgcolor: 'action.hover',
    '& .MuiListItemIcon-root': {
      color: 'primary.main',
      transform: 'scale(1.1)',
    },
    '& .MuiListItemText-primary': {
      color: 'primary.main',
    },
  },
  '&:active': {
    transform: 'scale(0.98)',
  },
};

const listItemButtonSelectedSx: SystemStyleObject<Theme> = {
  bgcolor: 'action.selected',
  '& .MuiListItemIcon-root': {
    color: 'primary.main',
    transform: 'scale(1.1)',
  },
  '& .MuiListItemText-primary': {
    color: 'primary.main',
    fontWeight: 600,
  },
};

const listItemIconSx: SystemStyleObject<Theme> = {
  minWidth: 40,
  color: 'text.secondary',
  transition: 'all 0.2s ease',
};

const listItemIconSelectedSx: SystemStyleObject<Theme> = {
  color: 'primary.main',
};

const listItemTextPrimarySx: SxProps<Theme> = {
  letterSpacing: '0.5px',
  transition: 'all 0.2s ease',
};

const socialLinksBoxSx: SxProps<Theme> = { mt: 'auto' };

const drawerPaperSx: SxProps<Theme> = {
  width: { xs: '85%', sm: 350 },
  backgroundColor: 'background.paper',
  backgroundImage: 'none',
  height: '100dvh',
  display: 'flex',
  flexDirection: 'column',
  boxShadow: 24,
};

const drawerHeaderSx: SxProps<Theme> = {
  p: 2,
  pt: 3,
  borderBottom: 1,
  borderColor: 'divider',
};

const closeButtonSx: SxProps<Theme> = {
  '&:hover': {
    color: 'error.main',
    bgcolor: 'error.light',
    opacity: 0.2,
  },
};

const drawerContentSx: SxProps<Theme> = {
  flexGrow: 1,
  overflowY: 'auto',
  display: 'flex',
  flexDirection: 'column',
};

const drawerFooterSx: SxProps<Theme> = {
  p: 3,
  backgroundColor: 'background.paper',
};

const connectTextSx: SxProps<Theme> = {
  mb: 2,
  fontWeight: 500,
  letterSpacing: 1.5,
};

const darkModeToggleBoxSx: SxProps<Theme> = {
  position: 'fixed',
  top: 0,
  left: 0,
  bgcolor: 'background.paper',
  borderRadius: '0 0 16px 0px',
  zIndex: (theme) => theme.zIndex.appBar,
  cursor: 'pointer',
  boxShadow: 3,
  transition: 'all 0.3s ease',
  '&:hover': {
    transform: 'translateY(2px)',
  },
};

const menuButtonSx: SxProps<Theme> = {
  position: 'fixed',
  bgcolor: 'background.paper',
  color: 'text.primary',
  borderRadius: '0 0 0 16px',
  height: 56,
  width: 64,
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  zIndex: (theme) => theme.zIndex.appBar,
  top: 0,
  right: 0,
  boxShadow: 3,
  transition: 'all 0.3s ease',
  '&:hover': {
    bgcolor: 'background.default',
    color: 'primary.main',
  },
};

function NavSocialLinkButton({
  href,
  onClick,
  tooltip,
  icon,
}: SocialLinkRenderProps): React.JSX.Element {
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

const renderNavSocialLink = (
  props: SocialLinkRenderProps
): React.JSX.Element => <NavSocialLinkButton {...props} />;

export function SocialLinkList({
  openModal,
  renderLink,
  wrapItem,
  iconSize = '1.5rem',
}: SocialLinkListProps): React.JSX.Element {
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
            <Tooltip key={id} title={tooltip} placement="top">
              <Box component="span">{linkElement}</Box>
            </Tooltip>
          );

          return wrapItem ? wrapItem(id, wrappedLink) : wrappedLink;
        }
      )}
    </>
  );
}

// Logo in the Offcanvas menu
function NavLogo({ onClose }: { onClose?: () => void }): React.JSX.Element {
  const { navigateTo } = useNavigation();

  return (
    <Stack
      component="a"
      href="#hero"
      onClick={(e) => {
        e.preventDefault();
        navigateTo('hero');
        onClose?.();
      }}
      direction="row"
      alignItems="center"
      sx={navLogoStackSx}
    >
      <Box
        component="img"
        src={navLogo}
        alt="Linus Johansson"
        sx={navLogoImgSx}
      />
    </Stack>
  );
}

// Nav links
function NavLinks({ onClose }: { onClose?: () => void }): React.JSX.Element {
  const { navigateTo, activeSectionId } = useNavigation();

  return (
    <List sx={navLinksListSx}>
      {navLinks.map(({ id, icon: Icon, label }) => {
        const isActive = activeSectionId === id;
        return (
          <ListItem key={id} disablePadding sx={{ mb: 1 }}>
            <ListItemButton
              component="a"
              href={`#${id}`}
              onClick={(e) => {
                e.preventDefault();
                navigateTo(id);
                onClose?.();
              }}
              selected={isActive}
              sx={[listItemButtonSx, isActive && listItemButtonSelectedSx]}
            >
              <ListItemIcon
                sx={[listItemIconSx, isActive && listItemIconSelectedSx]}
              >
                <Icon fontSize="medium" />
              </ListItemIcon>
              <ListItemText
                primary={label}
                slotProps={{
                  primary: {
                    variant: 'body1',
                    sx: listItemTextPrimarySx,
                  },
                }}
              />
            </ListItemButton>
          </ListItem>
        );
      })}
    </List>
  );
}

// Social links
function SocialLinks({
  openModal,
  iconSize,
}: {
  openModal: () => void;
  iconSize?: string | number;
}): React.JSX.Element {
  return (
    <Box sx={socialLinksBoxSx}>
      <Stack direction="row" justifyContent="center" flexWrap="wrap" gap={1.5}>
        <SocialLinkList
          openModal={openModal}
          renderLink={renderNavSocialLink}
          iconSize={iconSize}
        />
      </Stack>
    </Box>
  );
}

// Offcanvas menu
function OffcanvasMenu({
  showOffcanvas,
  closeOffcanvas,
  openOffcanvas,
  openModal,
}: OffcanvasMenuProps & {
  openOffcanvas: () => void;
}): React.JSX.Element {
  const iOS =
    typeof navigator !== 'undefined' &&
    /iPad|iPhone|iPod/.test(navigator.userAgent);

  return (
    <SwipeableDrawer
      anchor="right"
      open={showOffcanvas}
      onClose={closeOffcanvas}
      onOpen={openOffcanvas}
      disableBackdropTransition={!iOS}
      disableDiscovery={iOS}
      slotProps={{
        paper: {
          sx: drawerPaperSx,
        },
      }}
    >
      <Stack
        direction="row"
        justifyContent="space-between"
        alignItems="center"
        sx={drawerHeaderSx}
      >
        <NavLogo onClose={closeOffcanvas} />
        <IconButton
          onClick={closeOffcanvas}
          color="inherit"
          aria-label="Close menu"
          edge="end"
          sx={closeButtonSx}
        >
          <CloseRounded />
        </IconButton>
      </Stack>

      <Box sx={drawerContentSx}>
        <NavLinks onClose={closeOffcanvas} />
      </Box>

      <Divider />

      <Box sx={drawerFooterSx}>
        <Typography
          variant="overline"
          display="block"
          align="center"
          color="text.secondary"
          sx={connectTextSx}
        >
          Connect
        </Typography>
        <SocialLinks openModal={openModal} />
      </Box>
    </SwipeableDrawer>
  );
}

// Main NavBar component
function NavBar(): React.JSX.Element {
  // Modal state
  const {
    value: showModal,
    setTrue: openModal,
    setFalse: closeModal,
  } = useToggle(false);

  // Offcanvas state
  const {
    value: showOffcanvas,
    setTrue: openOffcanvas,
    setFalse: closeOffcanvas,
  } = useToggle(false);

  return (
    <>
      <Container maxWidth={false}>
        <Box sx={{ position: 'relative' }}>
          <Box sx={darkModeToggleBoxSx}>
            <DarkModeToggle />
          </Box>
          <IconButton
            onClick={openOffcanvas}
            aria-label="Toggle navigation"
            size="large"
            sx={menuButtonSx}
          >
            <MenuRounded
              sx={{
                fontSize: '2.2rem',
                transition: 'all 0.3s ease',
              }}
            />
          </IconButton>
          <OffcanvasMenu
            showOffcanvas={showOffcanvas}
            closeOffcanvas={closeOffcanvas}
            openOffcanvas={openOffcanvas}
            openModal={openModal}
          />
        </Box>
      </Container>

      {showModal && <ModalCv show={showModal} handleClose={closeModal} />}
    </>
  );
}

export default NavBar;
