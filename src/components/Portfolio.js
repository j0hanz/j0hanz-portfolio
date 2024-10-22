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
} from '@fortawesome/free-solid-svg-icons';
import styles from './styles/Portfolio.module.css';
import appStyles from '../App.module.css';
import hackathonBadge from '../assets/hackathonBadge.png';

const projects = [
  {
    title: 'Tech Corner',
    description:
      'A community blog and news site for tech enthusiasts to share and engage with the latest in technology.',
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
  },
  {
    title: 'Blog Beat',
    description:
      'An interactive platform for reading, writing, and engaging with blog posts, designed for bloggers and readers.',
    github: 'https://github.com/j0hanz/blog-beat-web',
    demo: 'https://blog-beat-17c62545ca2a.herokuapp.com/',
    technologies: [
      'React.js',
      'CSS3',
      'JavaScript',
      'Bootstrap',
      'Node.js',
      'Django Rest',
      'Python',
      'SQL',
      'SEO',
      'Agile',
    ],
    collaborative: false,
    isHackathon: false,
  },
  {
    title: 'Pick my Spell',
    description:
      'A fun spelling quiz game where users pick the correct word within 10 seconds, perfect for improving spelling skills.',
    github: 'https://github.com/j0hanz/PICK-my-SPELL',
    demo: 'https://j0hanz.github.io/PICK-my-SPELL/',
    technologies: ['HTML5', 'CSS3', 'JavaScript'],
    isHackathon: false,
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
  },
  {
    title: 'Corner',
    description:
      'Corner is an upgraded version of Blog Beat, offering more features, better customization, and an improved user experience.',
    github: 'https://github.com/j0hanz/corner',
    demo: '', // No demo link available
    technologies: [
      'React.js',
      'CSS3',
      'JavaScript',
      'Bootstrap',
      'Node.js',
      'Django Rest',
      'Python',
      'SQL',
      'SEO',
    ],
    collaborative: false,
    isHackathon: false,
  },
  {
    title: 'SonataCraft',
    description:
      'A digital Baroque-era piano application allowing users to play and practice sheet music, with information on classical instruments.',
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
  },
];

/* Main Portfolio component that displays project cards with GitHub integration */
const Portfolio = () => {
  const [commitHistory, setCommitHistory] = useState({});
  const GITHUB_TOKEN = process.env.REACT_APP_GITHUB_TOKEN;
  /* Fetches latest 5 commits for a GitHub repository */
  const fetchCommitHistory = async (repo) => {
    try {
      const [owner, repoName] = repo.split('/').slice(-2);
      const url = `https://api.github.com/repos/${owner}/${repoName}/commits`;
      const response = await fetch(url, {
        headers: {
          Authorization: `token ${GITHUB_TOKEN}`,
        },
      });
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      const data = await response.json();
      return Array.isArray(data) ? data.slice(0, 5) : [];
    } catch (error) {
      console.error('Error fetching commit history:', error);
      return [];
    }
  };
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
              {project.title}
              <FontAwesomeIcon
                icon={project.collaborative ? faUsers : faUser}
              />
            </Card.Title>
            <Card.Text className={appStyles.cardText}>
              {project.description}
            </Card.Text>
            <div className={styles.technologies}>
              {project.technologies.map((tech, i) => (
                <span key={i} className={styles.techBadge}>
                  {tech}
                </span>
              ))}
            </div>
            <div className={`mb-4 ${styles.githubStats}`}>
              <img
                src={`https://img.shields.io/github/commit-activity/t/${repoPath}`}
                alt="Commit Activity"
              />
              <img
                src={`https://img.shields.io/github/last-commit/${repoPath}`}
                alt="Last Commit"
              />
              <img
                src={`https://img.shields.io/github/repo-size/${repoPath}`}
                alt="Repo Size"
              />
            </div>
            {project.isHackathon && (
              <img
                src={hackathonBadge}
                alt="Hackathon Badge"
                className={styles.hackathonBadge}
              />
            )}
            <div className="mt-auto d-flex justify-content-between">
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
                  <span className={styles.buttonText}>Live Demo</span>
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
                      <span className={styles.buttonText}>Live Demo</span>
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
        <Row className="mx-auto">{projects.map(renderProject)}</Row>
      </Container>
    </section>
  );
};

export default Portfolio;
