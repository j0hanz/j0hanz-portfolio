import Close from '@mui/icons-material/Close';
import OpenInNewRounded from '@mui/icons-material/OpenInNewRounded';
import {
  alpha,
  Box,
  Dialog,
  DialogContent,
  IconButton,
  Stack,
  Theme,
} from '@mui/material';
import { SxProps } from '@mui/system';

import ImageCredential from '@/assets/Credential.webp';
import Image from '@/components/Image';
import { CredentialProps } from '@/config/types';

const BADGE_SIZE = 40;

const dialogContentSx: SxProps<Theme> = {
  p: 0,
  position: 'relative',
  bgcolor: 'transparent',
  border: 'none',
  width: '100%',
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
};

const closeButtonSx: SxProps<Theme> = {
  position: 'absolute',
  top: 0,
  right: 0,
  zIndex: 10,
  bgcolor: (theme) => alpha(theme.palette.common.black, 0.4),
  color: 'common.white',
  borderRadius: '0 0 0 50%',
  width: BADGE_SIZE,
  height: BADGE_SIZE,
  '&:hover': {
    bgcolor: (theme) => alpha(theme.palette.common.black, 0.6),
  },
};

const linkBoxSx: SxProps<Theme> = {
  display: 'block',
  width: '100%',
  height: '100%',
  position: 'relative',
  overflow: 'hidden',
  '&:hover .credential-image': {
    opacity: 0.6,
    transform: 'scale(1.02)',
  },
  '&:hover .hover-text': {
    opacity: 1,
    transform: 'translate(-50%, -50%) scale(1.1)',
  },
};

const imageWrapperSx: SxProps<Theme> = {
  position: 'relative',
  display: 'inline-block',
  width: '100%',
  height: '100%',
  transition: 'all 0.3s ease',
};

const hoverTextSx: SxProps<Theme> = {
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
  textShadow: (theme) => theme.shadows[4],
  pointerEvents: 'none',
};

// Component for displaying a credential
function Credential({ show, handleClose }: CredentialProps): React.JSX.Element {
  return (
    <Dialog
      open={show}
      onClose={handleClose}
      maxWidth="md"
      fullWidth
      aria-labelledby="credential-dialog-title"
      aria-describedby="credential-dialog-description"
    >
      <DialogContent sx={dialogContentSx}>
        <IconButton
          onClick={handleClose}
          aria-label="Close credential dialog"
          sx={closeButtonSx}
        >
          <Close sx={{ fontSize: (theme) => theme.typography.h6.fontSize }} />
        </IconButton>
        <Box sx={{ textAlign: 'center', px: 0, width: '100%' }}>
          <Box
            component="a"
            href="https://www.credential.net/dd705ce7-f66c-456a-b07d-e8712cd7287c#gs.cubcle"
            target="_blank"
            rel="noopener noreferrer"
            sx={linkBoxSx}
          >
            <Box sx={imageWrapperSx}>
              <Image
                src={ImageCredential}
                alt="Credential"
                className="credential-image"
                style={{
                  width: '100%',
                  height: '100%',
                  objectFit: 'cover',
                  transition: 'all 0.3s ease',
                }}
                radius="rounded"
              />
              <Stack
                className="hover-text"
                direction="column"
                alignItems="center"
                justifyContent="center"
                sx={hoverTextSx}
              >
                <OpenInNewRounded
                  sx={{
                    fontSize: (theme) => theme.typography.h3.fontSize,
                    mb: 1,
                  }}
                />
                View Credential
              </Stack>
            </Box>
          </Box>
        </Box>
      </DialogContent>
    </Dialog>
  );
}

export default Credential;
