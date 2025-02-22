import { IconType } from 'react-icons';
import {
  HiOutlineUser,
  HiOutlineAcademicCap,
  HiOutlineCog8Tooth,
  HiOutlineFolder,
  HiOutlineBriefcase,
  HiOutlineEnvelope,
} from 'react-icons/hi2';

interface NavLink {
  id: string;
  icon: IconType;
  label: string;
}

export const navLinks: NavLink[] = [
  { id: 'about-me', icon: HiOutlineUser, label: 'About Me' },
  { id: 'education', icon: HiOutlineAcademicCap, label: 'Education' },
  { id: 'skills', icon: HiOutlineCog8Tooth, label: 'Skills' },
  { id: 'portfolio', icon: HiOutlineFolder, label: 'Projects' },
  { id: 'work-experience', icon: HiOutlineBriefcase, label: 'Experience' },
  { id: 'contact', icon: HiOutlineEnvelope, label: 'Contact' },
];
