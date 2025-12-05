import { useEffect, useRef, useState } from 'react';

// Returns the value from the previous render
// Uses ref to track current value and state for render-time access
export function usePrevious<T>(value: T): T | undefined {
  const ref = useRef(value);
  const [previous, setPrevious] = useState<T | undefined>(undefined);

  useEffect(() => {
    setPrevious(ref.current);
    ref.current = value;
  }, [value]);

  return previous;
}

export default usePrevious;
