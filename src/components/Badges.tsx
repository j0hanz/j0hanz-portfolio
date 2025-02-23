import { FC } from 'react';
import { Row, Col, Image } from 'react-bootstrap';
import styles from './styles/Badge.module.css';

interface BadgeItemProps {
  href: string;
  imgSrc: string;
  date: string;
}

// Component for individual badge items
const BadgeItem: FC<BadgeItemProps> = ({ href, imgSrc, date }) => (
  <Col xs={'auto'}>
    <a href={href} target="_blank" rel="noopener noreferrer">
      <Image className={styles.badgeImage} src={imgSrc} alt="badge" fluid />
    </a>
    <div className={styles.badgeText}>
      <strong className="d-block">Awarded:</strong>
      <span>{date}</span>
    </div>
  </Col>
);

// Component for displaying a list of badges
const Badges: FC = () => (
  <div className={styles.badgeContainer}>
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
    <BadgeItem
      href="https://api.eu.badgr.io/public/assertions/7UoBkH6QRSKa8iGISrs9Zg"
      imgSrc="https://api.eu.badgr.io/public/assertions/7UoBkH6QRSKa8iGISrs9Zg/image"
      date="18 dec. 2024"
    />
  </div>
);

export default Badges;
