import { useState } from 'react';
import { Container, Tabs, Tab, Row, Col } from 'react-bootstrap';
import { MediaBadges } from '@/components';

export default function MediaDetailPage() {
  const genres = ['Action', 'Comedy'];
  const titles = [
    'The Shawshank Redemption',
    'La redención de Shawshank', // Spanish
    'La rédemption de Shawshank', // French
    'Die Verurteilten', // German
    'Le ali della libertà', // Italian
    'Shawshank Redemption', // Japanese
  ];

  const [activeKey, setActiveKey] = useState('genres');

  return (
    <Container>
      <h1>Media Detail</h1>
      <Row>
        <Col md={6}>
          <Tabs
            id="media-detail-tabs"
            activeKey={activeKey}
            onSelect={(k) => setActiveKey(k)}
            className="mb-3"
          >
            <Tab eventKey="genres" title="Genres">
              <MediaBadges title="Genres" badges={genres} />
            </Tab>
            <Tab eventKey="titles" title="Titles">
              <MediaBadges title="Titles" badges={titles} />
            </Tab>
          </Tabs>
        </Col>
      </Row>
    </Container>
  );
}
