import { Card, Placeholder } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { DefaultImage } from '@/components';
import './PersonCard.css';

export default function PersonCard({
  id,
  imageUri,
  name,
  role,
  additionalInfo,
  isLoading,
}) {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate(`/persons/${id}`);
  };

  const defaultName = 'Unknown Name';
  const defaultRole = 'Unknown Role';

  return (
    <div onClick={handleClick} className="personCard-clickable">
      <Card className="personCard">
        {isLoading ? (
          <Placeholder as={Card.Img} className="personCard-img" />
        ) : (
          <div className="personCard-img">
            {imageUri ? (
              <Card.Img src={imageUri} className="personCard-img" />
            ) : (
              <DefaultImage />
            )}
          </div>
        )}
        <Card.Body className="personCard-body">
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
              <Card.Title>{name || defaultName}</Card.Title>
              <Card.Text className="personCard-role">
                {role || defaultRole}
              </Card.Text>
              {additionalInfo && (
                <div className="personCard-info">{additionalInfo}</div>
              )}
            </>
          )}
        </Card.Body>
      </Card>
    </div>
  );
}
