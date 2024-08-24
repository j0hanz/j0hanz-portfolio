import { useEffect, useRef, useState, useCallback } from 'react';

// Custom hook for handling click outside to toggle a state
const useClickOutsideToggle = ({ ignoreRefs = [] } = {}) => {
  const [expanded, setExpanded] = useState(false);
  const ref = useRef(null);

  // Callback function to handle click outside
  const handleClickOutside = useCallback(
    (event) => {
      if (
        ref.current &&
        !ref.current.contains(event.target) &&
        !ignoreRefs.some((ignoreRef) =>
          ignoreRef.current?.contains(event.target),
        )
      ) {
        setExpanded(false);
      }
    },
    [ignoreRefs],
  );

  // Effect to add and clean up the event listener for mouseup
  useEffect(() => {
    document.addEventListener('mouseup', handleClickOutside);
    return () => {
      document.removeEventListener('mouseup', handleClickOutside);
    };
  }, [handleClickOutside]);

  return { expanded, setExpanded, ref };
};

export default useClickOutsideToggle;
