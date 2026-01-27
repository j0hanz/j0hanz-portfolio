import {
  SiBootstrap,
  SiCss3,
  SiDjango,
  SiGit,
  SiHeroku,
  SiHtml5,
  SiJavascript,
  SiMarkdown,
  SiMui,
  SiNodedotjs,
  SiNpm,
  SiPostgresql,
  SiPython,
  SiRaspberrypi,
  SiReact,
  SiRedux,
  SiTypescript,
  SiVite,
} from 'react-icons/si';
import { VscTerminalPowershell, VscVscode } from 'react-icons/vsc';

import type { Skill } from '@/config/types';

const skills = [
  { icon: SiHtml5, label: 'HTML5' },
  { icon: SiCss3, label: 'CSS3' },
  { icon: SiJavascript, label: 'JavaScript' },
  { icon: SiTypescript, label: 'TypeScript' },
  { icon: SiReact, label: 'React' },
  { icon: SiRedux, label: 'Redux' },
  { icon: SiBootstrap, label: 'Bootstrap' },
  { icon: SiMui, label: 'Material UI' },
  { icon: SiVite, label: 'Vite' },
  { icon: SiPython, label: 'Python' },
  { icon: SiDjango, label: 'Django' },
  { icon: SiNodedotjs, label: 'Node.js' },
  { icon: SiNpm, label: 'npm' },
  { icon: SiPostgresql, label: 'PostgreSQL' },
  { icon: SiGit, label: 'Git' },
  { icon: SiHeroku, label: 'Heroku' },
  { icon: VscVscode, label: 'VS Code' },
  { icon: VscTerminalPowershell, label: 'PowerShell' },
  { icon: SiMarkdown, label: 'Markdown' },
  { icon: SiRaspberrypi, label: 'Raspberry Pi' },
] as const satisfies readonly Skill[];

export { skills };
