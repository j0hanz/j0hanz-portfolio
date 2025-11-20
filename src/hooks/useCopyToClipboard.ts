import { useState } from 'react';

type CopyFn = (text: string) => Promise<boolean>;

export function useCopyToClipboard(): [
  CopyFn,
  { value: string | null; success: boolean | null },
] {
  const [value, setValue] = useState<string | null>(null);
  const [success, setSuccess] = useState<boolean | null>(null);

  const copyToClipboard: CopyFn = async (text) => {
    if (!navigator?.clipboard) {
      console.warn('Clipboard not supported');
      setSuccess(false);
      return false;
    }

    try {
      await navigator.clipboard.writeText(text);
      setValue(text);
      setSuccess(true);
      return true;
    } catch (error) {
      console.warn('Copy failed', error);
      setValue(null);
      setSuccess(false);
      return false;
    }
  };

  return [copyToClipboard, { value, success }];
}

export default useCopyToClipboard;
