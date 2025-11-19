import {
  HiOutlineAcademicCap,
  HiOutlineBriefcase,
  HiOutlineCog8Tooth,
  HiOutlineEnvelope,
  HiOutlineFolder,
  HiOutlineUser,
} from 'react-icons/hi2';

import { NavLink } from '@/config/types';

export const navLinks: NavLink[] = [
  { id: 'about-me', icon: HiOutlineUser, label: 'About Me' },
  { id: 'education', icon: HiOutlineAcademicCap, label: 'Education' },
  { id: 'skills', icon: HiOutlineCog8Tooth, label: 'Skills' },
  { id: 'portfolio', icon: HiOutlineFolder, label: 'Projects' },
  { id: 'work-experience', icon: HiOutlineBriefcase, label: 'Experience' },
  { id: 'contact', icon: HiOutlineEnvelope, label: 'Contact' },
];
