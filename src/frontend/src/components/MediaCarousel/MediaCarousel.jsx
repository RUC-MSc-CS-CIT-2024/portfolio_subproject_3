import { Container, Row, Col, Carousel } from 'react-bootstrap';
import { useItemsPerRow } from '@/hooks';
import { formatDate } from '@/utils';
import { MediaCard } from '@/components';
import 'bootstrap/dist/css/bootstrap.min.css';

export default function MediaCarousel({ media, loading }) {
  const itemsPerRow = useItemsPerRow();

  const groupedMedia = [];
  for (let i = 0; i < media.length; i += itemsPerRow) {
    groupedMedia.push(media.slice(i, i + itemsPerRow));
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
                    imageUri={media.posterUri}
                    title={media.title}
                    releaseYear={formatDate(media.releaseDate)}
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
