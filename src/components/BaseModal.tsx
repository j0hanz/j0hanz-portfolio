import { useLayoutEffect, useRef } from 'react';

import Close from '@mui/icons-material/Close';
import { Dialog, DialogContent, IconButton, Theme } from '@mui/material';
import { alpha } from '@mui/material/styles';
import { SxProps } from '@mui/system';
import { motion } from 'motion/react';

import { modalVariants } from '@/config/motion';
import { BaseModalProps } from '@/config/types';
import { useAnimationConfig } from '@/hooks';

const MotionDialogContent = motion.create(DialogContent);

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

function BaseModal({
  open,
  onClose,
  children,
  className,
  bodyClassName,
  contentSx,
  animationPreset = 'modal',
  ariaLabelledBy,
  ariaDescribedBy,
  transparentPaper = false,
  maxWidth = 'md',
  fullWidth = true,
}: BaseModalProps): React.JSX.Element {
  const { getTransition } = useAnimationConfig();
  const closeButtonRef = useRef<HTMLButtonElement>(null);

  // Auto-focus close button synchronously when modal opens
  // useLayoutEffect ensures focus happens before browser paint
  useLayoutEffect(() => {
    if (open) {
      closeButtonRef.current?.focus();
    }
  }, [open]);

  // Config-driven transition selection - eliminates nested ternary for KISS compliance
  const transitionConfigs = {
    slideDown: () => getTransition('smooth', { duration: 0.45 }),
    zoomOut: () => getTransition('spring', { duration: 0.4 }),
    modal: () => getTransition('smooth'),
  } as const;
  const transition = transitionConfigs[animationPreset]();
  const modalVariant = modalVariants[animationPreset];

  return (
    <Dialog
      open={open}
      onClose={onClose}
      className={className}
      maxWidth={maxWidth}
      fullWidth={fullWidth}
      aria-labelledby={ariaLabelledBy}
      aria-describedby={ariaDescribedBy}
      disableRestoreFocus
      keepMounted={false}
      slotProps={{
        paper: {
          sx: {
            position: 'relative',
            ...(transparentPaper && {
              bgcolor: 'transparent',
              boxShadow: 'none',
              backgroundImage: 'none',
            }),
          },
        },
        backdrop: {
          sx: {
            // Ensure backdrop doesn't interfere with focus management
            pointerEvents: 'auto',
          },
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
          ref={closeButtonRef}
          onClick={onClose}
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
