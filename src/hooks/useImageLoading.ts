import { useState } from 'react';

import type { UseImageLoadingReturn } from '@/config/types';

import useEventCallback from './useEventCallback';

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
