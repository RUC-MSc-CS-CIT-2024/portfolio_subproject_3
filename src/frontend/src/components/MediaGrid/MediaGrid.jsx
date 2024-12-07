import { Container, Row, Col, Button } from 'react-bootstrap';
import { useState } from 'react';
import { MediaCard } from '@/components';
import { useMediaPerRow } from '@/hooks';
import './MediaGrid.css';

export default function MediaGrid({ media, loading, onShowMore }) {
  const [showMore, setShowMore] = useState(false);
  const mediaPerRow = useMediaPerRow();

  const firstRowMedia = media.slice(0, mediaPerRow);
  const remainingMedia = media.slice(mediaPerRow);

  const handleShowMore = () => {
    setShowMore(!showMore);
    onShowMore(showMore);
  };

  return (
    <Container fluid className="container-layout ">
      <Row>
        {firstRowMedia.map((media, index) => (
          <Col
            key={index}
            xs={12}
            sm={6}
            md={4}
            lg={3}
            xl={2}
            className="position-relative"
          >
            <MediaCard
              id={media.id}
              imageUri={media.posterUri}
              type={media.type}
              title={media.title}
              releaseYear={new Date(media.releaseDate).getFullYear().toString()}
              isLoading={loading}
            />
            {index === firstRowMedia.length - 1 &&
              remainingMedia.length > 0 && (
                <Button
                  variant="link"
                  onClick={handleShowMore}
                  className="see-more-button"
                >
                  {showMore ? 'See Less' : 'See More'}
                </Button>
              )}
          </Col>
        ))}
      </Row>
      {showMore && (
        <Row>
          {remainingMedia.map((media, index) => (
            <Col
              key={index}
              xs={12}
              sm={6}
              md={4}
              lg={3}
              xl={2}
              className="position-relative"
            >
              <MediaCard
                id={media.id}
                imageUri={media.posterUri}
                type={media.type}
                title={media.title}
                releaseYear={new Date(media.releaseDate)
                  .getFullYear()
                  .toString()}
                isLoading={loading}
              />
            </Col>
          ))}
        </Row>
      )}
    </Container>
  );
}
