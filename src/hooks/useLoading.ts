import { useState, useEffect } from 'react';

// Managing loading state with a delay
const useLoading = (
  initialState: boolean = true,
  delay: number = 2000,
): boolean => {
  const [loading, setLoading] = useState(initialState);

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, delay);

    return () => clearTimeout(timer);
  }, [delay]);

  return loading;
};

export default useLoading;
