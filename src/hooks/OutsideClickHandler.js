import { useEffect, useRef, useState, useCallback } from 'react';

/* Custom hook to handle the navbar's expanded state and detect clicks outside */
const useClickOutsideToggle = (callback) => {
  const [expanded, setExpanded] = useState(false);
  const ref = useRef(null);

  const handleClickOutside = useCallback(
    (event) => {
      if (ref.current && !ref.current.contains(event.target)) {
        setExpanded(false);
        if (callback) callback();
      }
    },
    [callback]
  );

  useEffect(() => {
    document.addEventListener('mouseup', handleClickOutside);
    return () => {
      document.removeEventListener('mouseup', handleClickOutside);
    };
  }, [handleClickOutside]);

  return { expanded, setExpanded, ref };
};

export default useClickOutsideToggle;
