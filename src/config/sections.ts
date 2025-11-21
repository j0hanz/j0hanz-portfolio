import {
  EmailRounded,
  FolderTwoTone,
  HomeTwoTone,
  PersonOutlineOutlined,
  SchoolTwoTone,
  SettingsTwoTone,
  WorkOutlineTwoTone,
} from '@mui/icons-material';

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
    id: 'education',
    Component: Education,
    title: 'Education',
    hash: '#education',
    icon: SchoolTwoTone,
  },
  {
    id: 'skills',
    Component: Skills,
    title: 'Skills',
    hash: '#skills',
    icon: SettingsTwoTone,
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
