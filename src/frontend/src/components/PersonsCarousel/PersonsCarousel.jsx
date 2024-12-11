import { useEffect, useMemo, useState } from 'react';
import { Container, Row, Col, Carousel } from 'react-bootstrap';
import { PersonCard } from '@/components';
import { useItemsPerRow } from '@/hooks';
import 'bootstrap/dist/css/bootstrap.min.css';

export default function PersonsCarousel({
  persons,
  loading,
  onLoadMore,
  hasMoreItems,
}) {
  const itemsPerRow = useItemsPerRow();
  const [index, setIndex] = useState(0);

  const groupedPersons = useMemo(() => {
    const groups = [];
    for (let i = 0; i < persons.length; i += itemsPerRow) {
      groups.push(persons.slice(i, i + itemsPerRow));
    }
    return groups;
  }, [persons, itemsPerRow]);

  useEffect(() => {
    if (index === groupedPersons.length - 1 && hasMoreItems && !loading) {
      onLoadMore();
    }
  }, [index, groupedPersons.length, hasMoreItems, loading, onLoadMore]);

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
        {groupedPersons.map((group, idx) => (
          <Carousel.Item key={idx}>
            <Row>
              {group.map((person) => (
                <Col key={person.id} xs={12} sm={6} md={4} lg={3} xl={2}>
                  <PersonCard
                    id={person.id}
                    pictureUri={person.pictureUri}
                    name={person.name}
                    role={person.role}
                    additionalInfo={person.additionalInfo}
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
