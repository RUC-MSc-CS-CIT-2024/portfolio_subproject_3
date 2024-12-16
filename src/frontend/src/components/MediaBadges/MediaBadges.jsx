import { Badge, Row, Col } from 'react-bootstrap';

export default function MediaBadges({ badges, onClick }) {
  return (
    <Row>
      {badges.map((badge, index) => (
        <Col key={index} xs="auto" className="mb-2">
          <Badge
            bg="secondary"
            onClick={() => onClick?.(badge)}
            className="pointer"
          >
            {badge}
          </Badge>
        </Col>
      ))}
    </Row>
  );
}
