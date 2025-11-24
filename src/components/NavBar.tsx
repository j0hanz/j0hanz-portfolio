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
import { motion, Variants } from 'motion/react';

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
import {
  type IconComponent,
  OffcanvasMenuProps,
  SocialLinkRenderProps,
} from '@/config/types';
import { useModal, useNavigationActions, useNavigationState } from '@/hooks';
import { navLinks } from '@/lib/data/navLinks';

// Detect iOS for swipeable drawer optimization
const isIOS =
  typeof navigator !== 'undefined' &&
  /iPad|iPhone|iPod/.test(navigator.userAgent);

// Spring animation configuration
const springConfig = { stiffness: 1000, velocity: -100 };
const stiffSpring = { stiffness: 1000 };
const smoothSpring = { stiffness: 300, damping: 24 };

// Animation Variants - consolidated for better maintainability
const navContainerVariants: Variants = {
  open: {
    transition: {
      delayChildren: 0.2,
      staggerChildren: 0.07,
    },
  },
  closed: {
    transition: {
      staggerChildren: 0.05,
      staggerDirection: -1,
    },
  },
};

const navItemVariants: Variants = {
  open: {
    y: 0,
    opacity: 1,
    transition: { y: springConfig },
  },
  closed: {
    y: 50,
    opacity: 0,
    transition: { y: stiffSpring },
  },
};

const socialContainerVariants: Variants = {
  open: {
    transition: {
      delayChildren: 0.4,
      staggerChildren: 0.08,
    },
  },
  closed: {
    transition: {
      staggerChildren: 0.05,
      staggerDirection: -1,
    },
  },
};

const socialItemVariants: Variants = {
  open: {
    scale: 1,
    y: 0,
    opacity: 1,
    transition: { type: 'spring', ...smoothSpring },
  },
  closed: {
    scale: 0.8,
    y: 20,
    opacity: 0,
    transition: { duration: 0.2 },
  },
};

const logoVariants: Variants = {
  open: {
    x: 0,
    opacity: 1,
    transition: { type: 'spring', ...smoothSpring },
  },
  closed: {
    x: -20,
    opacity: 0,
    transition: { duration: 0.2 },
  },
};

const menuButtonVariants: Variants = {
  open: { rotate: 90, scale: 1.1 },
  closed: { rotate: 0, scale: 1 },
};

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
      variants={logoVariants}
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

// Nav link item component
interface NavLinkItemProps {
  id: string;
  icon: IconComponent;
  label: string;
  isActive: boolean;
  isPending: boolean;
  onClick: (e: React.MouseEvent<HTMLAnchorElement>, id: string) => void;
}

function NavLinkItem({
  id,
  icon: Icon,
  label,
  isActive,
  isPending,
  onClick,
}: NavLinkItemProps): React.JSX.Element {
  return (
    <Box
      component={motion.li}
      key={id}
      variants={navItemVariants}
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
        <ListItemIcon sx={[listItemIconSx, isActive && listItemIconSelectedSx]}>
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
    </Box>
  );
}

// Nav links
function NavLinks({ onClose }: { onClose?: () => void }): React.JSX.Element {
  const { navigateTo } = useNavigationActions();
  const { activeSectionId, isPending } = useNavigationState();

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
      variants={navContainerVariants}
      sx={{ ...navLinksListSx, p: 2, m: 0, listStyle: 'none' }}
    >
      {navLinks.map((link) => (
        <NavLinkItem
          key={link.id}
          {...link}
          isActive={activeSectionId === link.id}
          isPending={isPending}
          onClick={handleNavLinkClick}
        />
      ))}
    </Box>
  );
}

const wrapSocialItem = (_id: string, child: React.ReactNode) => (
  <motion.div variants={socialItemVariants}>{child}</motion.div>
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
        variants={socialContainerVariants}
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
            variants={menuButtonVariants}
            onClick={offcanvasMenu.open}
            aria-label="Toggle navigation"
            size="large"
            sx={menuButtonSx}
          >
            <motion.div
              animate={
                offcanvasMenu.isOpen
                  ? { opacity: 0, rotate: 180 }
                  : { opacity: 1, rotate: 0 }
              }
              transition={{ duration: 0.2 }}
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

      {cvModal.isOpen && (
        <ModalCv show={cvModal.isOpen} handleClose={cvModal.close} />
      )}
    </>
  );
}

export default NavBar;
