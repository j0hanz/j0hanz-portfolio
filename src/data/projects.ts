export interface Project {
  title: string;
  description: string;
  github: string;
  demo: string;
  technologies: string[];
  collaborative: boolean;
  isHackathon: boolean;
  isHackathon_2: boolean;
  isHackathon_3: boolean;
  api: boolean;
  gitpod_template?: boolean;
  isNew?: boolean;
  projectBoard?: boolean;
}

const projects: Project[] = [
  {
    title: '404: GGNF',
    description:
      'A platform honouring the achievements of women in technology and next generation of female tech innovators. Developed for the March 2025 Code Institute Hackathon.',
    github: 'https://github.com/tgrey2024/2503-hackathon-team1',
    demo: 'https://team-1-8284bb86c76b.herokuapp.com/',
    technologies: [
      'HTML5',
      '98.CSS',
      'Django',
      'Tailwind CSS',
      'JavaScript',
      'FlyonUI',
      'Python',
      'Agile',
    ],
    collaborative: true,
    isHackathon: false,
    isHackathon_2: true,
    isHackathon_3: false,
    api: false,
    isNew: true,
    gitpod_template: false,
    projectBoard: true,
  },
  {
    title: 'Memorix',
    description:
      'A React-based memory game where players match card pairs with minimal moves and time.',
    github: 'https://github.com/j0hanz/Memorix',
    demo: 'https://memorix-128e93e43ff7.herokuapp.com/',
    technologies: [
      'React 19',
      'CSS3',
      'TypeScript',
      'Vite',
      'framer-motion',
      'Bootstrap',
      'Howler.js',
    ],
    collaborative: false,
    isHackathon: false,
    isHackathon_2: false,
    isHackathon_3: false,
    api: false,
    isNew: true,
    gitpod_template: false,
    projectBoard: false,
  },
  {
    title: 'Magic December',
    description:
      'Advent calendar highlighting festivals worldwide. Developed for the December 2024 Code Institute Hackathon.',
    github: 'https://github.com/Morgana-S/magic-december',
    demo: 'https://morgana-s.github.io/magic-december/',
    technologies: ['HTML5', 'CSS3', 'JavaScript', 'Bootstrap', 'Agile', 'Git'],
    collaborative: true,
    isHackathon: true,
    isHackathon_2: false,
    isHackathon_3: false,
    api: false,
    isNew: false,
    gitpod_template: false,
    projectBoard: true,
  },
  {
    title: 'Script to Sound',
    description:
      'Text-to-speech application to improve accessibility. Developed for the November 2024 Code Institute Hackathon.',
    github: 'https://github.com/hannahro15/Nov24Hackathon',
    demo: 'https://script-to-sound-f697c5a0720c.herokuapp.com/',
    technologies: [
      'Django',
      'HTML5',
      'CSS3',
      'JavaScript',
      'Bootstrap',
      'Python',
      'Agile',
    ],
    collaborative: true,
    isHackathon: false,
    isHackathon_2: false,
    isHackathon_3: true,
    api: false,
    isNew: false,
    gitpod_template: false,
    projectBoard: true,
  },
  {
    title: 'Portfolio',
    description:
      'My personal portfolio website showcasing projects, skills, and contact information.',
    github: 'https://github.com/j0hanz/j0hanz-portfolio',
    demo: 'https://linus-johansson-cv-d308be9b73e1.herokuapp.com/',
    technologies: [
      'React 19',
      'CSS3',
      'TypeScript',
      'Bootstrap',
      'Node.js',
      'EmailJS',
      'Heroku',
      'Framer Motion',
    ],
    collaborative: false,
    isHackathon: false,
    isHackathon_2: false,
    isHackathon_3: false,
    api: false,
    isNew: true,
    gitpod_template: false,
    projectBoard: false,
  },
  {
    title: 'SonataCraft',
    description:
      'A digital Baroque-era piano application that users can play. Developed for the September 2024 Code Institute Hackathon.',
    github: 'https://github.com/Damitwhy/Team4-Sep2024-Hackathon',
    demo: 'https://team4-91bfea18c336.herokuapp.com/',
    technologies: [
      'HTML5',
      'CSS3',
      'JavaScript',
      'Bootstrap',
      'Git',
      'Python',
      'Heroku',
      'SQL',
      'Django',
      'Agile',
    ],
    collaborative: true,
    isHackathon: true,
    isHackathon_2: false,
    isHackathon_3: false,
    api: false,
    isNew: false,
    gitpod_template: false,
    projectBoard: true,
  },
  {
    title: 'j0hanz-gitpod-template',
    description:
      'A ready-to-use development environment for Python, Django, Node.js, MongoDB, PostgreSQL, AWS and Heroku. Includes essential tools, linters, formatters, and VS Code extensions.',
    github: 'https://github.com/j0hanz/j0hanz-gitpod-template',
    demo: 'https://github.com/j0hanz/j0hanz-gitpod-template',
    technologies: ['Python', 'Shell', 'JSON', 'Dockerfile', 'YAML', 'TOML'],
    collaborative: false,
    isHackathon: false,
    isHackathon_2: false,
    isHackathon_3: false,
    api: false,
    gitpod_template: true,
    isNew: false,
  },
  {
    title: 'Blog Beat',
    description:
      'A platform where bloggers and readers can write and interact with blog posts.',
    github: 'https://github.com/j0hanz/blog-beat-web',
    demo: 'https://blog-beat-17c62545ca2a.herokuapp.com/',
    technologies: [
      'React.js',
      'CSS3',
      'JavaScript',
      'Bootstrap',
      'Node.js',
      'Agile',
      'Axios',
      'Heroku',
    ],
    collaborative: false,
    isHackathon: false,
    isHackathon_2: false,
    isHackathon_3: false,
    api: false,
    isNew: false,
    gitpod_template: false,
    projectBoard: true,
  },
  {
    title: 'Blog Beat API',
    description:
      'An API built with Django and Django REST Framework for user profiles, posts, comments, and more.',
    github: 'https://github.com/j0hanz/blog_beat_api',
    demo: 'https://blog-beat-api-bab609deb9ee.herokuapp.com/',
    technologies: [
      'Django',
      'Django REST Framework',
      'Python',
      'PostgreSQL',
      'Cloudinary',
      'Heroku',
      'JWT',
    ],
    collaborative: false,
    isHackathon: false,
    isHackathon_2: false,
    isHackathon_3: false,
    api: true,
    isNew: false,
    gitpod_template: false,
    projectBoard: true,
  },
  {
    title: 'Tech Corner',
    description:
      'A blog site for tech enthusiasts to share and discuss the latest in technology.',
    github: 'https://github.com/j0hanz/tech-corner-website',
    demo: 'https://tech-corner-web-70b84e69e118.herokuapp.com/about/',
    technologies: [
      'HTML5',
      'CSS3',
      'Python',
      'JavaScript',
      'Bootstrap',
      'Python',
      'Django',
      'SQL',
      'Agile',
    ],
    collaborative: false,
    isHackathon: false,
    isHackathon_2: false,
    isHackathon_3: false,
    api: false,
    isNew: false,
    gitpod_template: false,
    projectBoard: true,
  },
  {
    title: 'Pick my Spell',
    description:
      'A fun spelling quiz game where users pick the correct word within 10 seconds, perfect for improving spelling skills.',
    github: 'https://github.com/j0hanz/PICK-my-SPELL',
    demo: 'https://j0hanz.github.io/PICK-my-SPELL/',
    technologies: ['HTML5', 'CSS3', 'JavaScript'],
    isHackathon: false,
    isHackathon_2: false,
    isHackathon_3: false,
    collaborative: false,
    api: false,
    isNew: false,
    gitpod_template: false,
    projectBoard: false,
  },
  {
    title: 'Fix my Spell',
    description:
      'A console-based game to correct misspelled words, designed to boost spelling and vocabulary in a playful way.',
    github: 'https://github.com/j0hanz/FIX-my-SPELL',
    demo: 'https://fix-my-spell-7e3aef96045e.herokuapp.com/',
    technologies: ['Python', 'Heruko'],
    collaborative: false,
    isHackathon: false,
    isHackathon_2: false,
    isHackathon_3: false,
    api: false,
    isNew: false,
    gitpod_template: false,
    projectBoard: false,
  },
];

export default projects;
