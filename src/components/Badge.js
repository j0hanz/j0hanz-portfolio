import React from 'react';
import { Row, Col } from 'react-bootstrap';
import styles from './styles/Badge.module.css';

const BadgeItem = ({ href, imgSrc, date }) => (
  <Col xs={'auto'}>
    <a href={href} target="_blank">
      <img className={styles.badgeImage} src={imgSrc} alt="badge" />
    </a>
    <div className={styles.badgeText}>
      <strong className="d-block">Awarded:</strong>
      <span className={styles.badgeDate}>{date}</span>
    </div>
  </Col>
);

const Badge = () => (
  <Row className="d-flex justify-content-between text-center p-1 mt-5">
    <BadgeItem
      href="https://api.eu.badgr.io/public/assertions/pv52CsVuSI2V_KIyzgiahA"
      imgSrc="https://api.eu.badgr.io/public/assertions/pv52CsVuSI2V_KIyzgiahA/image"
      date="25 sep. 2024"
    />
    <BadgeItem
      href="https://api.eu.badgr.io/public/assertions/pO3q7BfdQFyGCP_gpMZb1A"
      imgSrc="https://api.eu.badgr.io/public/assertions/pO3q7BfdQFyGCP_gpMZb1A/image"
      date="20 nov. 2024"
    />
  </Row>
);

export default Badge;
