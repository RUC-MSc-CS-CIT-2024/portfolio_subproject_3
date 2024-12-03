import { Card, Placeholder } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { DefaultImage } from '@/components';
import './MediaCard.css';

export default function MediaCard({
  id,
  imageUri,
  title,
  releaseYear,
  isLoading,
}) {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate(`/media/${id}`);
  };

  const defaultTitle = 'Unknown Title';
  const defaultReleaseYear = 'Unknown Year';

  return (
    <div onClick={handleClick} className="mediaCard-clickable">
      <Card className="mediaCard">
        {isLoading ? (
          <Placeholder as={Card.Img} className="mediaCard-img" />
        ) : (
          <div className="mediaCard-img">
            {imageUri ? <Card.Img src={imageUri} /> : <DefaultImage />}
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
              <Card.Title>{title || defaultTitle}</Card.Title>
              <Card.Text>{releaseYear || defaultReleaseYear}</Card.Text>
            </>
          )}
        </Card.Body>
      </Card>
    </div>
  );
}
