import React from 'react';

import { CloseRounded, MenuRounded } from '@mui/icons-material';
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
  Tooltip,
  Typography,
} from '@mui/material';
import { motion } from 'motion/react';
import type { MotionStyle } from 'motion/react';

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
  useEventListener,
  useNavigation,
  useNavLinkClose,
  useToggle,
} from '@/hooks';
import { navLinks } from '@/lib/data/navLinks';
import { socialLinks } from '@/lib/data/socialLinks';

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
        sx={{
          '&:hover': {
            color: 'primary.main',
            bgcolor: 'action.hover',
          },
        }}
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
                style={{
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
      sx={{
        height: 50,
        textDecoration: 'none',
        cursor: 'pointer',
      }}
    >
      <Box
        component="img"
        src={navLogo}
        alt="Linus Johansson"
        sx={{
          width: '2.2rem',
          transition: 'all 0.3s ease',
          '&:hover': {
            opacity: 0.8,
            transform: 'scale(1.05)',
          },
        }}
      />
    </Stack>
  );
}

// Nav links
function NavLinks({ onClose }: { onClose?: () => void }): React.JSX.Element {
  const { navigateTo, activeSectionId } = useNavigation();

  return (
    <List
      sx={{
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
      }}
    >
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
              sx={{
                borderRadius: 2,
                py: 1.5,
                px: 2,
                transition: 'all 0.2s ease',
                ...(isActive && {
                  bgcolor: 'action.selected',
                  '& .MuiListItemIcon-root': {
                    color: 'primary.main',
                    transform: 'scale(1.1)',
                  },
                  '& .MuiListItemText-primary': {
                    color: 'primary.main',
                    fontWeight: 600,
                  },
                }),
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
              }}
            >
              <ListItemIcon
                sx={{
                  minWidth: 40,
                  color: isActive ? 'primary.main' : 'text.secondary',
                  transition: 'all 0.2s ease',
                }}
              >
                <Icon fontSize="medium" />
              </ListItemIcon>
              <ListItemText
                primary={label}
                slotProps={{
                  primary: {
                    variant: 'body1',
                    sx: {
                      letterSpacing: '0.5px',
                      transition: 'all 0.2s ease',
                    },
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
    <Box sx={{ mt: 'auto' }}>
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
  ref,
}: OffcanvasMenuProps & {
  openOffcanvas: () => void;
  ref?: React.Ref<HTMLDivElement>;
}): React.JSX.Element {
  const iOS =
    typeof navigator !== 'undefined' &&
    /iPad|iPhone|iPod/.test(navigator.userAgent);

  return (
    <SwipeableDrawer
      ref={ref}
      anchor="right"
      open={showOffcanvas}
      onClose={closeOffcanvas}
      onOpen={openOffcanvas}
      disableBackdropTransition={!iOS}
      disableDiscovery={iOS}
      slotProps={{
        paper: {
          sx: {
            width: { xs: '85%', sm: 350 },
            backgroundColor: 'background.paper',
            backgroundImage: 'none',
            height: '100dvh',
            display: 'flex',
            flexDirection: 'column',
            boxShadow: 24,
          },
        },
      }}
    >
      <Stack
        direction="row"
        justifyContent="space-between"
        alignItems="center"
        sx={{
          p: 2,
          pt: 3,
          borderBottom: 1,
          borderColor: 'divider',
        }}
      >
        <NavLogo onClose={closeOffcanvas} />
        <IconButton
          onClick={closeOffcanvas}
          color="inherit"
          aria-label="Close menu"
          edge="end"
          sx={{
            '&:hover': {
              color: 'error.main',
              bgcolor: 'error.light',
              opacity: 0.2,
            },
          }}
        >
          <CloseRounded />
        </IconButton>
      </Stack>

      <Box
        sx={{
          flexGrow: 1,
          overflowY: 'auto',
          display: 'flex',
          flexDirection: 'column',
        }}
      >
        <NavLinks onClose={closeOffcanvas} />
      </Box>

      <Divider />

      <Box sx={{ p: 3, backgroundColor: 'background.paper' }}>
        <Typography
          variant="overline"
          display="block"
          align="center"
          color="text.secondary"
          sx={{ mb: 2, fontWeight: 500, letterSpacing: 1.5 }}
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

  // Close Offcanvas on nav link click or outside click
  const offcanvasRef = useNavLinkClose(
    showOffcanvas,
    'a[href^="#"]',
    closeOffcanvas
  );

  useEventListener('keydown', (event) => {
    const keyboardEvent = event as KeyboardEvent;
    if (keyboardEvent.key === 'Escape' && showOffcanvas) {
      closeOffcanvas();
    }
  });

  return (
    <>
      <Container maxWidth={false}>
        <Box sx={{ position: 'relative' }}>
          <Box
            sx={{
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
            }}
          >
            <DarkModeToggle />
          </Box>
          <IconButton
            onClick={openOffcanvas}
            aria-label="Toggle navigation"
            size="large"
            sx={{
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
            }}
          >
            <MenuRounded
              sx={{
                fontSize: '2.2rem',
                transition: 'all 0.3s ease',
              }}
            />
          </IconButton>
          <OffcanvasMenu
            ref={offcanvasRef}
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
