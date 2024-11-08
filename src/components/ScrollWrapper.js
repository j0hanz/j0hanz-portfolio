import React, { useEffect, useRef } from 'react';
import ScrollReveal from 'scrollreveal';

const ScrollRevealWrapper = ({ children, config }) => {
  const sectionRef = useRef(null);

  useEffect(() => {
    const sr = ScrollReveal({
      origin: 'bottom',
      distance: '20px',
      duration: 1500,
      delay: 100,
      reset: true,
      ...config,
    });

    sr.reveal(sectionRef.current);
  }, [config]);

  return <div ref={sectionRef}>{children}</div>;
};

export default ScrollRevealWrapper;
