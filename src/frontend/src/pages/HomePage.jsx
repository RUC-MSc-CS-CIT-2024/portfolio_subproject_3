import { Container, Col, Row } from 'react-bootstrap';
import { BackgroundContainer, SearchForm } from '@/components';
import { ToastNotification } from '@/components';
import { useNavigate } from 'react-router-dom';

export default function HomePage() {
  const navigate = useNavigate();

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
                onSearch={(query) =>
                  navigate(`/search?q=${encodeURIComponent(query)}`)
                }
              />
            </Col>
          </Row>
          <ToastNotification />
        </Container>
      </BackgroundContainer>
    </div>
  );
}
