import { useState } from 'react';

import type {
  CopyFn,
  CopyResult,
  UseCopyToClipboardReturn,
} from '@/config/types';

import { useSnackbar } from './useSnackbar';

const isClipboardSupported =
  typeof navigator !== 'undefined' && Boolean(navigator.clipboard);

// Copies text to clipboard with success/error state tracking
export function useCopyToClipboard(): UseCopyToClipboardReturn {
  const [state, setState] = useState<CopyResult>({
    value: null,
    success: null,
  });

  const copyToClipboard: CopyFn = async (text) => {
    if (!isClipboardSupported) {
      if (import.meta.env.DEV) console.warn('Clipboard not supported');
      setState({ value: null, success: false });
      return false;
    }

    try {
      await navigator.clipboard.writeText(text);
      setState({ value: text, success: true });
      return true;
    } catch (error) {
      if (import.meta.env.DEV) console.warn('Copy failed', error);
      setState({ value: null, success: false });
      return false;
    }
  };

  return [copyToClipboard, state];
}

// Combines copy-to-clipboard with automatic snackbar feedback
export function useCopyWithFeedback() {
  const [copyToClipboard] = useCopyToClipboard();
  const { showSnackbar } = useSnackbar();

  return {
    copyWithFeedback: async (
      text: string,
      successMessage = 'Copied to clipboard',
      errorMessage = 'Unable to copy'
    ) => {
      const success = await copyToClipboard(text);
      showSnackbar(
        success ? successMessage : errorMessage,
        success ? 'success' : 'error'
      );
      return success;
    },
  };
}
