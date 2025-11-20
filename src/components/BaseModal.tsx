import React from 'react';

import { HiXMark } from 'react-icons/hi2';

import { Box, Dialog, DialogContent, IconButton } from '@mui/material';
import { AnimatePresence, motion } from 'motion/react';

import { BaseModalProps } from '@/config/types';
import { useAnimationConfig } from '@/hooks';
import { motionVariants } from '@/utils/motionVariants';

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

  let transition = getTransition('smooth');

  if (animationPreset === 'slideDown') {
    transition = getTransition('smooth', { duration: 0.45 });
  } else if (animationPreset === 'zoomOut') {
    transition = getTransition('springy', { duration: 0.4 });
  }

  const modalVariant =
    motionVariants.exit[animationPreset] ?? motionVariants.exit.modal;

  return (
    <AnimatePresence initial={false} mode="wait">
      {show ? (
        <Dialog
          open
          onClose={handleClose}
          className={className}
          maxWidth="md"
          fullWidth
        >
          <DialogContent
            className={bodyClassName}
            sx={{
              p: 0,
              position: 'relative',
              overflow: 'visible',
              ...contentSx,
            }}
          >
            <Box
              component={motion.div}
              {...modalVariant}
              transition={transition}
              style={{ transformOrigin: 'center' }}
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
                <HiXMark size="1.2rem" />
              </IconButton>
              {children}
            </Box>
          </DialogContent>
        </Dialog>
      ) : null}
    </AnimatePresence>
  );
}

export default BaseModal;
