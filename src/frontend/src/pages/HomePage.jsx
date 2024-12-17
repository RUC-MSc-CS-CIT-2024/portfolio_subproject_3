import { Container, Col, Row } from 'react-bootstrap';
import { SearchForm, ToastNotification } from '@/components';
import { useSearch } from '@/hooks';

export default function HomePage() {
  const { searchWithNavigation } = useSearch();
  return (
    <div className="homepage">
      <Container className="h-100">
        <Row className="justify-content-center align-items-center h-100">
          <Col xs={12} md={8} lg={6}>
            <h1 className="text-center my-5">Welcome to MovieDB</h1>
            <SearchForm
              btnVariant="dark"
              onSearch={(e) => searchWithNavigation(e)}
            />
          </Col>
        </Row>
        <ToastNotification />
      </Container>
    </div>
  );
}
