import React from 'react';

import { HiArrowTopRightOnSquare, HiXMark } from 'react-icons/hi2';

import { Box, Dialog, DialogContent } from '@mui/material';

import ImageCredential from '@/assets/Credential.webp';
import Image from '@/components/Image';
import Spinner from '@/components/Spinner';
import { CredentialProps } from '@/config/types';
import useLoading from '@/hooks/useLoading';

import styles from './Credential.module.css';
import appStyles from '@/styles/App.module.css';

// Component for displaying a credential
function Credential({ show, handleClose }: CredentialProps): React.JSX.Element {
  const loading = useLoading();

  return (
    <Dialog open={show} onClose={handleClose} maxWidth="md" fullWidth>
      <DialogContent
        className={styles.credentialBody}
        sx={{ p: 0, position: 'relative' }}
      >
        <button className={appStyles.closeButton} onClick={handleClose}>
          <HiXMark className={appStyles.xMark} />
        </button>
        <Box sx={{ textAlign: 'center', px: 0 }}>
          {loading ? (
            <Spinner />
          ) : (
            <a
              href="https://www.credential.net/dd705ce7-f66c-456a-b07d-e8712cd7287c#gs.cubcle"
              target="_blank"
              rel="noopener noreferrer"
              className={styles.credentialLink}
            >
              <div className={styles.credentialImageContainer}>
                <Image
                  src={ImageCredential}
                  alt="Credential"
                  className={styles.credentialImage}
                />
                <div className={styles.hoverText}>
                  <HiArrowTopRightOnSquare className={styles.hoverTextIcon} />
                  View Credential
                </div>
              </div>
            </a>
          )}
        </Box>
      </DialogContent>
    </Dialog>
  );
}

export default Credential;
