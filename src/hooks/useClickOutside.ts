import { useEffect, useRef } from 'react';
import type React from 'react';

import useEventCallback from './useEventCallback';

interface UseClickOutsideOptions {
  enabled?: boolean;
}

/**
 * Custom hook to handle clicks outside of a referenced element.
 * Useful for closing modals, dropdowns, and other dismissible UI elements.
 *
 * @param handler - Callback to execute when clicking outside
 * @param options - Configuration options
 * @returns Ref to attach to the element
 */
export function useClickOutside<T extends HTMLElement = HTMLElement>(
  handler: () => void,
  options?: UseClickOutsideOptions
): React.RefObject<T | null> {
  const ref = useRef<T>(null);
  const stableHandler = useEventCallback(handler);
  const { enabled = true } = options ?? {};

  useEffect(() => {
    if (!enabled) {
      return undefined;
    }

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
  }, [enabled, stableHandler]);

  return ref;
}
