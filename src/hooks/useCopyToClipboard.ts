import { useState } from 'react';

import type {
  CopyFn,
  CopyResult,
  UseCopyToClipboardReturn,
} from '@/config/types';

const isClipboardSupported = () =>
  typeof navigator !== 'undefined' && Boolean(navigator.clipboard);

// Copies text to clipboard with success/error state tracking
export function useCopyToClipboard(): UseCopyToClipboardReturn {
  const [state, setState] = useState<CopyResult>({
    value: null,
    success: null,
  });

  const copyToClipboard: CopyFn = async (text) => {
    if (!isClipboardSupported()) {
      console.warn('Clipboard not supported');
      setState({ value: null, success: false });
      return false;
    }

    try {
      await navigator!.clipboard!.writeText(text);
      setState({ value: text, success: true });
      return true;
    } catch (error) {
      console.warn('Copy failed', error);
      setState({ value: null, success: false });
      return false;
    }
  };

  return [copyToClipboard, state];
}

export default useCopyToClipboard;
