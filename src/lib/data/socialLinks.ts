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
    color: 'linkedin.main',
  },
  {
    id: 'github',
    icon: GitHub,
    href: 'https://github.com/j0hanz',
    tooltip: 'GitHub Profile',
    color: 'github.main',
  },
  {
    id: 'download-pdf',
    icon: PictureAsPdfRounded,
    onClick: () => {},
    tooltip: 'Download CV',
    color: 'pdf.main',
  },
  {
    id: 'certificate',
    icon: EmojiEventsTwoTone,
    href: 'https://www.credential.net/dd705ce7-f66c-456a-b07d-e8712cd7287c#gs.cubcle',
    tooltip: 'Certificate',
    color: 'certificate.main',
  },
  {
    id: 'source-code',
    icon: CodeRounded,
    href: 'https://github.com/j0hanz/j0hanz-portfolio',
    tooltip: 'Source Code',
    color: 'sourceCode.main',
  },
];
