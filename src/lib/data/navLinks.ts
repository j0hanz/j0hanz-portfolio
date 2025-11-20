import {
  EmailRounded,
  FolderTwoTone,
  PersonOutlineOutlined,
  SchoolTwoTone,
  SettingsTwoTone,
  WorkOutlineTwoTone,
} from '@mui/icons-material';

import { NavLink } from '@/config/types';

export const navLinks: NavLink[] = [
  { id: 'about-me', icon: PersonOutlineOutlined, label: 'About Me' },
  { id: 'education', icon: SchoolTwoTone, label: 'Education' },
  { id: 'skills', icon: SettingsTwoTone, label: 'Skills' },
  { id: 'portfolio', icon: FolderTwoTone, label: 'Projects' },
  { id: 'work-experience', icon: WorkOutlineTwoTone, label: 'Experience' },
  { id: 'contact', icon: EmailRounded, label: 'Contact' },
];
