import OpenInNewRounded from '@mui/icons-material/OpenInNewRounded';
import {
  Box,
  DialogTitle,
  Stack,
  type SxProps,
  type Theme,
} from '@mui/material';

import ImageCredential from '@/assets/Credential.webp';
import { BaseModal } from '@/components/BaseModal';
import { Image } from '@/components/Image';
import { SIZE } from '@/config/responsive';
import type { CredentialProps } from '@/config/types';
import {
  TRANSITION_STANDARD,
  transparentModalContentSx,
  visuallyHiddenSx,
} from '@/styles/shared';

const linkBoxSx: SxProps<Theme> = {
  display: 'block',
  width: 1, // = 100%
  height: 1, // = 100%
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
  width: 1, // = 100%
  height: 1, // = 100%
  transition: TRANSITION_STANDARD,
};

const hoverTextSx: SxProps<Theme> = {
  position: 'absolute',
  top: '45%',
  left: '50%',
  width: 1, // = 100%
  transform: 'translate(-50%, -50%)',
  color: 'primary.contrastText',
  fontSize: SIZE.credentialText,
  textAlign: 'center',
  opacity: 0,
  transition: TRANSITION_STANDARD,
  textShadow: (theme) => theme.shadows[4],
  pointerEvents: 'none',
};

const imageSx: SxProps<Theme> = {
  maxWidth: '90vw',
  maxHeight: '90vh',
  width: 'auto',
  height: 'auto',
  objectFit: 'contain',
  transition: TRANSITION_STANDARD,
  display: 'block',
};

// Component for displaying a credential
function Credential({
  open,
  onClose,
}: Readonly<CredentialProps>): React.JSX.Element {
  return (
    <BaseModal
      open={open}
      onClose={onClose}
      animationPreset="modal"
      ariaLabelledBy="credential-modal-title"
      ariaDescribedBy="credential-modal-description"
      transparentPaper
      maxWidth={false}
      fullWidth={false}
      contentSx={transparentModalContentSx}
    >
      <DialogTitle id="credential-modal-title" sx={visuallyHiddenSx}>
        Educational Credential
      </DialogTitle>
      <Box sx={{ position: 'relative', display: 'inline-block' }}>
        <Box
          component="a"
          href="https://www.credential.net/dd705ce7-f66c-456a-b07d-e8712cd7287c#gs.cubcle"
          target="_blank"
          rel="noopener noreferrer"
          aria-describedby="credential-modal-description"
          sx={linkBoxSx}
        >
          <Box sx={imageWrapperSx}>
            <Image
              src={ImageCredential}
              alt="Credential"
              className="credential-image"
              sx={imageSx}
              radius="rounded"
            />
            <Stack
              className="hover-text"
              direction="column"
              alignItems="center"
              justifyContent="center"
              sx={hoverTextSx}
              id="credential-modal-description"
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
    </BaseModal>
  );
}

export { Credential };
