import { useEffect, RefObject } from 'react';

const useClickOutside = (
  ref: RefObject<HTMLDivElement | null>,
  callback: () => void,
  navLinkSelector: string,
): void => {
  // Set up event listeners to handle clicks outside the specified element and on navigation links
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (ref.current && !ref.current.contains(event.target as Node)) {
        callback();
      }
    };

    const handleNavLinkClick = (event: MouseEvent) => {
      if ((event.target as Element).closest(navLinkSelector)) {
        callback();
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    document.addEventListener('click', handleNavLinkClick);

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      document.removeEventListener('click', handleNavLinkClick);
    };
  }, [ref, callback, navLinkSelector]);
};

export default useClickOutside;
