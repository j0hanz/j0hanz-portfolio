export const transitions = {
  spring: {
    type: 'spring' as const,
    stiffness: 100,
    damping: 15,
    mass: 1,
  },
  smooth: {
    type: 'tween' as const,
    ease: [0.25, 0.25, 0.25, 0.75] as const,
    duration: 0.4,
  },
  slow: {
    type: 'tween' as const,
    ease: [0.25, 0.1, 0.25, 1] as const,
    duration: 0.8,
  },
};

export const motionVariants = {
  fadeIn: {
    initial: { opacity: 0 },
    animate: { opacity: 1, transition: transitions.smooth },
    exit: { opacity: 0, transition: transitions.smooth },
  },
  fadeUp: {
    initial: { opacity: 0, y: 30 },
    animate: { opacity: 1, y: 0, transition: transitions.spring },
    exit: { opacity: 0, y: 20, transition: transitions.smooth },
  },
  fadeDown: {
    initial: { opacity: 0, y: -30 },
    animate: { opacity: 1, y: 0, transition: transitions.spring },
    exit: { opacity: 0, y: -20, transition: transitions.smooth },
  },
  scaleIn: {
    initial: { opacity: 0, scale: 0.9 },
    animate: { opacity: 1, scale: 1, transition: transitions.spring },
    exit: { opacity: 0, scale: 0.9, transition: transitions.smooth },
  },
  blurIn: {
    initial: { opacity: 0, filter: 'blur(10px)' },
    animate: { opacity: 1, filter: 'blur(0px)', transition: transitions.slow },
    exit: { opacity: 0, filter: 'blur(10px)', transition: transitions.smooth },
  },
  staggerContainer: {
    initial: {},
    animate: {
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.1,
      },
    },
  },
  staggerItem: {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0, transition: transitions.spring },
  },
  slideFromLeft: {
    initial: { x: -50, opacity: 0 },
    animate: { x: 0, opacity: 1, transition: transitions.spring },
  },
  slideFromRight: {
    initial: { x: 50, opacity: 0 },
    animate: { x: 0, opacity: 1, transition: transitions.spring },
  },
  // Legacy support for existing code, mapped to new variants
  sections: {
    hero: { initial: { opacity: 0, y: 20 }, whileInView: { opacity: 1, y: 0 } },
    aboutMe: {
      initial: { opacity: 0, y: 30 },
      whileInView: { opacity: 1, y: 0 },
    },
    education: {
      initial: { opacity: 0, y: 30 },
      whileInView: { opacity: 1, y: 0 },
    },
    skills: {
      initial: { opacity: 0, y: 30 },
      whileInView: { opacity: 1, y: 0 },
    },
    portfolio: {
      initial: { opacity: 0, y: 30 },
      whileInView: { opacity: 1, y: 0 },
    },
    workExperience: {
      initial: { opacity: 0, y: 30 },
      whileInView: { opacity: 1, y: 0 },
    },
    contact: {
      initial: { opacity: 0, y: 30 },
      whileInView: { opacity: 1, y: 0 },
    },
  },
  gesture: {
    hover: { scale: 1.05, transition: transitions.spring },
    tap: { scale: 0.95, transition: transitions.spring },
    cardHover: {
      rest: { scale: 1, y: 0 },
      hover: { scale: 1.03, y: -5, transition: transitions.spring },
      tap: { scale: 0.98, transition: transitions.spring },
    },
    buttonTap: {
      rest: { scale: 1 },
      hover: { scale: 1.05, transition: transitions.spring },
      tap: { scale: 0.95, transition: transitions.spring },
    },
  },
  exit: {
    modal: {
      initial: { opacity: 0, scale: 0.9 },
      animate: { opacity: 1, scale: 1, transition: transitions.spring },
      exit: { opacity: 0, scale: 0.9, transition: transitions.smooth },
    },
    slideDown: {
      initial: { opacity: 0, y: -20 },
      animate: { opacity: 1, y: 0, transition: transitions.spring },
      exit: { opacity: 0, y: 20, transition: transitions.smooth },
    },
    zoomOut: {
      initial: { opacity: 0, scale: 0.9 },
      animate: { opacity: 1, scale: 1, transition: transitions.spring },
      exit: { opacity: 0, scale: 0.8, transition: transitions.smooth },
    },
    toast: {
      initial: { opacity: 0, y: -20, scale: 0.9 },
      animate: { opacity: 1, y: 0, scale: 1, transition: transitions.spring },
      exit: { opacity: 0, y: -20, scale: 0.9, transition: transitions.smooth },
    },
  },
  // Alias for backward compatibility if needed
  stagger: {
    container: {
      initial: {},
      animate: {
        transition: {
          staggerChildren: 0.1,
          delayChildren: 0.1,
        },
      },
    },
    item: {
      initial: { opacity: 0, y: 20 },
      animate: { opacity: 1, y: 0, transition: transitions.spring },
    },
  },
} as const;
