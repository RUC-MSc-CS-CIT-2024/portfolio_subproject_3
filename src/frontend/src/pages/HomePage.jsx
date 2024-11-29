import Container from 'react-bootstrap/Container';
import { ToastNotification } from '@/components';

export default function HomePage() {
  return (
    <Container>
      <h1>Homepage</h1>
      <ToastNotification />
    </Container>
  );
}
