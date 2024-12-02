import { Container, Row, Col, Carousel } from 'react-bootstrap';
import { MediaCard } from '@/components';
import { useMediaPerRow } from '@/hooks';
import 'bootstrap/dist/css/bootstrap.min.css';
import './MediaCarousel.css';

export default function MediaCarousel({ media, loading }) {
  const mediaPerRow = useMediaPerRow();

  const groupedMedia = [];
  for (let i = 0; i < media.length; i += mediaPerRow) {
    groupedMedia.push(media.slice(i, i + mediaPerRow));
  }

  return (
    <Container fluid className="container-layout ">
      <Carousel indicators={false} controls={true} interval={null} wrap={false}>
        {groupedMedia.map((group, index) => (
          <Carousel.Item key={index}>
            <Row>
              {group.map((media) => (
                <Col key={media.id} xs={12} sm={6} md={4} lg={3} xl={2}>
                  <MediaCard
                    id={media.id}
                    imageUri={media.imageUri}
                    title={media.title}
                    releaseYear={media.releaseYear}
                    isLoading={loading}
                  />
                </Col>
              ))}
            </Row>
          </Carousel.Item>
        ))}
      </Carousel>
    </Container>
  );
}
