import React from 'react';
import { Col, Card, OverlayTrigger, Tooltip, Badge } from 'react-bootstrap';
import {
  HiMiniUser,
  HiMiniUserGroup,
  HiMiniPlay,
  HiMiniServer,
} from 'react-icons/hi2';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faGithub } from '@fortawesome/free-brands-svg-icons';
import styles from '@/sections/styles/Portfolio.module.css';
import appStyles from '@/App.module.css';
import hackathonBadge from '@/assets/hackathonBadge.webp';
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
              {project.api && <HiMiniServer className="me-2" />}
              {project.title}
              {project.isNew && <Badge className={styles.newBadge}>New</Badge>}
            </div>
            {project.collaborative ? (
              <HiMiniUserGroup className={styles.userIcon} />
            ) : (
              <HiMiniUser className={styles.userIcon} />
            )}
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
                src={`https://img.shields.io/github/commit-activity/t/${repoPath}?style=flat-square&logo=git&logoColor=dc1a1a&labelColor=ececec&label=Commits:&color=ececec`}
                alt="Commit Activity"
              />
            </a>
            <a
              href={`https://github.com/${repoPath}/commits`}
              target="_blank"
              rel="noopener noreferrer"
            >
              <img
                src={`https://img.shields.io/github/last-commit/${repoPath}?style=flat-square&logo=github&logoColor=1d1d1d&labelColor=ececec&label=Updated:&color=ececec`}
                alt="Last Commit"
                className="my-1"
              />
            </a>
            {project.projectBoard && (
              <a
                href={`https://github.com/${repoPath}/issues`}
                target="_blank"
                rel="noopener noreferrer"
              >
                <img
                  src={`https://img.shields.io/github/issues/${repoPath}?style=flat-square&logo=github&logoColor=1d1d1d&labelColor=ececec&label=Issues:&color=ececec`}
                  alt="Issues"
                  className="my-1"
                />
              </a>
            )}
          </div>
          {project.isHackathon && (
            <img
              src={hackathonBadge}
              alt="Hackathon Badge"
              className={styles.hackathonBadge}
            />
          )}
          {project.isHackathon_3 && (
            <img
              src={hackathonBadge3}
              alt="Hackathon Badge"
              className={styles.hackathonBadge}
            />
          )}
          {project.gitpod_template && (
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
              className={`${styles.customButton} ${styles.githubButton}`}
              icon={
                <FontAwesomeIcon
                  icon={faGithub}
                  className={styles.buttonIcon}
                />
              }
              text="GitHub"
            />
            {project.demo ? (
              <Button
                href={project.demo}
                target="_blank"
                className={`${styles.customButton} ${styles.demoButton}`}
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
                    className={`${styles.customButton} ${styles.demoButton}`}
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
