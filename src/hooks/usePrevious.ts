import { useEffect, useRef, useState } from 'react';

// Returns the value from the previous render
// State-based tracking required: React Compiler forbids ref access during render
export function usePrevious<T>(value: T): T | undefined {
  const [previous, setPrevious] = useState<T | undefined>(undefined);
  const currentRef = useRef<T>(value);

  useEffect(() => {
    setPrevious(currentRef.current);
    currentRef.current = value;
  }, [value]);

  return previous;
}

export default usePrevious;
