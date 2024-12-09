import React, { useState, useEffect } from 'react';
import {
  Container,
  Row,
  Col,
  Card,
  Button,
  OverlayTrigger,
  Tooltip,
} from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faGithub } from '@fortawesome/free-brands-svg-icons';
import {
  faProjectDiagram,
  faRocket,
  faUser,
  faUsers,
  faDatabase,
} from '@fortawesome/free-solid-svg-icons';
import styles from './styles/Portfolio.module.css';
import appStyles from '../App.module.css';
import hackathonBadge from '../assets/hackathonBadge.webp';
import hackathonBadge3 from '../assets/hackathonBadgeThirdPlace.webp';
import gitpodLogo from '../assets/gitpod.webp';
import ScrollRevealWrapper from './ScrollWrapper';
import projects from '../data/projects';
import { fetchCommitHistory } from '../api/github';

/* Main Portfolio component that displays project cards with GitHub integration */
const Portfolio = () => {
  const [commitHistory, setCommitHistory] = useState({});

  /* Fetches and combines commit histories for all projects on mount */
  useEffect(() => {
    const fetchAllCommitHistories = async () => {
      const historyPromises = projects.map(async (project) => {
        const history = await fetchCommitHistory(project.github);
        return { [project.title]: history };
      });
      const histories = await Promise.all(historyPromises);
      const combinedHistories = histories.reduce(
        (acc, history) => ({ ...acc, ...history }),
        {}
      );
      setCommitHistory(combinedHistories);
    };
    fetchAllCommitHistories();
  }, []);

  const renderProject = (project, index) => {
    const repoPath = project.github.split('github.com/')[1];

    return (
      <Col md={6} key={index} className="mb-4">
        <Card className={`h-100 ${appStyles.cardBgColor}`}>
          <Card.Body
            className={`d-flex flex-column ${appStyles.cardBody} ${styles.badgePosition}`}
          >
            <Card.Title className="mb-3 d-flex justify-content-between">
              <div
                className={`${appStyles.cardHeader} d-flex align-items-center`}
              >
                {project.api && (
                  <FontAwesomeIcon icon={faDatabase} className="me-2" />
                )}
                {project.title}
              </div>
              <FontAwesomeIcon
                icon={project.collaborative ? faUsers : faUser}
              />
            </Card.Title>
            <Card.Text className={appStyles.cardText}>
              {project.description}
            </Card.Text>
            <div className={styles.technologies}>
              {project.technologies.map((tech, i) => (
                <span key={i} className={appStyles.customBadge}>
                  {tech}
                </span>
              ))}
            </div>
            <div className={`mt-auto ${styles.githubStats}`}>
              <img
                src={`https://img.shields.io/github/commit-activity/t/${repoPath}?logo=git&logoColor=white&label=Commits`}
                alt="Commit Activity"
              />
              <img
                src={`https://img.shields.io/github/last-commit/${repoPath}?logo=github&logoColor=white&label=Updated`}
                alt="Last Commit"
              />
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
            <div className="mt-3 d-flex justify-content-between">
              <Button
                href={project.github}
                target="_blank"
                className={`${styles.customButton} ${styles.githubButton}`}
              >
                <FontAwesomeIcon
                  icon={faGithub}
                  className={styles.buttonIcon}
                />
                <span className={styles.buttonText}>GitHub</span>
              </Button>
              {project.demo ? (
                <Button
                  href={project.demo}
                  target="_blank"
                  className={`${styles.customButton} ${styles.demoButton}`}
                >
                  <FontAwesomeIcon
                    icon={faRocket}
                    className={styles.buttonIcon}
                  />
                  <span className={styles.buttonText}>Demo</span>
                </Button>
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
                  <span className="d-inline-block">
                    <Button
                      disabled
                      className={`${styles.customButton} ${styles.demoButton}`}
                    >
                      <FontAwesomeIcon
                        icon={faRocket}
                        className={styles.buttonIcon}
                      />
                      <span className={styles.buttonText}>Demo</span>
                    </Button>
                  </span>
                </OverlayTrigger>
              )}
            </div>
          </Card.Body>
        </Card>
      </Col>
    );
  };

  return (
    <ScrollRevealWrapper>
      <section id="portfolio" className={appStyles.sectionPadding}>
        <Container className={appStyles.sectionContainer}>
          <div className={appStyles.sectionTitleContainer}>
            <div>
              <FontAwesomeIcon
                icon={faProjectDiagram}
                size="2x"
                className={appStyles.mainIcon}
              />
            </div>
            <h2 className={appStyles.sectionTitle}>Projects</h2>
          </div>
          <Row>{projects.map(renderProject)}</Row>
        </Container>
      </section>
    </ScrollRevealWrapper>
  );
};

export default Portfolio;
