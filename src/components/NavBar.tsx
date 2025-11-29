import type { JSX, MouseEvent, ReactNode } from 'react';

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
  Tooltip,
  Typography,
  Zoom,
} from '@mui/material';
import { motion } from 'motion/react';

import navLogo from '@/assets/imgBg.webp';
import DarkModeToggle from '@/components/DarkModeToggle';
import {
  closeButtonSx,
  connectTextSx,
  drawerContentSx,
  drawerFooterSx,
  drawerHeaderSx,
  drawerPaperSx,
  listItemButtonSelectedSx,
  listItemButtonSx,
  listItemIconSelectedSx,
  listItemIconSx,
  listItemTextPrimarySx,
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
  useCvModalActions,
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

const renderNavSocialLink = (props: SocialLinkRenderProps): JSX.Element => (
  <SocialLinkButton {...props} />
);

function NavLogo({ onClose }: { onClose?: () => void }): JSX.Element {
  const { navigateTo } = useNavigationActions();
  const { isPending } = useNavigationState();

  const handleClick = (e: MouseEvent<HTMLAnchorElement>) => {
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

function NavLinkItem(props: NavLinkItemProps): JSX.Element {
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
            layout
            layoutDependency={isActive}
            transition={highlightTransition}
            sx={{
              position: 'absolute',
              inset: 0,
              borderRadius: 2,
              zIndex: 0,
              bgcolor: 'action.selected',
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

function NavLinks({ onClose }: { onClose?: () => void }): JSX.Element {
  const { navigateTo } = useNavigationActions();
  const { activeSectionId, isPending } = useNavigationState();
  const { prefersReducedMotion, getTransition } = useAnimationConfig();
  const highlightTransition = getTransition('springSmooth', { duration: 0.35 });

  const handleNavLinkClick = (e: MouseEvent<HTMLAnchorElement>, id: string) => {
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

const wrapSocialItem = (id: string, child: ReactNode) => (
  <motion.div key={id} variants={navVariants.social.item}>
    {child}
  </motion.div>
);

function SocialLinks({
  openModal,
  iconSize,
}: {
  openModal: () => void;
  iconSize?: string | number;
}): JSX.Element {
  return (
    <Box sx={socialLinksBoxSx}>
      <Stack
        component={motion.div}
        variants={navVariants.social.container}
        direction="row"
        justifyContent="center"
        flexWrap="wrap"
        gap={2}
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

function OffcanvasMenu({
  showOffcanvas,
  closeOffcanvas,
  openOffcanvas,
  openModal,
}: OffcanvasMenuProps & {
  openOffcanvas: () => void;
}): JSX.Element {
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

function NavBar(): JSX.Element {
  const { openCvModal } = useCvModalActions();
  const offcanvasMenu = useModal(false);
  const { prefersReducedMotion } = useAnimationConfig();

  return (
    <>
      <Stack
        component="nav"
        direction="row"
        spacing={2}
        sx={[
          {
            position: 'fixed',
            top: 8,
            right: 8,
            zIndex: (theme) => theme.zIndex.appBar,
            bgcolor: 'backdrop.glass',
            borderRadius: 2,
            p: 0.5,
          },
          (theme) => theme.mixins.glass,
        ]}
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
            component={motion.button}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            animate={offcanvasMenu.isOpen ? 'open' : 'closed'}
            variants={navVariants.button}
            onClick={offcanvasMenu.open}
            aria-label="Open navigation menu"
            aria-expanded={offcanvasMenu.isOpen}
            aria-haspopup="menu"
            size="small"
            edge="end"
            sx={{
              '&:hover': { bgcolor: 'transparent' },
              '& svg': { transition: 'transform 0.2s, color 0.2s' },
              '&:hover svg': {
                transform: 'scale(1.15)',
                color: 'primary.main',
              },
            }}
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
              <MenuRounded />
            </motion.div>
          </IconButton>
        </Tooltip>
      </Stack>
      <OffcanvasMenu
        showOffcanvas={offcanvasMenu.isOpen}
        closeOffcanvas={offcanvasMenu.close}
        openOffcanvas={offcanvasMenu.open}
        openModal={openCvModal}
      />
    </>
  );
}

export default NavBar;
