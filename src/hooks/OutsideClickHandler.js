import { useState, useEffect, useRef } from 'react';

const useClickOutsideToggle = (callback) => {
  /* Track if the element is expanded */
  const [expanded, setExpanded] = useState(false);
  /* Track the element */
  const ref = useRef(null);
  useEffect(() => {
    /* Handle click outside the element */
    const handleClickOutside = (event) => {
      if (ref.current && !ref.current.contains(event.target)) {
        callback();
      }
    };
    /* Add event listener for mousedown */
    document.addEventListener('mousedown', handleClickOutside);
    /* Cleanup event listener on unmount */
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [callback]);
  /* Return expanded state, setExpanded function, and ref */
  return { expanded, setExpanded, ref };
};

export default useClickOutsideToggle;
