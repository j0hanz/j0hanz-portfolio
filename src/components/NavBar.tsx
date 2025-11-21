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
  Tooltip,
  Typography,
} from '@mui/material';
import { motion, MotionStyle } from 'motion/react';

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
  socialLinkButtonSx,
  socialLinksBoxSx,
} from '@/components/NavBar.styles';
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

// Detect iOS for swipeable drawer optimization
const isIOS =
  typeof navigator !== 'undefined' &&
  /iPad|iPhone|iPod/.test(navigator.userAgent);

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
