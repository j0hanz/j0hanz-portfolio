import { FC } from 'react';

import { HiOutlineEnvelope } from 'react-icons/hi2';
import { SiCreativecommons } from 'react-icons/si';

import { Box, Container, Grid, Typography } from '@mui/material';

import { SocialLinkList } from '@/components/NavBar';
import { SocialLinkRenderProps } from '@/config/types';
import { useToggle } from '@/hooks';

import ModalCv from './ModalCv';

const renderFooterSocialLink = ({
  href,
  onClick,
  tooltip,
  icon,
}: SocialLinkRenderProps): React.JSX.Element => (
  <Box
    component="a"
    href={href}
    onClick={onClick}
    target={href ? '_blank' : undefined}
    rel={href ? 'noopener noreferrer' : undefined}
    aria-label={tooltip}
    sx={{
      cursor: href || onClick ? 'pointer' : 'default',
      color: 'inherit',
      textDecoration: 'none',
      '&:hover': {
        color: '#66b2ff',
      },
    }}
  >
    {icon}
  </Box>
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
    <Box
      component="footer"
      sx={{
        background: '#242424', // var(--btn-bg-dark-hover)
        padding: '1rem 0',
        pb: { xs: '0.1rem', sm: '1rem' },
      }}
    >
      <Container maxWidth={false}>
        <Grid container sx={{ mx: 'auto' }}>
          <Grid size={{ sm: 6 }}>
            <Typography
              sx={{
                pb: 3,
                fontSize: '1.1rem',
                color: '#f5f4f4', // var(--text-light)
                opacity: 0.8,
              }}
            >
              Contact Details
            </Typography>
            <HiOutlineEnvelope
              style={{
                color: '#f5f4f4', // var(--text-light)
                opacity: 0.8,
                fontSize: '0.9rem',
                marginRight: '10px',
                transition: 'all 0.3s ease',
              }}
            />
            <Box
              component="a"
              href="mailto:l.johansson93@outlook.com"
              sx={{
                textDecoration: 'none',
                fontSize: '0.9rem',
                color: '#f5f4f4', // var(--text-light)
                transition: 'all 0.3s ease',
                opacity: 0.8,
                '&:hover': {
                  color: '#66b2ff',
                },
              }}
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
              <SiCreativecommons
                style={{
                  color: '#f5f4f4', // var(--text-light)
                  opacity: 0.8,
                  fontSize: '0.9rem',
                  marginRight: '10px',
                  transition: 'all 0.3s ease',
                }}
              />
              <Box
                component="small"
                sx={{
                  transform: 'skew(-10deg)',
                  textTransform: 'uppercase',
                  fontSize: '0.8rem',
                  color: '#f5f4f4', // var(--text-light)
                  opacity: 0.8,
                }}
              >
                Copyright 2025
              </Box>
            </Box>
            <Box sx={{ mt: { xs: 4, sm: 0 } }}>
              <Grid
                container
                sx={{
                  justifyContent: { xs: 'space-between', sm: 'flex-end' },
                  fontSize: '0.9rem',
                }}
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
    </Box>
  );
};

export default Footer;
