import { Badge, Row, Col } from 'react-bootstrap';

export default function MediaBadges({ badges }) {
  return (
    <Row>
      {badges.map((badge, index) => (
        <Col key={index} xs="auto" className="mb-2">
          <Badge bg="secondary">{badge}</Badge>
        </Col>
      ))}
    </Row>
  );
}
