import { FC } from 'react';

import { HiOutlineEnvelope } from 'react-icons/hi2';
import { SiCreativecommons } from 'react-icons/si';

import { Box, Container, Grid } from '@mui/material';

import { SocialLinkList } from '@/components/NavBar';
import { SocialLinkRenderProps } from '@/config/types';
import { useToggle } from '@/hooks';

import ModalCv from './ModalCv';

import styles from './Footer.module.css';
import appStyles from '@/styles/App.module.css';

const renderFooterSocialLink = ({
  href,
  onClick,
  tooltip,
  icon,
}: SocialLinkRenderProps): React.JSX.Element => (
  <a
    href={href}
    onClick={onClick}
    target={href ? '_blank' : undefined}
    rel={href ? 'noopener noreferrer' : undefined}
    aria-label={tooltip}
    style={{ cursor: href || onClick ? 'pointer' : 'default' }}
  >
    {icon}
  </a>
);

const wrapFooterSocialLink = (
  id: string,
  node: React.JSX.Element
): React.JSX.Element => (
  <Grid size="auto" sx={{ mb: { xs: 2, sm: 0 } }} key={id}>
    {node}
  </Grid>
);

const Footer: FC = () => {
  const {
    value: showModal,
    setTrue: handleModalOpen,
    setFalse: handleModalClose,
  } = useToggle(false);

  return (
    <footer className={styles.footerBg}>
      <Container maxWidth={false}>
        <Grid container sx={{ mx: 'auto' }}>
          <Grid size={{ sm: 6 }}>
            <div className={`pb-3 ${styles.footerLinkHeader}`}>
              Contact Details
            </div>
            <HiOutlineEnvelope className={styles.footerIcon} />
            <Box
              component="a"
              href="mailto:l.johansson93@outlook.com"
              className={styles.footerLink}
              sx={{ textDecoration: 'none' }}
            >
              l.johansson93@outlook.com
            </Box>
          </Grid>
          <Grid size={{ sm: 6 }} sx={{ textAlign: { sm: 'right' }, mt: 1 }}>
            <Box
              sx={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: { xs: 'flex-start', sm: 'flex-end' },
                pb: 3,
              }}
            >
              <SiCreativecommons className={styles.footerIcon} />
              <small className={appStyles.copyrightText}>Copyright 2025</small>
            </Box>
            <Box sx={{ mt: { xs: 4, sm: 0 } }}>
              <Grid
                container
                className={styles.footerSocialIcons}
                sx={{ justifyContent: { xs: 'space-between', sm: 'flex-end' } }}
              >
                <SocialLinkList
                  openModal={handleModalOpen}
                  renderLink={renderFooterSocialLink}
                  wrapItem={wrapFooterSocialLink}
                />
              </Grid>
            </Box>
          </Grid>
        </Grid>
      </Container>
      <ModalCv show={showModal} handleClose={handleModalClose} />
    </footer>
  );
};

export default Footer;
