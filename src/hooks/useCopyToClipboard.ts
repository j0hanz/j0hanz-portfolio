import { useState } from 'react';

type CopyResult = {
  value: string | null;
  success: boolean | null;
};

type CopyFn = (text: string) => Promise<boolean>;

type UseCopyToClipboardReturn = [CopyFn, CopyResult];

const isClipboardSupported = () =>
  typeof navigator !== 'undefined' && Boolean(navigator.clipboard);

/**
 * Hook for copying text to the clipboard with success/error state tracking.
 *
 * @returns Tuple of [copyFn, { value, success }]
 */
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
