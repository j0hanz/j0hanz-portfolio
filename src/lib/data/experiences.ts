import { Experience } from '@/config/types';

const experiences: Experience[] = [
  {
    type: 'education',
    title: 'Diploma in Full Stack Software Development',
    school: 'Code Institute',
    duration: 'Feb 2024 - Jul 2024',
    description: ['Credit-rated by the University of the West of Scotland.'],
    hasCredential: true,
  },
  {
    type: 'work',
    title: 'Assistant Store Manager',
    workplace: 'Webhallen',
    duration: 'Sep 2020 - Feb 2024',
    description: [
      'Managed daily store operations and staff when the store manager was away',
      'Trained and onboarded new employees.',
      'Resolved customer issues and handled computer troubleshooting.',
      'Coordinated claim management between customers and suppliers.',
    ],
  },
  {
    type: 'work',
    title: 'Store Manager',
    workplace: 'Webhallen',
    duration: 'Sep 2019 - April 2020',
    description: [
      'Responsible for staff management and scheduling',
      'Trained and onboarded new employees.',
      'Performed monthly reporting and administrative tasks.',
    ],
  },
  {
    type: 'education',
    title: 'Leadership Training',
    school: 'Webhallen',
    duration: '2019',
    description: [
      'Building winning teams through norms, values, and coaching leadership.',
    ],
  },
  {
    type: 'work',
    title: 'Salesperson',
    workplace: 'Webhallen',
    duration: 'Jan 2016 - Sep 2019',
    description: [
      'Worked in customer support and sales.',
      'Resolved customer issues and handled computer troubleshooting.',
    ],
  },
  {
    type: 'work',
    title: 'Warehouse Worker',
    workplace: 'House of Saki',
    duration: '2014 - 2016',
    description: [
      'Responsible for in and outbound delivery of goods.',
      'Picking and packing goods according to order.',
    ],
  },
];

export { experiences };
