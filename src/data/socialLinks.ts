import { IconType } from 'react-icons';
import {
  FaLinkedinIn,
  FaGithub,
  FaAward,
  FaCode,
  FaRegFilePdf,
} from 'react-icons/fa';
import appStyles from '@/App.module.css';

interface SocialLink {
  id: string;
  icon: IconType;
  href?: string;
  onClick?: () => void;
  tooltip: string;
  iconClass: string;
}

export const socialLinks: SocialLink[] = [
  {
    id: 'linkedin',
    icon: FaLinkedinIn,
    href: 'https://www.linkedin.com/in/linus-johansson-software-dev/',
    tooltip: 'LinkedIn Profile',
    iconClass: appStyles.linkedinIcon,
  },
  {
    id: 'github',
    icon: FaGithub,
    href: 'https://github.com/j0hanz',
    tooltip: 'GitHub Profile',
    iconClass: appStyles.githubIcon,
  },
  {
    id: 'download-pdf',
    icon: FaRegFilePdf,
    onClick: () => {},
    tooltip: 'Download CV',
    iconClass: appStyles.pdfIcon,
  },
  {
    id: 'certificate',
    icon: FaAward,
    href: 'https://www.credential.net/dd705ce7-f66c-456a-b07d-e8712cd7287c#gs.cubcle',
    tooltip: 'Certificate',
    iconClass: appStyles.certificateIcon,
  },
  {
    id: 'source-code',
    icon: FaCode,
    href: 'https://github.com/j0hanz/j0hanz-portfolio',
    tooltip: 'Source Code',
    iconClass: appStyles.sourceCodeIcon,
  },
];
