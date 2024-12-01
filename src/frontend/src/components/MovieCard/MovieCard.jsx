import { Card, Placeholder } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import './MovieCard.css';

export default function MovieCard({
  id,
  imageUri,
  title,
  releaseYear,
  isLoading,
}) {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate(`/movies/${id}`);
  };

  const defaultImage = (
    <div className="movieCard-img">
      <svg xmlns="http://www.w3.org/2000/svg" className="default-svg">
        <rect width="100%" height="100%" fill="#ddd" />
        <text
          x="50%"
          y="50%"
          dominantBaseline="middle"
          textAnchor="middle"
          fill="#aaa"
          fontSize="inherit"
        >
          No Image Found
        </text>
      </svg>
    </div>
  );
  const defaultTitle = 'Unknown Title';
  const defaultReleaseYear = 'Unknown Year';

  return (
    <div onClick={handleClick} className="movieCard-clickable">
      <Card className="movieCard">
        {isLoading ? (
          <Placeholder as={Card.Img} className="movieCard-img" />
        ) : (
          <div className="movieCard-img">
            {imageUri ? (
              <Card.Img src={imageUri} className="movieCard-img" />
            ) : (
              defaultImage
            )}
          </div>
        )}
        <Card.Body className="movieCard-body">
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
