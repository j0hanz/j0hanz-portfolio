import { useEffect, useRef, useState } from 'react';

// Returns the value from the previous render
// Uses state to expose previous value (ref access during render forbidden by React Compiler)
// Effect updates refs after render to track current → previous transition
export function usePrevious<T>(value: T): T | undefined {
  const [previous, setPrevious] = useState<T | undefined>(undefined);
  const currentRef = useRef<T>(value);

  // Update previous state and current ref after each render
  useEffect(() => {
    setPrevious(currentRef.current);
    currentRef.current = value;
  }, [value]);

  return previous;
}

export default usePrevious;
