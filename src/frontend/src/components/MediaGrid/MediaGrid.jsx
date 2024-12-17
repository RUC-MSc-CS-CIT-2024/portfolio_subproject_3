import { useState } from 'react';
import { Container, Row, Col, Button } from 'react-bootstrap';
import { useItemsPerRow } from '@/hooks';
import { MediaCard } from '@/components';

export default function MediaGrid({ media, onShowMore }) {
  const [showMore, setShowMore] = useState(false);
  const itemsPerRow = useItemsPerRow();

  const firstRowMedia = media.slice(0, itemsPerRow);
  const remainingMedia = media.slice(itemsPerRow);

  const handleShowMore = () => {
    const updatedShowMore = !showMore;
    setShowMore(updatedShowMore);
    onShowMore?.(updatedShowMore);
  };

  return (
    <Container fluid className="container-layout">
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
            />
            {index === 0 && remainingMedia.length > 0 && !showMore && (
              <Button variant="link" onClick={handleShowMore} className="p-0">
                See More
              </Button>
            )}
          </Col>
        ))}
      </Row>
      {showMore && (
        <>
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
                />
              </Col>
            ))}
          </Row>
          <Row>
            <Col className="text-left">
              <Button variant="link" onClick={handleShowMore} className="p-0">
                See Less
              </Button>
            </Col>
          </Row>
        </>
      )}
    </Container>
  );
}
