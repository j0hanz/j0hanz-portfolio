import { useState } from 'react';

import { useEventCallback } from '@/hooks';

interface UseImageLoadingReturn {
  isLoaded: boolean;
  handleLoad: () => void;
  handleError: () => void;
}

// Tracks image loading state with stable event handlers
export function useImageLoading(): UseImageLoadingReturn {
  const [isLoaded, setIsLoaded] = useState(false);

  const handleLoad = useEventCallback(() => {
    setIsLoaded(true);
  });

  const handleError = useEventCallback(() => {
    setIsLoaded(true);
  });

  return { isLoaded, handleLoad, handleError };
}

export default useImageLoading;
