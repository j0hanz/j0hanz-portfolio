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
  Stack,
  Tooltip,
} from '@mui/material';

import navLogo from '@/assets/imgBg.webp';
import DarkModeToggle from '@/components/DarkModeToggle';
import Spinner from '@/components/Spinner';
import {
  OffcanvasMenuProps,
  SocialLinkListProps,
  SocialLinkRenderProps,
} from '@/config/types';
import { useEventListener, useToggle } from '@/hooks';
import useNavLinkClose from '@/hooks/useNavLinkClose';
import { navLinks } from '@/lib/data/navLinks';
import { socialLinks } from '@/lib/data/socialLinks';

const ModalCv = lazy(() => import('@/components/ModalCv'));

const renderNavSocialLink = ({
  href,
  onClick,
  tooltip,
  icon,
}: SocialLinkRenderProps): React.JSX.Element => (
  <IconButton
    {...(href
      ? {
          component: 'a',
          href,
          target: '_blank',
          rel: 'noopener noreferrer',
        }
      : {})}
    onClick={onClick}
    size="large"
    color="inherit"
    aria-label={tooltip}
    sx={{
      transition: 'all 0.3s ease',
      '&:hover': {
        color: 'primary.light',
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
      {socialLinks.map(({ id, icon: Icon, href, onClick, tooltip, color }) => {
        const isDownloadPdf = id === 'download-pdf';
        const isSourceCode = id === 'source-code';
        const resolvedOnClick = isDownloadPdf ? openModal : onClick;
        
        const linkElement = renderLink({
          href,
          onClick: resolvedOnClick,
          tooltip,
          icon: (
            <Icon
              style={{
                fontSize: '1.4rem',
                transition: 'all 0.3s ease',
                color: color,
                paddingRight: isSourceCode ? 0 : '0.5rem',
              }}
            />
          ),
        });

        const wrappedLink = (
          <Tooltip key={id} title={tooltip} placement="top">
            <Box component="span">{linkElement}</Box>
          </Tooltip>
        );

        return wrapItem ? wrapItem(id, wrappedLink) : wrappedLink;
      })}
    </>
  );
}

// Logo in the Offcanvas menu
function NavLogo(): React.JSX.Element {
  return (
    <Stack
      component="a"
      href="#hero"
      direction="row"
      alignItems="center"
      sx={{
        height: 50,
        textDecoration: 'none',
      }}
    >
      <Box
        component="img"
        src={navLogo}
        alt="Linus Johansson"
        sx={{
          width: '1.9rem',
          transition: 'all 0.3s ease',
          '&:hover': {
            opacity: 0.7,
          },
        }}
      />
    </Stack>
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
              gap: 2,
              mt: { xs: 3, sm: 4 },
              transition: 'all 0.3s ease',
              '&:hover .MuiListItemText-primary': {
                color: 'primary.light',
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
                  color: 'inherit',
                  fontSize: '1.05rem',
                  transition: 'all 0.3s ease',
                }}
              />
            </ListItemIcon>
            <ListItemText
              primary={label}
              primaryTypographyProps={{
                sx: {
                  color: 'inherit',
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
      <Stack direction="row" justifyContent="space-between">
        <SocialLinkList
          openModal={openModal}
          renderLink={renderNavSocialLink}
        />
      </Stack>
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
          width: 300,
          bgcolor: 'neutral.dark',
          color: 'neutral.contrastText',
          height: '100dvh',
        },
      }}
    >
      <Stack
        direction="row"
        justifyContent="space-between"
        alignItems="center"
        sx={{
          p: 2,
          position: 'relative',
          mt: 0.5,
        }}
      >
        <NavLogo />
        <IconButton onClick={closeOffcanvas} color="inherit">
          <HiXMark />
        </IconButton>
      </Stack>
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
              bgcolor: 'neutral.main',
              borderRadius: '0 0 10px 0px',
              zIndex: (theme) => theme.zIndex.appBar,
              cursor: 'pointer',
              transition: 'all 0.3s ease',
              '&:hover': {
                bgcolor: 'neutral.dark',
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
              bgcolor: 'neutral.main',
              borderRadius: '0 0 0 10px',
              height: 48,
              width: 56,
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              zIndex: (theme) => theme.zIndex.appBar,
              top: 0,
              right: 0,
              transition: 'all 0.3s ease',
              '&:hover': {
                bgcolor: 'neutral.dark',
              },
            }}
          >
            <HiOutlineBars3
              style={{
                fontSize: '2.2rem',
                color: 'inherit',
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
