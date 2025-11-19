import React from 'react';

import { HiXMark } from 'react-icons/hi2';

import { Dialog, DialogContent } from '@mui/material';

import { BaseModalProps } from '@/config/types';

import appStyles from '@/styles/App.module.css';

function BaseModal({
  show,
  handleClose,
  children,
  className,
  bodyClassName,
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
        sx={{ p: 0, position: 'relative' }}
      >
        <button className={appStyles.closeButton} onClick={handleClose}>
          <HiXMark className={appStyles.xMark} />
        </button>
        {children}
      </DialogContent>
    </Dialog>
  );
}

export default BaseModal;
