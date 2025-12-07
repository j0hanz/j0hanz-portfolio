import { useEffect, useState } from 'react';

// Manages initial loading state with configurable delay
// Note: Document title should be set in App.tsx or via a dedicated useDocumentTitle hook
export function useInitialLoading(delay: number): boolean {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const timer = window.setTimeout(() => setIsLoading(false), delay);
    return () => window.clearTimeout(timer);
  }, [delay]);

  return isLoading;
}
