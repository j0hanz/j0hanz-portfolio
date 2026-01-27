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
const loadHero = () => import('@/features/hero/Hero');
const loadAboutMe = () => import('@/features/about/AboutMe');
const loadWorkExperience = () => import('@/features/experience/WorkExperience');
const loadPortfolio = () => import('@/features/projects/Portfolio');
const loadContactForm = () => import('@/features/contact/ContactForm');
const loadFooter = () => import('@/components/Footer');

const Hero = lazy(() => loadHero().then((m) => ({ default: m.Hero })));
const AboutMe = lazy(() => loadAboutMe().then((m) => ({ default: m.AboutMe })));
const WorkExperience = lazy(() =>
  loadWorkExperience().then((m) => ({ default: m.WorkExperience }))
);
const Portfolio = lazy(() =>
  loadPortfolio().then((m) => ({ default: m.Portfolio }))
);
const ContactForm = lazy(() =>
  loadContactForm().then((m) => ({ default: m.ContactForm }))
);
const Footer = lazy(() => loadFooter().then((m) => ({ default: m.Footer })));

export const sectionLoaders: Record<string, () => Promise<unknown>> = {
  hero: loadHero,
  aboutMe: loadAboutMe,
  portfolio: loadPortfolio,
  workExperience: loadWorkExperience,
  contact: loadContactForm,
  footer: loadFooter,
};

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
