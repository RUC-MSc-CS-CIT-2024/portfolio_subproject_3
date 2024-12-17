import { Container, Row, Col, Button } from 'react-bootstrap';
import { useState } from 'react';
import { PersonCard } from '@/components';
import { useItemsPerRow } from '@/hooks';
import 'bootstrap/dist/css/bootstrap.min.css';

export default function PersonsGrid({ persons, onShowMore }) {
  const [showMore, setShowMore] = useState(false);
  const itemsPerRow = useItemsPerRow();

  const firstRowPersons = persons.slice(0, itemsPerRow);
  const remainingPersons = persons.slice(itemsPerRow);

  const handleShowMore = () => {
    const updatedShowMore = !showMore;
    setShowMore(updatedShowMore);
    onShowMore?.(updatedShowMore);
  };

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
              pictureUri={person.pictureUri}
              name={person.name}
              role={person.role}
              additionalInfo={person.additionalInfo}
            />
            {index === 0 && remainingPersons.length > 0 && !showMore && (
              <Button variant="link" onClick={handleShowMore} className="p-0">
                {showMore ? 'See Less' : 'See More'}
              </Button>
            )}
          </Col>
        ))}
      </Row>
      {showMore && (
        <>
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
                  pictureUri={person.pictureUri}
                  name={person.name}
                  role={person.role}
                  additionalInfo={person.additionalInfo}
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
