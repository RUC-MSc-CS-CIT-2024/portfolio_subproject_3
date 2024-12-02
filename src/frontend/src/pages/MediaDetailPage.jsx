import { Container, Row, Col } from 'react-bootstrap';
import { useParams } from 'react-router-dom';
import { MediaActions } from '@/components';

export default function MediaDetailPage() {
  const { id: mediaId } = useParams();

  return (
    <Container>
      <h1>Media Detail</h1>
      <Row>
        <Col xs={12} md={3}>
          <MediaActions id={mediaId} />
        </Col>
      </Row>
    </Container>
  );
}
