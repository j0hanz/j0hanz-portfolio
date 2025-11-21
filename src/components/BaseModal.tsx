import { Close } from '@mui/icons-material';
import { Dialog, DialogContent, IconButton } from '@mui/material';
import { motion } from 'motion/react';

import { BaseModalProps } from '@/config/types';
import { useAnimationConfig } from '@/hooks';
import { modalVariants } from '@/utils/motionVariants';

const MotionDialogContent = motion.create(DialogContent);

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
      PaperProps={{
        sx: {
          position: 'relative',
        },
      }}
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
          sx={{
            position: 'absolute',
            top: 0,
            right: 0,
            bgcolor: '#00000067',
            borderRadius: '0 10rem 0 50rem',
            height: 35,
            width: 35,
            pl: 1,
            pb: 1,
            zIndex: 10,
            color: '#f5f4f4',
            opacity: 0.7,
            '&:hover': {
              bgcolor: '#00000067',
              opacity: 1,
            },
          }}
        >
          <Close sx={{ fontSize: '1.2rem' }} />
        </IconButton>
        {children}
      </MotionDialogContent>
    </Dialog>
  );
}

export default BaseModal;
