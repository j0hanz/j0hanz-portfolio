import { FC } from 'react';

import { HiOutlineEnvelope } from 'react-icons/hi2';
import { SiCreativecommons } from 'react-icons/si';

import { Box, Container, Stack, Typography } from '@mui/material';
import Grid from '@mui/material/Grid';

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
        color: 'primary.light',
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
        bgcolor: 'neutral.dark',
        py: 2,
        pb: { xs: 0.25, sm: 2 },
        color: 'primary.contrastText',
      }}
    >
      <Container maxWidth={false}>
        <Grid container sx={{ mx: 'auto' }}>
          <Grid size={{ sm: 6 }}>
            <Typography
              sx={{
                pb: 3,
                fontSize: '1.1rem',
                color: 'inherit',
                opacity: 0.8,
              }}
            >
              Contact Details
            </Typography>
            <Stack direction="row" alignItems="center">
              <HiOutlineEnvelope
                style={{
                  color: 'inherit',
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
                  color: 'inherit',
                  transition: 'all 0.3s ease',
                  opacity: 0.8,
                  '&:hover': {
                    color: 'primary.light',
                    opacity: 1,
                  },
                }}
              >
                l.johansson93@outlook.com
              </Box>
            </Stack>
          </Grid>
          <Grid size={{ sm: 6 }} sx={{ textAlign: { sm: 'right' }, mt: 1 }}>
            <Stack
              direction="row"
              alignItems="center"
              justifyContent={{ xs: 'flex-start', sm: 'flex-end' }}
              sx={{ pb: 3 }}
            >
              <SiCreativecommons
                style={{
                  color: 'inherit',
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
                  color: 'inherit',
                  opacity: 0.8,
                }}
              >
                Copyright 2025
              </Box>
            </Stack>
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
