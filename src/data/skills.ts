import { IconType } from 'react-icons';
import {
  SiHtml5,
  SiCss3,
  SiJavascript,
  SiBootstrap,
  SiReact,
  SiNodedotjs,
  SiPython,
  SiDjango,
  SiPostgresql,
  SiGithub,
  SiGit,
  SiTypescript,
  SiNextdotjs,
  SiTailwindcss,
  SiVite,
} from 'react-icons/si';

interface Skill {
  icon: IconType;
  label: string;
  learning?: boolean;
}

const skills: Skill[] = [
  { icon: SiBootstrap, label: 'Bootstrap' },
  { icon: SiCss3, label: 'CSS3' },
  { icon: SiDjango, label: 'Django' },
  { icon: SiGit, label: 'Git' },
  { icon: SiGithub, label: 'GitHub' },
  { icon: SiHtml5, label: 'HTML5' },
  { icon: SiJavascript, label: 'JavaScript' },
  { icon: SiNodedotjs, label: 'Node.js' },
  { icon: SiPostgresql, label: 'PostgreSQL' },
  { icon: SiPython, label: 'Python' },
  { icon: SiReact, label: 'React.js' },
  { icon: SiTypescript, label: 'Typescript' },
  { icon: SiVite, label: 'Vite' },
  { icon: SiNextdotjs, label: 'Next.js', learning: true },
  { icon: SiTailwindcss, label: 'Tailwind CSS', learning: true },
];

export default skills;
