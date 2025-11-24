import { useEffect, useState } from 'react';

// Debounces a value by delaying updates until delay (ms) elapses
export function useDebounce<T>(value: T, delay: number) {
  const [debouncedValue, setDebouncedValue] = useState<T>(value);

  useEffect(() => {
    const handler = window.setTimeout(() => {
      setDebouncedValue(value);
    }, delay);

    return () => {
      window.clearTimeout(handler);
    };
  }, [delay, value]);

  return debouncedValue;
}

export default useDebounce;
