import { useNavigate } from 'react-router-dom';
import { Card, Placeholder } from 'react-bootstrap';
import { DefaultImage, MediaTypeBadge } from '@/components';
import './MediaCard.css';

export default function MediaCard({ id, imageUri, title, type, releaseYear }) {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate(`/media/${id}`);
    window.scrollTo(0, 0);
  };

  const defaultTitle = 'Unknown Title';
  const defaultReleaseYear = 'Unknown Year';
  const isLoading = !id;

  return (
    <div onClick={handleClick} className="mediaCard-clickable">
      <Card className="mediaCard">
        {isLoading ? (
          <Placeholder as={Card.Img} className="mediaCard-img" />
        ) : (
          <div className="mediaCard-img">
            {imageUri ? <Card.Img src={imageUri} /> : <DefaultImage />}
            <MediaTypeBadge type={type} />
          </div>
        )}
        <Card.Body className="mediaCard-body">
          {isLoading ? (
            <>
              <Placeholder as={Card.Title} animation="glow">
                <Placeholder xs={6} />
              </Placeholder>
              <Placeholder as={Card.Text} animation="glow">
                <Placeholder xs={4} />
              </Placeholder>
            </>
          ) : (
            <>
              <Card.Title className="mediaCard-title-custom">
                {title || defaultTitle}
              </Card.Title>
              <Card.Text className="">
                {releaseYear || defaultReleaseYear}
              </Card.Text>
            </>
          )}
        </Card.Body>
      </Card>
    </div>
  );
}
