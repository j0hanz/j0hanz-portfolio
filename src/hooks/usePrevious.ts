import { useEffect, useRef, useState } from 'react';

// Returns the value from the previous render using effect-based tracking
export function usePrevious<T>(value: T): T | undefined {
  const [previous, setPrevious] = useState<T | undefined>(undefined);
  const currentRef = useRef(value);

  useEffect(() => {
    setPrevious(currentRef.current);
    currentRef.current = value;
  }, [value]);

  return previous;
}

export default usePrevious;
