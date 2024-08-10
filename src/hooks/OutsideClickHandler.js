import { useEffect, useRef, useState } from 'react';

const useClickOutsideToggle = ({ ignoreRefs = [] } = {}) => {
  const [expanded, setExpanded] = useState(false);
  const ref = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      const isOutsideClick =
        !ref.current?.contains(event.target) &&
        ignoreRefs.every(
          (ignoreRef) => !ignoreRef.current?.contains(event.target),
        );

      if (isOutsideClick) {
        setExpanded(false);
      }
    };

    document.addEventListener('mouseup', handleClickOutside);
    return () => {
      document.removeEventListener('mouseup', handleClickOutside);
    };
  }, [ignoreRefs]);

  return { expanded, setExpanded, ref };
};

export default useClickOutsideToggle;
