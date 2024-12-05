import { Container, Row, Col, Carousel } from 'react-bootstrap';
import { PersonCard } from '@/components';
import { useItemsPerRow } from '@/hooks';
import 'bootstrap/dist/css/bootstrap.min.css';

export default function PersonsCarousel({ persons, loading }) {
  const itemsPerRow = useItemsPerRow();

  const groupedPersons = [];
  for (let i = 0; i < persons.length; i += itemsPerRow) {
    groupedPersons.push(persons.slice(i, i + itemsPerRow));
  }

  return (
    <Container fluid className="container-layout">
      <Carousel indicators={false} controls={true} interval={null} wrap={false}>
        {groupedPersons.map((group, index) => (
          <Carousel.Item key={index}>
            <Row>
              {group.map((person) => (
                <Col key={person.id} xs={12} sm={6} md={4} lg={3} xl={2}>
                  <PersonCard
                    id={person.id}
                    imageUri={person.imageUri}
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
