import { faLinkedinIn, faGithub } from '@fortawesome/free-brands-svg-icons';
import { faAward, faCode } from '@fortawesome/free-solid-svg-icons';
import { faFilePdf } from '@fortawesome/free-regular-svg-icons';
import appStyles from '../App.module.css';

export const socialLinks = [
  {
    id: 'linkedin',
    icon: faLinkedinIn,
    href: 'https://www.linkedin.com/in/linus-johansson-software-dev/',
    tooltip: 'LinkedIn Profile',
    iconClass: appStyles.linkedinIcon,
  },
  {
    id: 'github',
    icon: faGithub,
    href: 'https://github.com/j0hanz',
    tooltip: 'GitHub Profile',
    iconClass: appStyles.githubIcon,
  },
  {
    id: 'download-pdf',
    icon: faFilePdf,
    onClick: () => {}, // Placeholder for handleModalOpen
    tooltip: 'Download CV',
    iconClass: appStyles.pdfIcon,
  },
  {
    id: 'certificate',
    icon: faAward,
    href: 'https://www.credential.net/dd705ce7-f66c-456a-b07d-e8712cd7287c#gs.cubcle',
    tooltip: 'Certificate',
    iconClass: appStyles.certificateIcon,
  },
  {
    id: 'source-code',
    icon: faCode,
    href: 'https://github.com/j0hanz/j0hanz-portfolio',
    tooltip: 'Source Code',
    iconClass: appStyles.sourceCodeIcon,
  },
];
