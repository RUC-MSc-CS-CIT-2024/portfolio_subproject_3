import { Container, Col, Row } from 'react-bootstrap';
import {
  BackgroundContainer,
  SearchForm,
  ToastNotification,
} from '@/components';
import { useSearch } from '@/hooks';

export default function HomePage() {
  const { searchWithNavigation } = useSearch();
  return (
    <div>
      <BackgroundContainer>
        <Container>
          <Row>
            <Col>
              <h1 className="text-center my-5 text-light">
                Welcome to MovieDB
              </h1>
              <SearchForm
                btnVariant="light"
                onSearch={(e) => searchWithNavigation(e)}
              />
            </Col>
          </Row>
          <ToastNotification />
        </Container>
      </BackgroundContainer>
    </div>
  );
}
