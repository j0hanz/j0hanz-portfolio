import { lazy } from 'react';

import {
  EmailRounded,
  FolderTwoTone,
  HomeTwoTone,
  PersonOutlineOutlined,
  WorkOutlineTwoTone,
} from '@mui/icons-material';

import type { Section } from '@/config/types';
// Import non-lazy section components used outside of main sections
import Portfolio from '@/features/projects/Portfolio';

// Lazy load section components for code splitting
const Hero = lazy(() => import('@/features/hero/Hero'));
const AboutMe = lazy(() => import('@/features/about/AboutMe'));
const WorkExperience = lazy(
  () => import('@/features/experience/WorkExperience')
);
const ContactForm = lazy(() =>
  import('@/features/contact/ContactForm').then((m) => ({
    default: m.ContactForm,
  }))
);
const Footer = lazy(() => import('@/components/Footer'));

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
