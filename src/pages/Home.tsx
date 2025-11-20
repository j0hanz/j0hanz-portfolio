import React from 'react';

import ErrorBoundary from '@/components/ErrorBoundary';
import Footer from '@/components/Footer';
import { MotionWrapper } from '@/components/Motions';
import { SectionConfig } from '@/config/types';
import AboutMe from '@/features/about/AboutMe';
import ContactForm from '@/features/contact/ContactForm';
import Education from '@/features/education/Education';
import WorkExperience from '@/features/experience/WorkExperience';
import Hero from '@/features/hero/Hero';
import Portfolio from '@/features/projects/Portfolio';
import Skills from '@/features/skills/Skills';

const primarySections: SectionConfig[] = [
  { id: 'hero', Component: Hero },
  { id: 'aboutMe', Component: AboutMe },
  { id: 'education', Component: Education },
  { id: 'skills', Component: Skills },
  { id: 'portfolio', Component: Portfolio },
  { id: 'workExperience', Component: WorkExperience },
];

const contactSection: SectionConfig = { id: 'contact', Component: ContactForm };
const ContactSectionComponent = contactSection.Component;

function MainContent(): React.JSX.Element {
  return (
    <main>
      {primarySections.map(({ id, Component }) => (
        <MotionWrapper key={id} sectionId={id}>
          <Component />
        </MotionWrapper>
      ))}
      <ErrorBoundary>
        <MotionWrapper sectionId={contactSection.id}>
          <ContactSectionComponent />
        </MotionWrapper>
      </ErrorBoundary>
      <Footer />
    </main>
  );
}

export default MainContent;
