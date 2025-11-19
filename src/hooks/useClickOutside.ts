import { useEffect, useRef } from 'react';

import useEventCallback from './useEventCallback';

/**
 * Custom hook to handle clicks outside of a referenced element
 * Useful for closing modals, dropdowns, etc.
 *
 * @example
 * const ref = useClickOutside(() => setIsOpen(false));
 * return <div ref={ref}>...</div>
 */
export function useClickOutside<T extends HTMLElement = HTMLElement>(
  handler: () => void
) {
  const ref = useRef<T>(null);
  const stableHandler = useEventCallback(handler);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent | TouchEvent) => {
      if (
        ref.current instanceof HTMLElement &&
        event.target instanceof Node &&
        !ref.current.contains(event.target)
      ) {
        stableHandler?.();
      }
    };

    // Bind events
    document.addEventListener('mousedown', handleClickOutside);
    document.addEventListener('touchstart', handleClickOutside);

    // Cleanup
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      document.removeEventListener('touchstart', handleClickOutside);
    };
  }, [stableHandler]);

  return ref;
}
