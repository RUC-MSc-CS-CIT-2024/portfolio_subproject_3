import { Container, Row, Col, Button } from 'react-bootstrap';
import { useState } from 'react';
import { PersonCard } from '@/components';
import { useItemsPerRow } from '@/hooks';
import 'bootstrap/dist/css/bootstrap.min.css';

export default function PersonsGrid({ persons, loading }) {
  const [showMore, setShowMore] = useState(false);
  const itemsPerRow = useItemsPerRow();

  const firstRowPersons = persons.slice(0, itemsPerRow);
  const remainingPersons = persons.slice(itemsPerRow);

  return (
    <Container fluid className="container-layout">
      <Row>
        {firstRowPersons.map((person, index) => (
          <Col
            key={index}
            xs={12}
            sm={6}
            md={4}
            lg={3}
            xl={2}
            className="position-relative"
          >
            <PersonCard
              id={person.id}
              imageUri={person.pictureUri}
              name={person.name}
              role={person.role}
              additionalInfo={person.additionalInfo}
              isLoading={loading}
            />
            {index === firstRowPersons.length - 1 &&
              remainingPersons.length > 0 && (
                <Button
                  variant="link"
                  onClick={() => setShowMore(!showMore)}
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
          {remainingPersons.map((person, index) => (
            <Col
              key={index}
              xs={12}
              sm={6}
              md={4}
              lg={3}
              xl={2}
              className="position-relative"
            >
              <PersonCard
                id={person.id}
                imageUri={person.pictureUri}
                name={person.name}
                role={person.role}
                additionalInfo={person.additionalInfo}
                isLoading={loading}
              />
            </Col>
          ))}
        </Row>
      )}
    </Container>
  );
}
