import { Container } from 'react-bootstrap';
import { ToastNotification } from '@/components';

export default function HomePage() {
  return (
    <Container>
      <h1>Homepage</h1>
      <ToastNotification />
    </Container>
  );
}
