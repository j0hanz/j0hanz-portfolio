import React from 'react';

import { HiXMark } from 'react-icons/hi2';

import { Dialog, DialogContent, IconButton } from '@mui/material';

import { BaseModalProps } from '@/config/types';

function BaseModal({
  show,
  handleClose,
  children,
  className,
  bodyClassName,
  contentSx,
}: BaseModalProps): React.JSX.Element {
  return (
    <Dialog
      open={show}
      onClose={handleClose}
      className={className}
      maxWidth="md"
      fullWidth
    >
      <DialogContent
        className={bodyClassName}
        sx={{ p: 0, position: 'relative', ...contentSx }}
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
            transition: 'all 0.3s ease',
            '&:hover': {
              bgcolor: '#00000067',
              opacity: 1,
            },
          }}
        >
          <HiXMark size="1.2rem" />
        </IconButton>
        {children}
      </DialogContent>
    </Dialog>
  );
}

export default BaseModal;
