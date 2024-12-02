import { Container, Row, Col } from 'react-bootstrap';
import { MediaInformation } from '@/components';
import { useParams } from 'react-router-dom';
import { MediaActions } from '@/components';

export default function MediaDetailPage() {
  const dummyData = {
    poster: '',
    title: 'Dummy Movie Title',
    year: '2023',
    length: '120 min',
    rating: 'PG-13',
    plot: 'This is a dummy plot for the movie. It describes the storyline and main events of the movie. The movie follows the journey of the protagonist as they navigate through various challenges and obstacles. Along the way, they encounter a diverse cast of characters, each with their own unique backstory and motivations. The plot thickens as secrets are revealed, alliances are formed, and conflicts arise. The protagonist must use their wit, courage, and determination to overcome the odds and achieve their goals. The movie is filled with thrilling action sequences, emotional moments, and unexpected twists and turns. As the story unfolds, the audience is taken on a rollercoaster ride of emotions, from laughter to tears, from suspense to relief. In the end, the protagonist emerges victorious, having learned valuable lessons and grown as a person. The movie leaves a lasting impact on the audience, making them reflect on their own lives and the choices they make. It is a tale of resilience, hope, and the power of the human spirit.',
    director: 'John Doe',
    screenwriter: 'Jane Smith',
  };
  const { id: mediaId } = useParams();

  return (
    <Container>
      <MediaInformation {...dummyData} />
      <Row>
        <Col xs={12} md={3}>
          <MediaActions id={mediaId} />
        </Col>
      </Row>
    </Container>
  );
}
