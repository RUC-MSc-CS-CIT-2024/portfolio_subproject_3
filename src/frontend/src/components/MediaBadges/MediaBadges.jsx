import { Badge, Row, Col } from 'react-bootstrap';
import { useNavigate } from 'react-router';
import './MediaBadges.css';

export default function MediaBadges({ badges }) {
  const navigate = useNavigate();

  const handleBadgeClick = (badge) => {
    if (badge) {
      navigate(`/${badge.toLowerCase()}`);
    }
  };
  return (
    <Row>
      {badges.map((badge, index) => (
        <Col key={index} xs="auto" className="mb-2">
          <Badge
            bg="secondary"
            onClick={() => handleBadgeClick(badge)}
            className="pointer"
          >
            {badge}
          </Badge>
        </Col>
      ))}
    </Row>
  );
}
