import React from 'react';

import { HiMiniCog8Tooth, HiOutlineBookOpen } from 'react-icons/hi2';

import { Grid } from '@mui/material';

import Card from '@/components/Card';
import SectionContainer from '@/components/SectionContainer';
import { SkillCardProps } from '@/config/types';
import skills from '@/lib/data/skills';

import styles from './Skills.module.css';
import appStyles from '@/styles/App.module.css';

function SkillCard({ skill }: SkillCardProps): React.JSX.Element {
  return (
    <Grid size={{ xs: 6, sm: 6, md: 3 }} sx={{ textAlign: 'center', mb: 4 }}>
      <Card title={skill.label} className={styles.skillCard}>
        <skill.icon className={styles.skillIcon} />
        {skill.learning ? (
          <div className={styles.learningBadge}>
            <HiOutlineBookOpen className={styles.learningIcon} />
            <span className={styles.skillsLearning}>Learning</span>
          </div>
        ) : null}
      </Card>
    </Grid>
  );
}

// Rendering skills section
function Skills(): React.JSX.Element {
  return (
    <SectionContainer
      id="skills"
      title="Skills"
      icon={HiMiniCog8Tooth}
      className={appStyles.sectionPadding}
    >
      <Grid container spacing={2}>
        {skills.map((skill) => (
          <SkillCard key={skill.label} skill={skill} />
        ))}
      </Grid>
    </SectionContainer>
  );
}

export default Skills;
