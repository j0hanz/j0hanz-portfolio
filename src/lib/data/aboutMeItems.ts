import type { AboutMeItem } from '@/config/types';

const aboutMeItems = [
  {
    title: 'Tech Enthusiast',
    description: 'Passionate about technology.',
    hasCredential: false,
  },
  {
    title: 'Always Learning',
    description: 'Enjoys new challenges.',
    hasCredential: false,
  },
  {
    title: 'Frontend Developer',
    description: 'Completed Full Stack course.',
    hasCredential: true,
  },
  {
    title: 'Team Player',
    description: 'Values collaboration and teamwork.',
    hasCredential: false,
  },
  {
    title: 'Problem Solver',
    description: 'Loves tackling complex problems.',
    hasCredential: false,
  },
] as const satisfies readonly AboutMeItem[];

export { aboutMeItems };
