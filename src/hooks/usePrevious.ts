import { useEffect, useRef, useState } from 'react';

// Returns the value from the previous render
// Uses state for render-safe access (React Compiler compatible)
export function usePrevious<T>(value: T): T | undefined {
  const currentRef = useRef(value);
  const [previous, setPrevious] = useState<T | undefined>(undefined);

  useEffect(() => {
    setPrevious(currentRef.current);
    currentRef.current = value;
  }, [value]);

  return previous;
}

export default usePrevious;
