import React, { forwardRef } from 'react';

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
import {
  OffcanvasMenuProps,
  SocialLinkListProps,
  SocialLinkRenderProps,
} from '@/config/types';
import { useToggle } from '@/hooks';
import useNavLinkClose from '@/hooks/useNavLinkClose';
import { navLinks } from '@/lib/data/navLinks';
import { socialLinks } from '@/lib/data/socialLinks';

import ModalCv from './ModalCv';

import styles from './NavBar.module.css';
import appStyles from '@/styles/App.module.css';

const renderNavSocialLink = ({
  href,
  onClick,
  icon,
}: SocialLinkRenderProps): React.JSX.Element => (
  <IconButton
    href={href || ''}
    onClick={onClick}
    target={href ? '_blank' : undefined}
    className={styles.socialLink}
    size="large"
    color="inherit"
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
            icon: <Icon className={`${appStyles.socialIcon} ${iconClass}`} />,
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
      <img
        src={navLogo}
        alt="Linus Johansson"
        className={styles.navLogo}
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          transform: 'translateY(-50%)',
        }}
      />
    </Box>
  );
}

// Nav links
function NavLinks(): React.JSX.Element {
  return (
    <List className={`${styles.customOffcanvasNav} ${appStyles.cardBgImage}`}>
      {navLinks.map(({ id, icon: Icon, label }) => (
        <ListItem key={id} disablePadding>
          <ListItemButton
            component="a"
            href={`#${id}`}
            className={styles.navLink}
          >
            <ListItemIcon sx={{ minWidth: 'auto', mr: 2 }}>
              <Icon className={styles.navIcon} />
            </ListItemIcon>
            <ListItemText
              primary={label}
              primaryTypographyProps={{ className: styles.navLinkText }}
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
    <div className={styles.customOffcanvasSocialLinks}>
      <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
        <SocialLinkList
          openModal={openModal}
          renderLink={renderNavSocialLink}
        />
      </Box>
    </div>
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
      className={styles.customOffcanvas}
      PaperProps={{
        className: styles.customOffcanvas,
        sx: { width: '300px', backgroundColor: 'background.paper' },
      }}
    >
      <Box
        className={styles.customOffcanvasHeader}
        sx={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          p: 2,
        }}
      >
        <NavLogo />
        <IconButton onClick={closeOffcanvas} color="inherit">
          <HiXMark />
        </IconButton>
      </Box>
      <Box className={styles.customOffcanvasBody} sx={{ p: 2 }}>
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
  const offcanvasRef = useNavLinkClose(
    showOffcanvas,
    `.${styles.navLink}`,
    closeOffcanvas
  );

  return (
    <>
      <Container maxWidth={false}>
        <div className={styles.navContainer}>
          <div className={styles.toggleButton}>
            <DarkModeToggle />
          </div>
          <IconButton
            onClick={openOffcanvas}
            className={styles.navToggle}
            aria-label="Toggle navigation"
            size="large"
            color="inherit"
          >
            <HiOutlineBars3 className={styles.navToggleIcon} />
          </IconButton>
          <OffcanvasMenu
            ref={offcanvasRef}
            showOffcanvas={showOffcanvas}
            closeOffcanvas={closeOffcanvas}
            openModal={openModal}
          />
        </div>
      </Container>

      <ModalCv show={showModal} handleClose={closeModal} />
    </>
  );
}

export default NavBar;
