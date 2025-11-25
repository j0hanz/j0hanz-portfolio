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
const Hero = lazy(() => import('@/features/hero/Hero'));
const AboutMe = lazy(() => import('@/features/about/AboutMe'));
const Portfolio = lazy(() => import('@/features/projects/Portfolio'));
const WorkExperience = lazy(
  () => import('@/features/experience/WorkExperience')
);
const ContactForm = lazy(() => import('@/features/contact/ContactForm'));
const Footer = lazy(() => import('@/components/Footer'));

export const sections: Section[] = [
  {
    id: 'hero',
    Component: Hero,
    title: 'Home',
    hash: '#home',
    icon: HomeTwoTone,
  },
  {
    id: 'aboutMe',
    Component: AboutMe,
    title: 'About Me',
    hash: '#about',
    icon: PersonOutlineOutlined,
  },
  {
    id: 'portfolio',
    Component: Portfolio,
    title: 'Projects',
    hash: '#projects',
    icon: FolderTwoTone,
  },
  {
    id: 'workExperience',
    Component: WorkExperience,
    title: 'Experience',
    hash: '#experience',
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

export const sectionIds = sections.map((s) => s.id);

export const getSectionById = (id: string): Section | undefined =>
  sections.find((s) => s.id === id);

export const getSectionByHash = (hash: string): Section | undefined =>
  sections.find((s) => s.hash === hash);
