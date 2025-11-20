import React from 'react';

import { HiArrowTopRightOnSquare, HiXMark } from 'react-icons/hi2';

import { Box, Dialog, DialogContent, IconButton, Stack } from '@mui/material';

import ImageCredential from '@/assets/Credential.webp';
import Image from '@/components/Image';
import Spinner from '@/components/Spinner';
import { CredentialProps } from '@/config/types';
import useLoading from '@/hooks/useLoading';

// Component for displaying a credential
function Credential({ show, handleClose }: CredentialProps): React.JSX.Element {
  const loading = useLoading();

  return (
    <Dialog
      open={show}
      onClose={handleClose}
      maxWidth="md"
      fullWidth
      aria-labelledby="credential-dialog-title"
      aria-describedby="credential-dialog-description"
    >
      <DialogContent
        sx={{
          p: 0,
          position: 'relative',
          bgcolor: 'transparent',
          border: 'none',
          width: '100%',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
        }}
      >
        <IconButton
          onClick={handleClose}
          aria-label="Close credential dialog"
          sx={{
            position: 'absolute',
            top: 0,
            right: 0,
            zIndex: 10,
            bgcolor: 'rgba(0, 0, 0, 0.4)',
            color: 'common.white',
            borderRadius: '0 0 0 50%',
            width: 40,
            height: 40,
            '&:hover': {
              bgcolor: 'rgba(0, 0, 0, 0.6)',
            },
          }}
        >
          <HiXMark style={{ fontSize: '1.2rem' }} />
        </IconButton>
        <Box sx={{ textAlign: 'center', px: 0, width: '100%' }}>
          {loading ? (
            <Spinner />
          ) : (
            <Box
              component="a"
              href="https://www.credential.net/dd705ce7-f66c-456a-b07d-e8712cd7287c#gs.cubcle"
              target="_blank"
              rel="noopener noreferrer"
              sx={{
                display: 'block',
                width: '100%',
                height: '100%',
                position: 'relative',
                overflow: 'hidden',
                '&:hover .credential-image': {
                  filter: 'brightness(0.6)',
                },
                '&:hover .hover-text': {
                  opacity: 1,
                  transform: 'translate(-50%, -50%) scale(1.1)',
                },
              }}
            >
              <Box
                sx={{
                  position: 'relative',
                  display: 'inline-block',
                  width: '100%',
                  height: '100%',
                  transition: 'all 0.3s ease',
                }}
              >
                <Image
                  src={ImageCredential}
                  alt="Credential"
                  className="credential-image"
                  style={{
                    width: '100%',
                    height: '100%',
                    objectFit: 'cover',
                    transition: 'all 0.3s ease',
                    borderRadius: '10px',
                    boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
                  }}
                />
                <Stack
                  className="hover-text"
                  direction="column"
                  alignItems="center"
                  justifyContent="center"
                  sx={{
                    position: 'absolute',
                    top: '45%',
                    left: '50%',
                    width: '100%',
                    transform: 'translate(-50%, -50%)',
                    color: 'common.white',
                    fontSize: { xs: '1.7rem', sm: '2.5rem' },
                    textAlign: 'center',
                    opacity: 0,
                    transition: 'all 0.3s ease',
                    textShadow: '0 2px 4px rgba(0, 0, 0, 0.5)',
                    pointerEvents: 'none',
                  }}
                >
                  <HiArrowTopRightOnSquare
                    style={{
                      fontSize: '2.8rem',
                      marginBottom: '0.5rem',
                    }}
                  />
                  View Credential
                </Stack>
              </Box>
            </Box>
          )}
        </Box>
      </DialogContent>
    </Dialog>
  );
}

export default Credential;
