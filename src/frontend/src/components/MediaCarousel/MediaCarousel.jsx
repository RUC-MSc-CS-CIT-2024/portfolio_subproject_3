import { useEffect, useState, useMemo } from 'react';
import { Container, Row, Col, Carousel } from 'react-bootstrap';
import { useItemsPerRow } from '@/hooks';
import { formatDate } from '@/utils';
import { MediaCard } from '@/components';
import 'bootstrap/dist/css/bootstrap.min.css';

export default function MediaCarousel({
  media,
  loading,
  onLoadMore,
  hasNextPage,
}) {
  const itemsPerRow = useItemsPerRow();
  const [index, setIndex] = useState(0);

  const groupedMedia = useMemo(() => {
    const groups = [];
    for (let i = 0; i < media.length; i += itemsPerRow) {
      groups.push(media.slice(i, i + itemsPerRow));
    }
    return groups;
  }, [media, itemsPerRow]);

  const shouldLoadMore = useMemo(() => {
    const isLastGroup = index === groupedMedia.length - 1;
    return isLastGroup;
  }, [index, groupedMedia.length]);

  useEffect(() => {
    if (shouldLoadMore && hasNextPage && !loading) {
      onLoadMore();
    }
  }, [shouldLoadMore, hasNextPage, loading, onLoadMore]);

  const handleSelect = (selectedIndex) => {
    setIndex(selectedIndex);
  };

  return (
    <Container fluid className="container-layout">
      <Carousel
        activeIndex={index}
        onSelect={handleSelect}
        indicators={false}
        controls={true}
        interval={null}
        wrap={false}
      >
        {groupedMedia.map((group, idx) => (
          <Carousel.Item key={idx}>
            <Row>
              {group.map((mediaItem) => (
                <Col key={mediaItem.id} xs={12} sm={6} md={4} lg={3} xl={2}>
                  <MediaCard
                    id={mediaItem.id}
                    imageUri={mediaItem.posterUri}
                    title={mediaItem.title}
                    releaseYear={
                      mediaItem.releaseYear
                        ? mediaItem.releaseYear
                        : formatDate(mediaItem.releaseDate)
                    }
                    isLoading={loading}
                    type={mediaItem.type}
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
