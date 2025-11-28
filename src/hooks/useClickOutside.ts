import { useEffect, useRef } from 'react';
import type React from 'react';

import type { UseClickOutsideOptions } from '@/config/types';

import useEventCallback from './useEventCallback';

// Handles clicks outside a ref (for modals, dropdowns, etc.)
// Note: For most cases, prefer MUI's ClickAwayListener component:
// import ClickAwayListener from '@mui/material/ClickAwayListener';
// <ClickAwayListener onClickAway={handleClose}>{children}</ClickAwayListener>
export function useClickOutside<T extends HTMLElement = HTMLElement>(
  handler: () => void,
  options?: UseClickOutsideOptions
): React.RefObject<T | null> {
  const ref = useRef<T>(null);
  const stableHandler = useEventCallback(handler);
  const { enabled = true } = options ?? {};

  useEffect(() => {
    if (!enabled) return;

    const handleClickOutside = (event: MouseEvent | TouchEvent) => {
      if (
        ref.current instanceof HTMLElement &&
        event.target instanceof Node &&
        !ref.current.contains(event.target)
      ) {
        stableHandler();
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    document.addEventListener('touchstart', handleClickOutside);

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      document.removeEventListener('touchstart', handleClickOutside);
    };
  }, [enabled, stableHandler]);

  return ref;
}
