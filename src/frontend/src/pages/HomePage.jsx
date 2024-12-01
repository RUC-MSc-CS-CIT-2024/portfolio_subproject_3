import { Container, Col, Row } from 'react-bootstrap';
import { BackgroundContainer, SearchForm } from '../components';

export default function HomePage() {
  return (
    <div>
      <BackgroundContainer>
        <Container>
          <Row>
            <Col>
              <h1 className="text-center my-5 text-light">
                Welcome to MovieDB
              </h1>
              <SearchForm btnVariant="light" />
            </Col>
          </Row>
        </Container>
      </BackgroundContainer>
    </div>
  );
}
