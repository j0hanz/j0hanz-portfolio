import { useEffect, useState } from 'react';

import { APP_COPY } from '@/config/constants';

const APP_TITLE = APP_COPY.title;

// Manages initial loading state and sets document title
export function useInitialLoading(delay: number) {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    document.title = APP_TITLE;
    const timer = window.setTimeout(() => setIsLoading(false), delay);
    return () => window.clearTimeout(timer);
  }, [delay]);

  return isLoading;
}
