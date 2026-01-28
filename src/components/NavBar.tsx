import type { MouseEvent, ReactNode } from 'react';

import CloseRounded from '@mui/icons-material/CloseRounded';
import MenuRounded from '@mui/icons-material/MenuRounded';
import {
  Box,
  Divider,
  IconButton,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Stack,
  SwipeableDrawer,
  type SxProps,
  type Theme,
  Tooltip,
  Typography,
  Zoom,
} from '@mui/material';
import type { SystemStyleObject } from '@mui/system';
import { m } from 'motion/react';

import navLogo from '@/assets/imgBg.webp';
import { DarkModeToggle } from '@/components/DarkModeToggle';
import { defaultSocialLinkRenderer } from '@/components/socialLinkRenderer';
import { SocialLinkList } from '@/components/SocialLinks';
import { navVariants } from '@/config/motion';
import type { NavLinkItemProps, OffcanvasMenuProps } from '@/config/types';
import {
  useAnimationConfig,
  useCvModalActions,
  useMenuActions,
  useMenuState,
  useNavigationActions,
  useNavigationState,
} from '@/hooks';
import { navLinks } from '@/lib/data/navLinks';
import { isIOS } from '@/utils/platform';

const NAV_HIGHLIGHT_LAYOUT_ID = 'nav-link-highlight';
const NAV_LINK_ITEM_SX = { mb: 1, display: 'block' } as const;
const NAV_HIGHLIGHT_SX = {
  position: 'absolute',
  inset: 0,
  borderRadius: 2,
  zIndex: 0,
  bgcolor: 'action.selected',
} as const;
const MENU_ICON_STATES = {
  open: { opacity: 0, rotate: 180 },
  closed: { opacity: 1, rotate: 0 },
} as const;
const MENU_ICON_TRANSITION = { duration: 0.2 } as const;

const navLogoStackSx: SxProps<Theme> = {
  height: (theme) => theme.custom.sizing.navBarHeight,
  textDecoration: 'none',
  cursor: 'pointer',
};

const navLogoImgSx: SxProps<Theme> = {
  width: (theme) => theme.custom.sizing.logoWidth,
};

