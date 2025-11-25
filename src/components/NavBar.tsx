import React from 'react';

import CloseRounded from '@mui/icons-material/CloseRounded';
import MenuRounded from '@mui/icons-material/MenuRounded';
import {
  Box,
  Container,
  Divider,
  IconButton,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Stack,
  SwipeableDrawer,
  Typography,
} from '@mui/material';
import { AnimatePresence, motion } from 'motion/react';

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
import { navVariants } from '@/config/motion';
import type {
  NavLinkItemProps,
  OffcanvasMenuProps,
  SocialLinkRenderProps,
} from '@/config/types';
import {
  useAnimationConfig,
  useModal,
  useNavigationActions,
  useNavigationState,
} from '@/hooks';
import { navLinks } from '@/lib/data/navLinks';

// Detect iOS for swipeable drawer optimization
const isIOS =
  typeof navigator !== 'undefined' &&
  /iPad|iPhone|iPod/.test(navigator.userAgent);

const NAV_HIGHLIGHT_LAYOUT_ID = 'nav-link-highlight';

const renderNavSocialLink = (
  props: SocialLinkRenderProps
): React.JSX.Element => <SocialLinkButton {...props} />;

// Logo in the Offcanvas menu
function NavLogo({ onClose }: { onClose?: () => void }): React.JSX.Element {
  const { navigateTo } = useNavigationActions();
  const { isPending } = useNavigationState();

  const handleClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    if (isPending) return;
    navigateTo('hero');
    onClose?.();
  };

  return (
    <Stack
      component={motion.a}
      variants={navVariants.logo}
      href="#hero"
      onClick={handleClick}
      direction="row"
      alignItems="center"
      sx={navLogoStackSx}
    >
      <Box
        component={motion.img}
        whileHover={{ scale: 1.05, opacity: 0.8 }}
        whileTap={{ scale: 0.95 }}
        src={navLogo}
        alt="Linus Johansson"
        sx={navLogoImgSx}
      />
    </Stack>
  );
}

// Nav link item component - simplified
function NavLinkItem(props: NavLinkItemProps): React.JSX.Element {
  const {
    id,
    icon: Icon,
    label,
    isActive,
    isPending,
    onClick,
    showHighlight,
    highlightTransition,
  } = props;

  return (
    <Box
      component={motion.li}
      variants={navVariants.item}
      sx={{ mb: 1, display: 'block' }}
    >
      <ListItemButton
        component={motion.a}
        whileHover={{ x: 4 }}
        whileTap={{ scale: 0.98 }}
        href={`#${id}`}
        disabled={isPending}
        onClick={(e) => onClick(e, id)}
        selected={isActive}
        sx={[listItemButtonSx, isActive && listItemButtonSelectedSx]}
      >
        {showHighlight && isActive && (
          <Box
            component={motion.span}
            layoutId={NAV_HIGHLIGHT_LAYOUT_ID}
            transition={highlightTransition}
            sx={{
              position: 'absolute',
              inset: 4,
              borderRadius: 2,
              bgcolor: 'action.selected',
              opacity: 0.4,
              zIndex: 0,
            }}
          />
        )}
        <ListItemIcon sx={[listItemIconSx, isActive && listItemIconSelectedSx]}>
          <Icon fontSize="medium" />
        </ListItemIcon>
        <ListItemText
          primary={label}
          slotProps={{
            primary: { variant: 'body1', sx: listItemTextPrimarySx },
          }}
        />
      </ListItemButton>
    </Box>
  );
}

// Nav links
function NavLinks({ onClose }: { onClose?: () => void }): React.JSX.Element {
  const { navigateTo } = useNavigationActions();
  const { activeSectionId, isPending } = useNavigationState();
  const { prefersReducedMotion, getTransition } = useAnimationConfig();
  const highlightTransition = getTransition('springSmooth', { duration: 0.35 });

  const handleNavLinkClick = (
    e: React.MouseEvent<HTMLAnchorElement>,
    id: string
  ) => {
    e.preventDefault();
    navigateTo(id);
    onClose?.();
  };

  return (
    <Box
      component={motion.ul}
      variants={navVariants.container}
      sx={{ ...navLinksListSx, p: 2, m: 0, listStyle: 'none' }}
    >
      {navLinks.map((link) => (
        <NavLinkItem
          key={link.id}
          {...link}
          isActive={activeSectionId === link.id}
          isPending={isPending}
          onClick={handleNavLinkClick}
          showHighlight={!prefersReducedMotion}
          highlightTransition={highlightTransition}
        />
      ))}
    </Box>
  );
}

const wrapSocialItem = (id: string, child: React.ReactNode) => (
  <motion.div key={id} variants={navVariants.social.item}>
    {child}
  </motion.div>
);

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
      <Stack
        component={motion.div}
        variants={navVariants.social.container}
        direction="row"
        justifyContent="center"
        flexWrap="wrap"
        gap={1.5}
      >
        <SocialLinkList
          openModal={openModal}
          renderLink={renderNavSocialLink}
          iconSize={iconSize}
          wrapItem={wrapSocialItem}
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
      <Box
        component={motion.div}
        initial="closed"
        animate={showOffcanvas ? 'open' : 'closed'}
        sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}
      >
        <Stack
          direction="row"
          justifyContent="space-between"
          alignItems="center"
          sx={drawerHeaderSx}
        >
          <NavLogo onClose={closeOffcanvas} />
          <IconButton
            component={motion.button}
            whileHover={{ rotate: 90 }}
            whileTap={{ scale: 0.95 }}
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

        <Divider
          component={motion.hr}
          initial={{ scaleX: 0 }}
          animate={{ scaleX: 1 }}
          transition={{ delay: 0.3, duration: 0.3 }}
          sx={{ originX: 0 }}
        />

        <Box sx={drawerFooterSx}>
          <Typography
            component={motion.span}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
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
      </Box>
    </SwipeableDrawer>
  );
}

// Main NavBar component
function NavBar(): React.JSX.Element {
  const cvModal = useModal(false);
  const offcanvasMenu = useModal(false);
  const { prefersReducedMotion } = useAnimationConfig();

  return (
    <>
      <Container maxWidth={false}>
        <Box sx={{ position: 'relative' }}>
          <Box sx={darkModeToggleBoxSx}>
            <DarkModeToggle />
          </Box>
          <IconButton
            component={motion.button}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            animate={offcanvasMenu.isOpen ? 'open' : 'closed'}
            variants={navVariants.button}
            onClick={offcanvasMenu.open}
            aria-label="Toggle navigation"
            size="large"
            sx={menuButtonSx}
          >
            <motion.div
              animate={
                prefersReducedMotion
                  ? undefined
                  : offcanvasMenu.isOpen
                    ? { opacity: 0, rotate: 180 }
                    : { opacity: 1, rotate: 0 }
              }
              transition={prefersReducedMotion ? undefined : { duration: 0.2 }}
            >
              <MenuRounded
                sx={{
                  fontSize: '2.2rem',
                }}
              />
            </motion.div>
          </IconButton>
          <OffcanvasMenu
            showOffcanvas={offcanvasMenu.isOpen}
            closeOffcanvas={offcanvasMenu.close}
            openOffcanvas={offcanvasMenu.open}
            openModal={cvModal.open}
          />
        </Box>
      </Container>

      <AnimatePresence initial={false} mode="wait">
        {cvModal.isOpen && (
          <ModalCv
            key="navbar-cv-modal"
            show={cvModal.isOpen}
            handleClose={cvModal.close}
          />
        )}
      </AnimatePresence>
    </>
  );
}

export default NavBar;
