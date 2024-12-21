import React, { useEffect, useRef } from 'react';
import ScrollReveal from 'scrollreveal';

const ScrollRevealWrapper = ({ children, config }) => {
  const sectionRef = useRef(null);

  useEffect(() => {
    // Initialize ScrollReveal with default and custom config
    const sr = ScrollReveal({
      origin: 'bottom',
      distance: '20px',
      duration: 1500,
      delay: 100,
      reset: true,
      ...config,
    });

    // Apply reveal effect to the section
    sr.reveal(sectionRef.current);
  }, [config]);

  return <div ref={sectionRef}>{children}</div>;
};

export default ScrollRevealWrapper;
