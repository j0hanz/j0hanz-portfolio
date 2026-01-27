import { type RefObject, useState } from 'react';

import { useEventListener } from './useEventListener';

// Detects if the mouse is hovering over a specific element
export function useHover<T extends HTMLElement = HTMLElement>(
  elementRef: RefObject<T | null>
): boolean {
  const [value, setValue] = useState<boolean>(false);

  // React Compiler auto-stabilizes these callbacks
  useEventListener('mouseenter', () => setValue(true), elementRef);
  useEventListener('mouseleave', () => setValue(false), elementRef);

  return value;
}
