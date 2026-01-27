import {
  CodeRounded,
  EmojiEventsTwoTone,
  GitHub,
  LinkedIn,
  PictureAsPdfRounded,
} from '@mui/icons-material';

import type { SocialLink } from '@/config/types';

export const socialLinks = [
  {
    id: 'linkedin',
    icon: LinkedIn,
    href: 'https://www.linkedin.com/in/linus-johansson-software-dev/',
    tooltip: 'LinkedIn Profile',
    color: 'linkedin.main',
    iconColor: 'linkedin.contrastText',
  },
  {
    id: 'github',
    icon: GitHub,
    href: 'https://github.com/j0hanz',
    tooltip: 'GitHub Profile',
    color: 'github.dark', // Consistent dark bg (#181717) in both themes
    iconColor: 'grey.100', // Light icon on dark bg - works in both themes
  },
  {
    id: 'download-pdf',
    icon: PictureAsPdfRounded,
    onClick: () => {},
    tooltip: 'Download CV',
    color: 'pdf.main',
    iconColor: 'pdf.contrastText',
  },
  {
    id: 'certificate',
    icon: EmojiEventsTwoTone,
    href: 'https://www.credential.net/dd705ce7-f66c-456a-b07d-e8712cd7287c#gs.cubcle',
    tooltip: 'Certificate',
    color: 'certificate.main',
    iconColor: 'certificate.contrastText', // Black on yellow for good contrast
  },
  {
    id: 'source-code',
    icon: CodeRounded,
    href: 'https://github.com/j0hanz/j0hanz-portfolio',
    tooltip: 'Source Code',
    color: 'sourceCode.main',
    iconColor: 'sourceCode.contrastText',
  },
] as const satisfies readonly SocialLink[];
