import React from 'react';
import { Row, Col } from 'react-bootstrap';
import styles from './styles/Badge.module.css';

const Badge = () => (
  <Row className="d-flex justify-content-center align-items-center">
    <Col xs={'auto'}>
      <blockquote className={styles.badge}>
        <a
          href="https://api.eu.badgr.io/public/assertions/pv52CsVuSI2V_KIyzgiahA"
          target="_blank"
        >
          <img
            className={styles.badgeImage}
            src="https://api.eu.badgr.io/public/assertions/pv52CsVuSI2V_KIyzgiahA/image"
            alt="badge"
          />
        </a>
        <div className={styles.badgeText}>
          <strong className="d-block">Awarded:</strong>
          <span className={styles.badgeDate}> 25 sep. 2024</span>
        </div>
        <script
          async
          src="https://eu.badgr.com/assets/widgets.bundle.js"
        ></script>
      </blockquote>
    </Col>
    <Col xs={'auto'}>
      <blockquote className={styles.badge}>
        <a
          href="https://api.eu.badgr.io/public/assertions/pO3q7BfdQFyGCP_gpMZb1A"
          target="_blank"
        >
          <img
            className={styles.badgeImage}
            src="https://api.eu.badgr.io/public/assertions/pO3q7BfdQFyGCP_gpMZb1A/image"
            alt="badge"
          />
        </a>
        <div className={styles.badgeText}>
          <strong className="d-block">Awarded:</strong>
          <span className={styles.badgeDate}> 20 nov. 2024</span>
        </div>
        <script
          async
          src="https://eu.badgr.com/assets/widgets.bundle.js"
        ></script>
      </blockquote>
    </Col>
  </Row>
);

export default Badge;
