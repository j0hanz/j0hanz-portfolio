import React from 'react';
import { Col, Card, OverlayTrigger, Tooltip, Badge } from 'react-bootstrap';
import {
  HiMiniUser,
  HiMiniUserGroup,
  HiMiniPlay,
  HiMiniServer,
} from 'react-icons/hi2';
import { SiGithub } from 'react-icons/si';
import styles from '@/sections/styles/Portfolio.module.css';
import appStyles from '@/App.module.css';
import hackathonBadge from '@/assets/hackathonBadge.webp';
import hackathonBadge2 from '@/assets/hackathonBadge2.webp';
import hackathonBadge3 from '@/assets/hackathonBadgeThirdPlace.webp';
import gitpodLogo from '@/assets/gitpod.webp';
import { Project } from '@/data/projects';
import Button from '@/components/Button';

interface ProjectListProps {
  project: Project;
  index: number;
}

// Component for displaying a list of projects
const ProjectList: React.FC<ProjectListProps> = ({ project, index }) => {
  const repoPath = project.github.split('github.com/')[1];

  return (
    <Col lg={6} key={index} className="mb-4">
      <Card className={`h-100 ${appStyles.cardBgColor}`}>
        <Card.Body
          className={`d-flex flex-column ${appStyles.cardBody} ${styles.badgePosition}`}
        >
          <Card.Title className="mb-3 d-flex justify-content-between">
            <div
              className={`${appStyles.cardHeader} d-flex align-items-center`}
            >
              {Boolean(project.api) && <HiMiniServer className="me-2" />}
              {project.title}
              {Boolean(project.isNew) && (
                <Badge className={styles.newBadge}>New</Badge>
              )}
            </div>
            <div>
              {project.collaborative ? (
                <HiMiniUserGroup className={styles.userIcon} />
              ) : (
                <HiMiniUser className={styles.userIcon} />
              )}
            </div>
          </Card.Title>
          <Card.Text className={appStyles.cardText}>
            {project.description}
          </Card.Text>
          <div className={styles.technologies}>
            {project.technologies.map((tech, i) => (
              <div key={i} className={appStyles.customBadge}>
                {tech}
              </div>
            ))}
          </div>
          <div className={`mb-3 ${styles.githubStats}`}>
            <a
              href={`https://github.com/${repoPath}/graphs/commit-activity`}
              target="_blank"
              rel="noopener noreferrer"
            >
              <img
                src={`https://img.shields.io/github/commit-activity/t/${repoPath}?style=flat-square&logo=git&logoColor=dc1a1a&labelColor=313131&label=Commits:&color=313131`}
                alt="Commit Activity"
              />
            </a>
            <a
              href={`https://github.com/${repoPath}/commits`}
              target="_blank"
              rel="noopener noreferrer"
            >
              <img
                src={`https://img.shields.io/github/last-commit/${repoPath}?style=flat-square&logo=github&logoColor=f2f2f2&labelColor=313131&label=Updated:&color=313131`}
                alt="Last Commit"
                className="my-1"
              />
            </a>
            {Boolean(project.projectBoard) && (
              <a
                href={`https://github.com/${repoPath}/issues`}
                target="_blank"
                rel="noopener noreferrer"
              >
                <img
                  src={`https://img.shields.io/github/issues/${repoPath}?style=flat-square&logo=github&logoColor=f2f2f2&labelColor=313131&label=Issues:&color=313131`}
                  alt="Issues"
                  className="my-1"
                />
              </a>
            )}
          </div>
          {Boolean(project.isHackathon) && (
            <img
              src={hackathonBadge}
              alt="Hackathon Badge"
              className={styles.hackathonBadge}
            />
          )}
          {Boolean(project.isHackathon_2) && (
            <img
              src={hackathonBadge2}
              alt="Hackathon Badge"
              className={styles.hackathonBadge}
            />
          )}
          {Boolean(project.isHackathon_3) && (
            <img
              src={hackathonBadge3}
              alt="Hackathon Badge"
              className={styles.hackathonBadge}
            />
          )}
          {Boolean(project.gitpod_template) && (
            <img
              src={gitpodLogo}
              alt="Gitpod Template"
              className={styles.gitpodLogo}
            />
          )}
          <div className="mt-auto d-flex justify-content-between">
            <Button
              href={project.github}
              target="_blank"
              className={styles.githubButton}
              icon={<SiGithub className={styles.buttonIcon} />}
              text="GitHub"
            />
            {project.demo ? (
              <Button
                href={project.demo}
                target="_blank"
                className={styles.demoButton}
                icon={<HiMiniPlay className={styles.buttonIcon} />}
                text="Demo"
              />
            ) : (
              <OverlayTrigger
                placement="bottom"
                overlay={
                  <Tooltip
                    id={`tooltip-no-demo-${index}`}
                    className={appStyles.customTooltip}
                  >
                    Coming soon!
                  </Tooltip>
                }
              >
                <div className="d-inline-block">
                  <Button
                    disabled
                    className={styles.demoButton}
                    icon={<HiMiniPlay className={styles.buttonIcon} />}
                    text="Demo"
                  />
                </div>
              </OverlayTrigger>
            )}
          </div>
        </Card.Body>
      </Card>
    </Col>
  );
};

export default ProjectList;
