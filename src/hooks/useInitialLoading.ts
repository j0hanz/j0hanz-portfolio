import { useEffect, useState, useTransition } from 'react';

// Manages initial loading state with configurable delay
export function useInitialLoading(delay: number): {
  isLoading: boolean;
  isPending: boolean;
} {
  const [isLoading, setIsLoading] = useState(true);
  const [isPending, startTransition] = useTransition();

  useEffect(() => {
    const timer = window.setTimeout(() => {
      startTransition(() => setIsLoading(false));
    }, delay);
    return () => window.clearTimeout(timer);
  }, [delay]);

  return { isLoading, isPending };
}
