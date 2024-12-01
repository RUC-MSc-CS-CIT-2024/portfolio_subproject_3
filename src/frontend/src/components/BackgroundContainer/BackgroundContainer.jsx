import { Container } from 'react-bootstrap';
import './BackgroundContainer.css';

export default function BackgroundContainer({ children }) {
  return (
    <div className="background-image">
      <Container className="d-flex justify-content-center align-items-center h-50 opacity-100">
        {children}
      </Container>
    </div>
  );
}
