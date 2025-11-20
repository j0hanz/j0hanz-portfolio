import React, { lazy, Suspense } from 'react';

import ErrorBoundary from '@/components/ErrorBoundary';
import SectionWrapper from '@/components/SectionWrapper';
import Spinner from '@/components/Spinner';
import { MainContentProps, SectionConfig } from '@/config/types';

const Hero = lazy(() => import('@/features/hero/Hero'));
const AboutMe = lazy(() => import('@/features/about/AboutMe'));
const Skills = lazy(() => import('@/features/skills/Skills'));
const WorkExperience = lazy(
  () => import('@/features/experience/WorkExperience')
);
const Education = lazy(() => import('@/features/education/Education'));
const Portfolio = lazy(() => import('@/features/projects/Portfolio'));
const ContactForm = lazy(() => import('@/features/contact/ContactForm'));
const Footer = lazy(() => import('@/components/Footer'));

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

function MainContent({ loading }: MainContentProps): React.JSX.Element {
  return (
    <main aria-busy={loading}>
      {loading ? (
        <Spinner />
      ) : (
        <Suspense fallback={<Spinner />}>
          {primarySections.map(({ id, Component }) => (
            <SectionWrapper key={id} sectionId={id}>
              <Component />
            </SectionWrapper>
          ))}
          <ErrorBoundary>
            <SectionWrapper sectionId={contactSection.id}>
              <ContactSectionComponent />
            </SectionWrapper>
          </ErrorBoundary>
          <Footer />
        </Suspense>
      )}
    </main>
  );
}

export default MainContent;
