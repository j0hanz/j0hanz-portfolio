import { useInsertionEffect, useRef } from 'react';

// Combines multiple refs into single ref callback
// React Compiler auto-stabilizes the returned callback
export function useCombinedRefs<T>(
  ...refs: (React.Ref<T> | undefined | null)[]
) {
  const refsRef = useRef(refs);

  useInsertionEffect(() => {
    refsRef.current = refs;
  });

  // React Compiler automatically stabilizes this callback
  return (element: T | null) => {
    refsRef.current.forEach((ref) => {
      if (!ref) return;
      if (typeof ref === 'function') {
        ref(element);
      } else {
        (ref as React.MutableRefObject<T | null>).current = element;
      }
    });
  };
}

export default useCombinedRefs;
