import {
  FaAward,
  FaCode,
  FaGithub,
  FaLinkedinIn,
  FaRegFilePdf,
} from 'react-icons/fa';

import { SocialLink } from '@/config/types';

export const socialLinks: SocialLink[] = [
  {
    id: 'linkedin',
    icon: FaLinkedinIn,
    href: 'https://www.linkedin.com/in/linus-johansson-software-dev/',
    tooltip: 'LinkedIn Profile',
    color: '#0a66c2',
  },
  {
    id: 'github',
    icon: FaGithub,
    href: 'https://github.com/j0hanz',
    tooltip: 'GitHub Profile',
    color: '#ffffff',
  },
  {
    id: 'download-pdf',
    icon: FaRegFilePdf,
    onClick: () => {},
    tooltip: 'Download CV',
    color: '#dc1a1a',
  },
  {
    id: 'certificate',
    icon: FaAward,
    href: 'https://www.credential.net/dd705ce7-f66c-456a-b07d-e8712cd7287c#gs.cubcle',
    tooltip: 'Certificate',
    color: '#ffc800',
  },
  {
    id: 'source-code',
    icon: FaCode,
    href: 'https://github.com/j0hanz/j0hanz-portfolio',
    tooltip: 'Source Code',
    color: '#3fb950',
  },
];
