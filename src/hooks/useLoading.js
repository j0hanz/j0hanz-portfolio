import { useState, useEffect } from 'react';

/* Custom hook to manage loading state with a delay */
const useLoading = (initialState = true, delay = 2000) => {
  /* State to track loading status */
  const [loading, setLoading] = useState(initialState);
  useEffect(() => {
    /* Set a timer to change loading state after the specified delay */
    const timer = setTimeout(() => {
      setLoading(false);
    }, delay);
    /* Cleanup the timer when the component unmounts or delay changes */
    return () => clearTimeout(timer);
  }, [delay]);
  /* Return the current loading state */
  return loading;
};

export default useLoading;
