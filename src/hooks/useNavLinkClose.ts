import { useEffect } from 'react';

// Closes Offcanvas on nav link click
export default function useNavLinkClose(
  show: boolean,
  selector: string,
  onClose: () => void,
) {
  useEffect(() => {
    if (!show) return;
    const handleClick = (e: MouseEvent) => {
      if ((e.target as Element).closest(selector)) onClose();
    };
    document.addEventListener('click', handleClick);
    return () => document.removeEventListener('click', handleClick);
  }, [show, selector, onClose]);
}
