import React, { forwardRef, lazy, Suspense } from 'react';

import { HiOutlineBars3, HiXMark } from 'react-icons/hi2';

import {
  Box,
  Container,
  Drawer,
  IconButton,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Tooltip,
} from '@mui/material';

import navLogo from '@/assets/imgBg.webp';
import DarkModeToggle from '@/components/DarkModeToggle';
import Spinner from '@/components/Spinner';
import { COLORS } from '@/config/constants';
import {
  OffcanvasMenuProps,
  SocialLinkListProps,
  SocialLinkRenderProps,
} from '@/config/types';
import { useToggle } from '@/hooks';
import useNavLinkClose from '@/hooks/useNavLinkClose';
import { navLinks } from '@/lib/data/navLinks';
import { socialLinks } from '@/lib/data/socialLinks';

const ModalCv = lazy(() => import('@/components/ModalCv'));

const renderNavSocialLink = ({
  href,
  onClick,
  icon,
}: SocialLinkRenderProps): React.JSX.Element => (
  <IconButton
    href={href || ''}
    onClick={onClick}
    target={href ? '_blank' : undefined}
    size="large"
    color="inherit"
    sx={{
      transition: 'all 0.3s ease',
      '&:hover': {
        color: COLORS.NAV_HOVER,
        transform: 'translateY(-3px)',
      },
    }}
  >
    {icon}
  </IconButton>
);

export function SocialLinkList({
  openModal,
  renderLink,
  wrapItem,
}: SocialLinkListProps): React.JSX.Element {
  return (
    <>
      {socialLinks.map(
        ({ id, icon: Icon, href, onClick, tooltip, iconClass }) => {
          const resolvedOnClick = id === 'download-pdf' ? openModal : onClick;
          const linkElement = renderLink({
            href,
            onClick: resolvedOnClick,
            tooltip,
            icon: (
              <Icon
                className={iconClass}
                style={{
                  fontSize: '1.4rem',
                  transition: 'all 0.3s ease',
                }}
              />
            ),
          });

          const overlayNode = (
            <Tooltip key={id} title={tooltip} placement="top">
              <Box component="span">{linkElement}</Box>
            </Tooltip>
          );

          return wrapItem ? wrapItem(id, overlayNode) : overlayNode;
        }
      )}
    </>
  );
}

// Logo in the Offcanvas menu
function NavLogo(): React.JSX.Element {
  return (
    <Box
      component="a"
      href="#hero"
      sx={{
        position: 'relative',
        display: 'block',
        width: '100%',
        height: '50px',
      }}
    >
      <Box
        component="img"
        src={navLogo}
        alt="Linus Johansson"
        sx={{
          width: '1.9rem',
          transition: 'all 0.3s ease',
          position: 'absolute',
          top: 0,
          left: 0,
          transform: 'translateY(-50%)',
          '&:hover': {
            opacity: 0.7,
          },
        }}
      />
    </Box>
  );
}

// Nav links
function NavLinks(): React.JSX.Element {
  return (
    <List
      sx={{
        flexGrow: 1,
        display: 'flex',
        flexDirection: 'column',
        position: 'relative',
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
          opacity: 0.05,
        },
        '& > *': {
          position: 'relative',
          zIndex: 1,
        },
      }}
    >
      {navLinks.map(({ id, icon: Icon, label }) => (
        <ListItem key={id} disablePadding>
          <ListItemButton
            component="a"
            href={`#${id}`}
            sx={{
              display: 'flex',
              alignItems: 'center',
              gap: '1rem',
              marginTop: { xs: '1.5rem', sm: '2rem' },
              transition: 'all 0.3s ease',
              '&:hover .MuiListItemText-primary': {
                color: COLORS.NAV_HOVER,
              },
              '&:active .MuiListItemText-primary': {
                transform: 'scale(0.98)',
                transition: 'all 0.3s ease',
              },
            }}
          >
            <ListItemIcon sx={{ minWidth: 'auto', mr: 2 }}>
              <Icon
                style={{
                  color: COLORS.TEXT_LIGHT,
                  fontSize: '1.05rem',
                  transition: 'all 0.3s ease',
                }}
              />
            </ListItemIcon>
            <ListItemText
              primary={label}
              primaryTypographyProps={{
                sx: {
                  color: COLORS.TEXT_LIGHT,
                  letterSpacing: '1.25px',
                  fontSize: { xs: '1rem', sm: '1.1rem' },
                  transition: 'all 0.3s ease',
                },
              }}
            />
          </ListItemButton>
        </ListItem>
      ))}
    </List>
  );
}

