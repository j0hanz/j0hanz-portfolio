import { useLayoutEffect, useRef } from 'react';

import Close from '@mui/icons-material/Close';
import {
  Dialog,
  DialogContent,
  IconButton,
  SxProps,
  Theme,
} from '@mui/material';
import { motion } from 'motion/react';

import { modalVariants } from '@/config/motion';
import { BaseModalProps } from '@/config/types';
import { useAnimationConfig } from '@/hooks';
import { SIZING } from '@/styles/shared';

const MotionDialogContent = motion.create(DialogContent);

// Asymmetric border radius for modal close button design
const CLOSE_BUTTON_BORDER_RADIUS = '0 10rem 0 50rem';

const closeButtonSx: SxProps<Theme> = {
  position: 'absolute',
  top: 0,
  right: 0,
  bgcolor: 'action.active',
  borderRadius: CLOSE_BUTTON_BORDER_RADIUS,
  // Responsive sizing: larger touch target on mobile (WCAG 2.1 AA)
  height: SIZING.closeButton,
  width: SIZING.closeButton,
  pl: { xs: 1, sm: 1, md: 1.25, lg: 1.5 },
  pb: { xs: 1, sm: 1, md: 1.25, lg: 1.5 },
  zIndex: 'modal', // Use theme z-index
  color: 'text.primary',
  opacity: 0.85,
  '&:hover': {
    bgcolor: 'action.hover',
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
  useLayoutEffect(() => {
    if (open) closeButtonRef.current?.focus();
  }, [open]);

  // Simplified transition config - direct mapping reduces cognitive load
  const transition =
    animationPreset === 'slideDown'
      ? getTransition('smooth', { duration: 0.45 })
      : animationPreset === 'zoomOut'
        ? getTransition('spring', { duration: 0.4 })
        : getTransition('smooth');

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
          <Close sx={{ fontSize: SIZING.iconXs }} />
        </IconButton>
        {children}
      </MotionDialogContent>
    </Dialog>
  );
}

export default BaseModal;
