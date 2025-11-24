import { useState } from 'react';

import { UseCounterReturn } from '@/config/types';

export function useCounter(initialValue = 0) {
  const [count, setCount] = useState(initialValue);

  const increment = () => setCount((prev) => prev + 1);
  const decrement = () => setCount((prev) => prev - 1);
  const reset = () => setCount(initialValue);
  const set = (value: number) => setCount(value);

  return {
    count,
    increment,
    decrement,
    reset,
    set,
  } satisfies UseCounterReturn;
}

export default useCounter;
