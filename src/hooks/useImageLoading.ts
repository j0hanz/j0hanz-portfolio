import { useState } from 'react';

import useEventCallback from './useEventCallback';

export interface UseImageLoadingReturn {
  isLoaded: boolean;
  handleLoad: () => void;
  handleError: () => void;
  reset: () => void;
}

// Tracks image loading state with stable event handlers
export function useImageLoading(): UseImageLoadingReturn {
  const [isLoaded, setIsLoaded] = useState(false);

  // Both load and error mark the image as "loaded" (no longer loading)
  const markComplete = useEventCallback(() => setIsLoaded(true));
  const reset = useEventCallback(() => setIsLoaded(false));

  return {
    isLoaded,
    handleLoad: markComplete,
    handleError: markComplete,
    reset,
  };
}

export default useImageLoading;
