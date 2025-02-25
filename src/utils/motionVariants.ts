const transition = {
  duration: 0.8,
  delay: 0.2,
  ease: 'easeInOut',
};

const defaultVariant = {
  initial: { opacity: 0, y: 95 },
  whileInView: { opacity: 1, y: 0 },
};

const motionVariants = {
  hero: { initial: { opacity: 0 }, whileInView: { opacity: 1 } },
  aboutMe: defaultVariant,
  education: defaultVariant,
  skills: defaultVariant,
  portfolio: defaultVariant,
  workExperience: defaultVariant,
  contact: defaultVariant,
  slideFromLeft: {
    initial: { opacity: 0, x: -95 },
    whileInView: { opacity: 1, x: 0 },
  },
  slideFromRight: {
    initial: { opacity: 0, x: 95 },
    whileInView: { opacity: 1, x: 0 },
  },
  slideFromLeftAndRight: {
    initial: { opacity: 0, x: -95 },
    whileInView: { opacity: 1, x: 95 },
  },
};

export { transition, motionVariants };
