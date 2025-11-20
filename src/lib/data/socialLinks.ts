import {
  CodeRounded,
  EmojiEventsTwoTone,
  GitHub,
  LinkedIn,
  PictureAsPdfRounded,
} from '@mui/icons-material';

import { SocialLink } from '@/config/types';

export const socialLinks: SocialLink[] = [
  {
    id: 'linkedin',
    icon: LinkedIn,
    href: 'https://www.linkedin.com/in/linus-johansson-software-dev/',
    tooltip: 'LinkedIn Profile',
    color: '#0a66c2',
  },
  {
    id: 'github',
    icon: GitHub,
    href: 'https://github.com/j0hanz',
    tooltip: 'GitHub Profile',
    color: '#ffffff',
  },
  {
    id: 'download-pdf',
    icon: PictureAsPdfRounded,
    onClick: () => {},
    tooltip: 'Download CV',
    color: '#dc1a1a',
  },
  {
    id: 'certificate',
    icon: EmojiEventsTwoTone,
    href: 'https://www.credential.net/dd705ce7-f66c-456a-b07d-e8712cd7287c#gs.cubcle',
    tooltip: 'Certificate',
    color: '#ffc800',
  },
  {
    id: 'source-code',
    icon: CodeRounded,
    href: 'https://github.com/j0hanz/j0hanz-portfolio',
    tooltip: 'Source Code',
    color: '#3fb950',
  },
];