const navLinksListSx: SxProps<Theme> = {
  flex: 1,
  display: 'flex',
  flexFlow: 'column nowrap',
  position: 'relative',
  p: 2,
  m: 0,
  listStyle: 'none',
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

const listItemButtonSx = (theme: Theme): SystemStyleObject<Theme> => ({
  position: 'relative',
  overflow: 'hidden',
  clipPath: theme.custom.motion.clipRounded,
  py: { xs: 1.25, sm: 1.5 },
  px: { xs: 1.5, sm: 2 },
  '& > *': {
    position: 'relative',
    zIndex: 1,
  },
  '&:hover': {
    bgcolor: 'action.hover',
    '& .MuiListItemIcon-root': {
      color: 'primary.main',
    },
    '& .MuiListItemText-primary': {
      color: 'primary.main',
    },
  },
});

const listItemButtonSelectedSx: SystemStyleObject<Theme> = {
  '& .MuiListItemIcon-root': {
    transform: 'scale(1.1)',
  },
  '& .MuiListItemText-primary': {
    fontWeight: 500,
  },
};

const listItemIconSx = (theme: Theme): SystemStyleObject<Theme> => ({
  minWidth: theme.custom.sizing.navButtonMinWidth,
  color: 'text.secondary',
});

const listItemIconSelectedSx: SystemStyleObject<Theme> = {
  color: 'primary.main',
};

const listItemTextPrimarySx: SxProps<Theme> = {
  letterSpacing: (theme) => `${theme.custom.typography.letterSpacing.tight}px`,
};

const socialLinksBoxSx: SxProps<Theme> = { mt: 'auto' };

const drawerPaperSx: SxProps<Theme> = {
  width: { xs: '100%', sm: 320, md: 380 },
  backgroundColor: 'backdrop.glass',
  backgroundImage: 'none',
  height: '100dvh',
  display: 'flex',
  flexFlow: 'column nowrap',
  overflowX: 'hidden',
  backdropFilter: 'blur(10px) saturate(180%)',
  WebkitBackdropFilter: 'blur(10px) saturate(180%)',
  border: '1px solid',
  borderColor: 'divider',
  boxShadow: (theme) =>
    `0 8px 32px ${
      theme.palette.mode === 'dark'
        ? 'rgba(0, 0, 0, 0.3)'
        : 'rgba(0, 0, 0, 0.1)'
    }`,
};

const drawerHeaderSx: SxProps<Theme> = {
  p: 2,
  pt: 3,
  borderBottom: 1,
  borderColor: 'divider',
};

const closeButtonSx: SxProps<Theme> = {
  overflow: 'hidden',
  '&:hover': {
    color: 'error.main',
    bgcolor: 'error.light',
    opacity: 0.2,
  },
};

const drawerContentSx: SxProps<Theme> = {
  flex: 1,
  overflowY: 'auto',
  display: 'flex',
  flexFlow: 'column nowrap',
};

const drawerFooterSx: SxProps<Theme> = {
  p: 3,
  backgroundColor: 'transparent',
};

const connectTextSx: SxProps<Theme> = {
  mb: 2,
  fontWeight: 500,
  letterSpacing: (theme) => theme.custom.typography.letterSpacing.wide,
};

const navBarContainerSx = (theme: Theme) => ({
  position: 'fixed',
  top: theme.spacing(1),
  right: theme.spacing(1),
  zIndex: theme.zIndex.appBar,
  bgcolor: 'backdrop.glass',
  borderRadius: 2,
  p: 0.5,
});

const menuButtonSx: SxProps<Theme> = {
  '&:hover': { bgcolor: 'transparent' },
  '& svg': {
    transition: (theme) =>
      `${theme.custom.motion.transitionTransform}, ${theme.custom.motion.transitionColor}`,
  },
  '&:hover svg': {
    transform: 'scale(1.15)',
    color: 'primary.main',
  },
};

function NavLogo({ onClose }: Readonly<{ onClose?: () => void }>) {
  const { navigateTo } = useNavigationActions();
  const { isPending } = useNavigationState();
  const handleClick = (e: MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    if (!isPending) {
      navigateTo('hero');
      onClose?.();
    }
  };

  return (
    <Stack
      component={m.a}
      variants={navVariants.logo}
      href="#hero"
      onClick={handleClick}
      direction="row"
      alignItems="center"
      sx={navLogoStackSx}
      aria-label="Home"
    >
      <Box
        component={m.img}
        whileHover={{ scale: 1.05, opacity: 0.8 }}
        whileTap={{ scale: 0.95 }}
        src={navLogo}
        alt="Linus Johansson"
        sx={navLogoImgSx}
      />
    </Stack>
  );
}

function NavLinkItem(props: Readonly<NavLinkItemProps>) {
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
    <Box component={m.li} variants={navVariants.item} sx={NAV_LINK_ITEM_SX}>
      <ListItemButton
        component={m.a}
        whileHover={{ x: 4 }}
        whileTap={{ scale: 0.98 }}
        href={`#${id}`}
        disabled={isPending}
        onClick={(e) => onClick(e, id)}
        selected={isActive}
        sx={(theme) => ({
          ...listItemButtonSx(theme),
          ...(isActive ? listItemButtonSelectedSx : {}),
        })}
      >
        {showHighlight && isActive && (
          <Box
            component={m.span}
            layoutId={NAV_HIGHLIGHT_LAYOUT_ID}
            layout
            layoutDependency={isActive}
            transition={highlightTransition}
            sx={NAV_HIGHLIGHT_SX}
          />
        )}
        <ListItemIcon
          sx={(theme) => ({
            ...listItemIconSx(theme),
            ...(isActive ? listItemIconSelectedSx : {}),
          })}
        >
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

function NavLinks({ onClose }: Readonly<{ onClose?: () => void }>) {
  const { navigateTo } = useNavigationActions();
  const { activeSectionId, isPending } = useNavigationState();
  const { prefersReducedMotion, getTransition } = useAnimationConfig();
  const highlightTransition = getTransition('springSmooth', { duration: 0.5 });
  const showHighlight = !prefersReducedMotion;
  const handleNavLinkClick = (e: MouseEvent<HTMLAnchorElement>, id: string) => {
    e.preventDefault();
    navigateTo(id);
    onClose?.();
  };

  return (
    <Box component={m.ul} variants={navVariants.container} sx={navLinksListSx}>
      {navLinks.map((link) => (
        <NavLinkItem
          key={link.id}
          {...link}
          isActive={activeSectionId === link.id}
          isPending={isPending}
          onClick={handleNavLinkClick}
          showHighlight={showHighlight}
          highlightTransition={highlightTransition}
        />
      ))}
    </Box>
  );
}

const wrapSocialItem = (id: string, child: ReactNode) => (
  <m.div key={id} variants={navVariants.social.item}>
    {child}
  </m.div>
);

function SocialLinks({
  openModal,
  iconSize,
}: Readonly<{ openModal: () => void; iconSize?: string | number }>) {
  return (
    <Box sx={socialLinksBoxSx}>
      <Stack
        component={m.div}
        variants={navVariants.social.container}
        direction="row"
        justifyContent="space-between"
        flexWrap="nowrap"
        gap={2}
      >
        <SocialLinkList
          openModal={openModal}
          renderLink={defaultSocialLinkRenderer}
          iconSize={iconSize}
          wrapItem={wrapSocialItem}
        />
      </Stack>
    </Box>
  );
}

function OffcanvasMenu({
  showOffcanvas,
  closeOffcanvas,
  openOffcanvas,
  openModal,
}: Readonly<OffcanvasMenuProps & { openOffcanvas: () => void }>) {
  return (
    <SwipeableDrawer
      anchor="right"
      open={showOffcanvas}
      onClose={closeOffcanvas}
      onOpen={openOffcanvas}
      disableBackdropTransition={!isIOS}
      disableDiscovery={isIOS}
      slotProps={{ paper: { sx: drawerPaperSx } }}
    >
      <Box
        component={m.div}
        initial="closed"
        animate={showOffcanvas ? 'open' : 'closed'}
        sx={{ height: 1, display: 'flex', flexDirection: 'column' }}
      >
        <Stack
          direction="row"
          justifyContent="space-between"
          alignItems="center"
          sx={drawerHeaderSx}
        >
          <NavLogo onClose={closeOffcanvas} />
          <IconButton
            component={m.button}
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
          component={m.hr}
          initial={{ scaleX: 0 }}
          animate={{ scaleX: 1 }}
          transition={{ delay: 0.5, duration: 0.5 }}
          sx={{ originX: 0 }}
        />

        <Box sx={drawerFooterSx}>
          <Typography
            component={m.span}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
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

function NavBar() {
  const { openCvModal } = useCvModalActions();
  const { isMenuOpen } = useMenuState();
  const { openMenu, closeMenu } = useMenuActions();
  const { prefersReducedMotion } = useAnimationConfig();
  const menuState = isMenuOpen ? 'open' : 'closed';
  const menuIconAnimation = prefersReducedMotion
    ? undefined
    : MENU_ICON_STATES[menuState];
  const menuIconTransition = prefersReducedMotion
    ? undefined
    : MENU_ICON_TRANSITION;
  return (
    <>
      <Stack
        component="nav"
        direction="row"
        spacing={2}
        sx={(theme) => ({
          ...navBarContainerSx(theme),
          ...theme.mixins.glass,
        })}
      >
        <DarkModeToggle />
        <Tooltip
          title="Menu"
          placement="bottom"
          enterDelay={300}
          arrow
          slots={{ transition: Zoom }}
        >
          <IconButton
            component={m.button}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            animate={menuState}
            variants={navVariants.button}
            onClick={openMenu}
            aria-label="Open navigation menu"
            aria-expanded={isMenuOpen}
            aria-haspopup="menu"
            size="small"
            edge="end"
            sx={menuButtonSx}
          >
            <m.div animate={menuIconAnimation} transition={menuIconTransition}>
              <MenuRounded />
            </m.div>
          </IconButton>
        </Tooltip>
      </Stack>
      <OffcanvasMenu
        showOffcanvas={isMenuOpen}
        closeOffcanvas={closeMenu}
        openOffcanvas={openMenu}
        openModal={openCvModal}
      />
    </>
  );
}

export { NavBar };
