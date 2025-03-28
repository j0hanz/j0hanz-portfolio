import React, { useEffect } from 'react';
import { Container, Row } from 'react-bootstrap';
import { HiFolder } from 'react-icons/hi2';
import appStyles from '@/App.module.css';
import projects from '@/data/projects';
import { fetchCommit } from '@/utils/fetchCommit';
import ProjectList from '@/components/ProjectList';

// Rendering portfolio section
const Portfolio: React.FC = () => {
  // Fetch commit histories for projects
  const fetchHistories = async () => {
    await fetchCommit(projects);
  };

  useEffect(() => {
    fetchHistories();
  }, []);

  return (
    <section id="portfolio">
      <Container className={appStyles.sectionContainer}>
        <div className={appStyles.sectionTitleContainer}>
          <div>
            <HiFolder className={appStyles.mainIcon} />
          </div>
          <div className={appStyles.sectionTitle}>Projects</div>
        </div>
        <Row>
          {projects.map((project, index) => (
            <ProjectList key={index} project={project} index={index} />
          ))}
        </Row>
      </Container>
    </section>
  );
};

export default Portfolio;
