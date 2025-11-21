import { useRef } from 'react';

import useEventCallback from './useEventCallback';

/**
 * Combines multiple refs into a single ref callback.
 * Useful when you need to attach multiple refs to the same element.
 *
 * @returns An object containing the internal ref and a function to attach multiple external refs.
 */
export function useCombinedRefs<T extends HTMLElement>() {
  const innerRef = useRef<T | null>(null);

  const attachRefs = useEventCallback(
    (...refs: ((node: T | null) => void)[]) =>
      (node: T | null) => {
        innerRef.current = node;
        refs.forEach((ref) => {
          if (typeof ref === 'function') {
            ref(node);
          }
        });
      }
  );

  return { innerRef, attachRefs };
}

export default useCombinedRefs;
