import { RefObject, useState } from 'react';

import useEventCallback from './useEventCallback';
import useEventListener from './useEventListener';

// Detects if the mouse is hovering over a specific element
export function useHover<T extends HTMLElement = HTMLElement>(
  elementRef: RefObject<T | null>
): boolean {
  const [value, setValue] = useState<boolean>(false);

  // Use stable callbacks to prevent effect re-runs
  const handleMouseEnter = useEventCallback(() => setValue(true));
  const handleMouseLeave = useEventCallback(() => setValue(false));

  useEventListener('mouseenter', handleMouseEnter, elementRef);
  useEventListener('mouseleave', handleMouseLeave, elementRef);

  return value;
}

export default useHover;
