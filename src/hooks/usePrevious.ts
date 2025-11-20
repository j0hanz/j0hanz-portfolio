import { useState } from 'react';

export function usePrevious<T>(value: T): T | undefined {
  const [state, setState] = useState<{ value: T; prev: T | undefined }>({
    value,
    prev: undefined,
  });

  if (state.value !== value) {
    setState({
      value,
      prev: state.value,
    });
  }

  return state.prev;
}

export default usePrevious;
