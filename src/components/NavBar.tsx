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
  Typography,
} from '@mui/material';

import navLogo from '@/assets/imgBg.webp';
import DarkModeToggle from '@/components/DarkModeToggle';
import ModalCv from '@/components/ModalCv';
import {
  closeButtonSx,
  connectTextSx,
  darkModeToggleBoxSx,
  drawerContentSx,
  drawerFooterSx,
  drawerHeaderSx,
  drawerPaperSx,
  listItemButtonSelectedSx,
  listItemButtonSx,
  listItemIconSelectedSx,
  listItemIconSx,
  listItemTextPrimarySx,
  menuButtonSx,
  navLinksListSx,
  navLogoImgSx,
  navLogoStackSx,
  socialLinksBoxSx,
} from '@/components/NavBar.styles';
import { SocialLinkButton, SocialLinkList } from '@/components/SocialLinks';
import { OffcanvasMenuProps, SocialLinkRenderProps } from '@/config/types';
import { useModal, useNavigationActions, useNavigationState } from '@/hooks';
import { navLinks } from '@/lib/data/navLinks';

// Detect iOS for swipeable drawer optimization
const isIOS =
  typeof navigator !== 'undefined' &&
  /iPad|iPhone|iPod/.test(navigator.userAgent);

const renderNavSocialLink = (
  props: SocialLinkRenderProps
): React.JSX.Element => <SocialLinkButton {...props} />;

// Logo in the Offcanvas menu
function NavLogo({ onClose }: { onClose?: () => void }): React.JSX.Element {
  const { navigateTo } = useNavigationActions();
  const { isPending } = useNavigationState();

  return (
    <Stack
      component="a"
      href="#hero"
      onClick={(e) => {
        e.preventDefault();
        if (isPending) return;
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
  const { navigateTo } = useNavigationActions();
  const { activeSectionId, isPending } = useNavigationState();

  return (
    <List sx={navLinksListSx}>
      {navLinks.map(({ id, icon: Icon, label }) => {
        const isActive = activeSectionId === id;
        return (
          <ListItem key={id} disablePadding sx={{ mb: 1 }}>
            <ListItemButton
              component="a"
              href={`#${id}`}
              disabled={isPending}
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
  return (
    <SwipeableDrawer
      anchor="right"
      open={showOffcanvas}
      onClose={closeOffcanvas}
      onOpen={openOffcanvas}
      disableBackdropTransition={!isIOS}
      disableDiscovery={isIOS}
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
  const cvModal = useModal(false);
  const offcanvasMenu = useModal(false);

  return (
    <>
      <Container maxWidth={false}>
        <Box sx={{ position: 'relative' }}>
          <Box sx={darkModeToggleBoxSx}>
            <DarkModeToggle />
          </Box>
          <IconButton
            onClick={offcanvasMenu.open}
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
            showOffcanvas={offcanvasMenu.isOpen}
            closeOffcanvas={offcanvasMenu.close}
            openOffcanvas={offcanvasMenu.open}
            openModal={cvModal.open}
          />
        </Box>
      </Container>

      {cvModal.isOpen && (
        <ModalCv show={cvModal.isOpen} handleClose={cvModal.close} />
      )}
    </>
  );
}

export default NavBar;
