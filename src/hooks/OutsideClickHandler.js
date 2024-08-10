import { useEffect, useRef, useState, useCallback } from 'react';

const useClickOutsideToggle = ({ ignoreRefs = [] } = {}) => {
  const [expanded, setExpanded] = useState(false);
  const ref = useRef(null);
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

  useEffect(() => {
    document.addEventListener('mouseup', handleClickOutside);
    return () => {
      document.removeEventListener('mouseup', handleClickOutside);
    };
  }, [handleClickOutside]);

  return { expanded, setExpanded, ref };
};

export default useClickOutsideToggle;
