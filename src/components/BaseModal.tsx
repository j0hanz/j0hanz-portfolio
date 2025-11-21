import Close from '@mui/icons-material/Close';
import { Dialog, DialogContent, IconButton, Theme } from '@mui/material';
import { alpha } from '@mui/material/styles';
import { SxProps } from '@mui/system';
import { motion } from 'motion/react';

import { modalVariants } from '@/config/motion';
import { BaseModalProps } from '@/config/types';
import { useAnimationConfig } from '@/hooks';

const MotionDialogContent = motion(DialogContent);

const closeButtonSx: SxProps<Theme> = {
  position: 'absolute',
  top: 0,
  right: 0,
  bgcolor: (theme) => alpha(theme.palette.common.black, 0.4),
  borderRadius: '0 10rem 0 50rem',
  height: 35,
  width: 35,
  pl: 1,
  pb: 1,
  zIndex: 10,
  color: 'common.white',
  opacity: 0.7,
  '&:hover': {
    bgcolor: (theme) => alpha(theme.palette.common.black, 0.4),
    opacity: 1,
  },
};

const paperProps = {
  sx: {
    position: 'relative',
  },
};

function BaseModal({
  show,
  handleClose,
  children,
  className,
  bodyClassName,
  contentSx,
  animationPreset = 'modal',
}: BaseModalProps): React.JSX.Element {
  const { getTransition } = useAnimationConfig();

  const transitionPresets: Record<
    typeof animationPreset,
    ReturnType<typeof getTransition>
  > = {
    modal: getTransition('smooth'),
    slideDown: getTransition('smooth', { duration: 0.45 }),
    zoomOut: getTransition('spring', { duration: 0.4 }),
  };

  const transition = transitionPresets[animationPreset];
  const modalVariant = modalVariants[animationPreset];

  return (
    <Dialog
      open={show}
      onClose={handleClose}
      className={className}
      maxWidth="md"
      fullWidth
      PaperProps={paperProps}
    >
      <MotionDialogContent
        {...modalVariant}
        transition={transition}
        className={bodyClassName}
        sx={{
          p: 0,
          position: 'relative',
          overflow: 'visible',
          transformOrigin: 'center',
          ...contentSx,
        }}
      >
        <IconButton
          onClick={handleClose}
          aria-label="Close modal"
          sx={closeButtonSx}
        >
          <Close sx={{ fontSize: '1.2rem' }} />
        </IconButton>
        {children}
      </MotionDialogContent>
    </Dialog>
  );
}

export default BaseModal;
