import { lazy } from 'react';

import {
  EmailRounded,
  FolderTwoTone,
  HomeTwoTone,
  PersonOutlineOutlined,
  WorkOutlineTwoTone,
} from '@mui/icons-material';

import type { Section } from '@/config/types';

// Lazy load section components for code splitting
const Hero = lazy(() =>
  import('@/features/hero/Hero').then((m) => ({ default: m.Hero }))
);
const AboutMe = lazy(() =>
  import('@/features/about/AboutMe').then((m) => ({ default: m.AboutMe }))
);
const WorkExperience = lazy(() =>
  import('@/features/experience/WorkExperience').then((m) => ({
    default: m.WorkExperience,
  }))
);
const Portfolio = lazy(() =>
  import('@/features/projects/Portfolio').then((m) => ({
    default: m.Portfolio,
  }))
);
const ContactForm = lazy(() =>
  import('@/features/contact/ContactForm').then((m) => ({
    default: m.ContactForm,
  }))
);
const Footer = lazy(() =>
  import('@/components/Footer').then((m) => ({ default: m.Footer }))
);

export const sections: Section[] = [
  {
    id: 'hero',
    Component: Hero,
    title: 'Home',
    hash: '#hero',
    icon: HomeTwoTone,
  },
  {
    id: 'aboutMe',
    Component: AboutMe,
    title: 'About Me',
    hash: '#aboutMe',
    icon: PersonOutlineOutlined,
  },
  {
    id: 'portfolio',
    Component: Portfolio,
    title: 'Projects',
    hash: '#portfolio',
    icon: FolderTwoTone,
  },
  {
    id: 'workExperience',
    Component: WorkExperience,
    title: 'Experience',
    hash: '#workExperience',
    icon: WorkOutlineTwoTone,
  },
  {
    id: 'contact',
    Component: ContactForm,
    title: 'Contact',
    hash: '#contact',
    icon: EmailRounded,
  },
  {
    id: 'footer',
    Component: Footer,
    title: 'Footer',
    hash: '#footer',
    disableScrollLock: true,
  },
];

export const getSectionByHash = (hash: string): Section | undefined =>
  sections.find((s) => s.hash === hash);