// Social links
function SocialLinks({
  openModal,
}: {
  openModal: () => void;
}): React.JSX.Element {
  return (
    <Box sx={{ mt: 'auto' }}>
      <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
        <SocialLinkList
          openModal={openModal}
          renderLink={renderNavSocialLink}
        />
      </Box>
    </Box>
  );
}

// Offcanvas menu
const OffcanvasMenu = forwardRef<HTMLDivElement, OffcanvasMenuProps>(
  ({ showOffcanvas, closeOffcanvas, openModal }, ref) => (
    <Drawer
      ref={ref}
      anchor="right"
      open={showOffcanvas}
      onClose={closeOffcanvas}
      PaperProps={{
        sx: {
          width: '300px',
          backgroundColor: COLORS.BG_DARK,
          color: COLORS.TEXT_LIGHT,
          height: '100dvh',
        },
      }}
    >
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          p: 2,
          position: 'relative',
          marginTop: '0.25rem',
        }}
      >
        <NavLogo />
        <IconButton onClick={closeOffcanvas} color="inherit">
          <HiXMark />
        </IconButton>
      </Box>
      <Box
        sx={{
          p: 2,
          display: 'flex',
          flexDirection: 'column',
          flexGrow: 1,
        }}
      >
        <NavLinks />
        <SocialLinks openModal={openModal} />
      </Box>
    </Drawer>
  )
);

OffcanvasMenu.displayName = 'OffcanvasMenu';

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
  // Note: We need to target the anchor elements inside the list items
  const offcanvasRef = useNavLinkClose(
    showOffcanvas,
    'a[href^="#"]', // Updated selector to match anchor tags with hash links
    closeOffcanvas
  );

  return (
    <>
      <Container maxWidth={false}>
        <Box sx={{ position: 'relative' }}>
          <Box
            sx={{
              position: 'fixed',
              top: 0,
              left: 0,
              background: COLORS.BTN_BG_DARK,
              borderRadius: '0 0 10px 0px',
              zIndex: 1000,
              cursor: 'pointer',
              transition: 'all 0.3s ease',
              '&:hover': {
                background: COLORS.BTN_BG_DARK_HOVER,
              },
            }}
          >
            <DarkModeToggle />
          </Box>
          <IconButton
            onClick={openOffcanvas}
            aria-label="Toggle navigation"
            size="large"
            color="inherit"
            sx={{
              position: 'fixed',
              background: COLORS.BTN_BG_DARK,
              borderRadius: '0 0 0 10px',
              height: '3rem',
              width: '3.5rem',
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              zIndex: 1000,
              top: 0,
              right: 0,
              transition: 'all 0.3s ease',
              '&:hover': {
                background: COLORS.BTN_BG_DARK_HOVER,
              },
            }}
          >
            <HiOutlineBars3
              style={{
                fontSize: '2.2rem',
                color: COLORS.TEXT_LIGHT,
                transition: 'all 0.3s ease',
              }}
            />
          </IconButton>
          <OffcanvasMenu
            ref={offcanvasRef}
            showOffcanvas={showOffcanvas}
            closeOffcanvas={closeOffcanvas}
            openModal={openModal}
          />
        </Box>
      </Container>

      {showModal && (
        <Suspense fallback={<Spinner />}>
          <ModalCv show={showModal} handleClose={closeModal} />
        </Suspense>
      )}
    </>
  );
}

export default NavBar;
