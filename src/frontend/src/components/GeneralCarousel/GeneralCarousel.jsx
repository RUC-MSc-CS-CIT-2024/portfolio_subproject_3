import { useEffect, useMemo, useState } from 'react';
import { Container, Row, Col, Carousel } from 'react-bootstrap';
import { useItemsPerRow } from '@/hooks';
import 'bootstrap/dist/css/bootstrap.min.css';

export default function GeneralCarousel({
  items,
  loading,
  onLoadMore,
  hasNextPage,
  renderItem,
}) {
  const itemsPerRow = useItemsPerRow();
  const [index, setIndex] = useState(0);

  const groupedItems = useMemo(() => {
    const groups = [];
    for (let i = 0; i < items.length; i += itemsPerRow) {
      groups.push(items.slice(i, i + itemsPerRow));
    }
    return groups;
  }, [items, itemsPerRow]);

  useEffect(() => {
    if (index === groupedItems.length - 1 && hasNextPage && !loading) {
      onLoadMore();
    }
  }, [index, groupedItems.length, hasNextPage, loading, onLoadMore]);

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
        {groupedItems.map((group, idx) => (
          <Carousel.Item key={idx}>
            <Row>
              {group.map((item) => (
                <Col key={item.id} xs={12} sm={6} md={4} lg={3} xl={2}>
                  {renderItem(item, loading)}
                </Col>
              ))}
            </Row>
          </Carousel.Item>
        ))}
      </Carousel>
    </Container>
  );
}
