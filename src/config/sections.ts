import Footer from '@/components/Footer';
import type { Section } from '@/config/types';
import AboutMe from '@/features/about/AboutMe';
import ContactForm from '@/features/contact/ContactForm';
import Education from '@/features/education/Education';
import WorkExperience from '@/features/experience/WorkExperience';
import Hero from '@/features/hero/Hero';
import Portfolio from '@/features/projects/Portfolio';
import Skills from '@/features/skills/Skills';

export const sections: Section[] = [
  { id: 'hero', Component: Hero, label: 'Home' },
  { id: 'aboutMe', Component: AboutMe, label: 'About Me' },
  { id: 'education', Component: Education, label: 'Education' },
  { id: 'skills', Component: Skills, label: 'Skills' },
  { id: 'portfolio', Component: Portfolio, label: 'Projects' },
  { id: 'workExperience', Component: WorkExperience, label: 'Experience' },
  { id: 'contact', Component: ContactForm, label: 'Contact' },
  { id: 'footer', Component: Footer, label: 'Footer' },
];
