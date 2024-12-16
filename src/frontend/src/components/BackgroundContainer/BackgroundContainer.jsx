import { Container } from 'react-bootstrap';
import './BackgroundContainer.css';
import heroImage from '@/assets/heroImage.jpg';

export default function BackgroundContainer({ children }) {
  return (
    <div
      className="background-image"
      style={{ backgroundImage: `url(${heroImage})` }}
    >
      <Container className="d-flex justify-content-center align-items-center h-50 opacity-100">
        {children}
      </Container>
    </div>
  );
}
