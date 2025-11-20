import { RefObject, useEffect } from 'react';

import { useClickOutside, useEventCallback } from '@/hooks';

// Closes Offcanvas on nav link click or when clicking outside the menu
export default function useNavLinkClose(
  show: boolean,
  selector: string,
  onClose: () => void
): RefObject<HTMLDivElement | null> {
  const stableOnClose = useEventCallback(onClose);
  const offcanvasRef = useClickOutside<HTMLDivElement>(() => {
    if (show) stableOnClose?.();
  });

  useEffect(() => {
    if (!show) return undefined;

    const handleClick = (e: MouseEvent): void => {
      const target = e.target as Element;
      if (target.closest(selector)) stableOnClose?.();
    };

    document.addEventListener('click', handleClick);
    return () => document.removeEventListener('click', handleClick);
  }, [show, selector, stableOnClose]);

  return offcanvasRef;
}
