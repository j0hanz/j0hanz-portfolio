// Combines multiple refs into single ref callback
export function useCombinedRefs<T>(
  ...refs: (React.Ref<T> | undefined | null)[]
) {
  // React Compiler auto-stabilizes this callback
  return (element: T | null) => {
    refs.forEach((ref) => {
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
