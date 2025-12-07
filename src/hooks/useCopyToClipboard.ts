import { startTransition, useOptimistic, useState } from 'react';

import type {
  CopyFn,
  CopyResult,
  UseCopyToClipboardReturn,
} from '@/config/types';

import { useSnackbar } from './useSnackbar';

const isClipboardSupported =
  typeof navigator !== 'undefined' && Boolean(navigator.clipboard);

// Copies text to clipboard with success/error state tracking
function useCopyToClipboard(): UseCopyToClipboardReturn {
  const [state, setState] = useState<CopyResult>({
    value: null,
    success: null,
  });

  const copyToClipboard: CopyFn = async (text) => {
    if (!isClipboardSupported) {
      setState({ value: null, success: false });
      return false;
    }

    try {
      await navigator.clipboard.writeText(text);
      setState({ value: text, success: true });
      return true;
    } catch {
      setState({ value: null, success: false });
      return false;
    }
  };

  return [copyToClipboard, state];
}

// Optimistic copy state for instant feedback
type OptimisticCopyState = 'idle' | 'success' | 'error';

// Combines copy-to-clipboard with automatic snackbar feedback and optimistic UI
export function useCopyWithFeedback() {
  const [copyToClipboard] = useCopyToClipboard();
  const { showSnackbar } = useSnackbar();

  // Optimistic state: immediately show success before clipboard API confirms
  const [optimisticState, setOptimisticState] = useOptimistic<
    OptimisticCopyState,
    OptimisticCopyState
  >('idle', (_current, newState) => newState);

  return {
    optimisticCopyState: optimisticState,
    copyWithFeedback: async (
      text: string,
      successMessage = 'Copied to clipboard',
      errorMessage = 'Unable to copy'
    ) => {
      // Optimistically show success immediately for better UX
      startTransition(async () => {
        setOptimisticState('success');

        const success = await copyToClipboard(text);

        if (success) {
          showSnackbar(successMessage, 'success');
        } else {
          // Revert optimistic state on failure
          setOptimisticState('error');
          showSnackbar(errorMessage, 'error');
        }
      });

      // Return actual clipboard result
      return copyToClipboard(text);
    },
  };
}
