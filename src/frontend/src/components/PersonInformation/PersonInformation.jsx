import { useState } from 'react';
import {
  Container,
  Row,
  Col,
  Image,
  Placeholder,
  Button,
} from 'react-bootstrap';
import { PlaceholderText, InfoRow, DefaultImage, Rating } from '@/components';
import './PersonInformation.css';

export default function PersonInformation({
  pictureUri,
  name,
  birthDate,
  deathDate,
  bio,
  rating,
  roles = [],
  isLoading,
}) {
  const [showMore, setShowMore] = useState(false);

  const toggleShowMore = () => setShowMore(!showMore);

  const bioPreview = bio?.length > 200 ? bio.substring(0, 200) + '...' : bio;

  return (
    <Container className="person-layout">
      <Row>
        <Col xs={12} md={3}>
          {isLoading ? (
            <Placeholder as={Image} className="personCard-img" />
          ) : (
            <div className="personCard-img">
              {pictureUri ? (
                <Image
                  src={pictureUri}
                  alt={`${name}'s picture`}
                  fluid
                  rounded
                />
              ) : (
                <DefaultImage />
              )}
            </div>
          )}
        </Col>
        <Col xs={12} md={9}>
          <Row>
            <Col className="d-flex align-items-baseline">
              {isLoading ? (
                <PlaceholderText as="h1" xs={6} />
              ) : (
                <>
                  <h1 className="title">{name || 'Unknown Name'}</h1>
                  <p className="secondary-information">
                    {birthDate || 'Unknown Birth Date'}
                    {deathDate ? ` - ${deathDate}` : ''}
                  </p>
                </>
              )}
            </Col>
          </Row>
          <Row>
            <Col>
              <div>
                <h5>Biography</h5>
                {isLoading ? (
                  <>
                    <PlaceholderText as="p" xs={12} />
                    <PlaceholderText as="p" xs={12} />
                    <PlaceholderText as="p" xs={12} />
                  </>
                ) : (
                  <>
                    <p className="bio-text">{showMore ? bio : bioPreview}</p>
                    {bio?.length > 200 && (
                      <Button
                        variant="link"
                        onClick={toggleShowMore}
                        className="toggle-button"
                      >
                        {showMore ? 'See Less' : 'See More'}
                      </Button>
                    )}
                  </>
                )}
              </div>
            </Col>
          </Row>
          <Row>
            <Col>
              {isLoading ? (
                <PlaceholderText as="p" xs={6} />
              ) : (
                <div className="d-flex mt-3 roles-information">
                  <InfoRow
                    label="Roles"
                    value={roles.join(', ') || 'Unknown'}
                  />
                </div>
              )}
            </Col>
          </Row>
          <Row>
            <Col>
              <Rating ratings={[{ name: 'User Rating', score: rating }]} />
            </Col>
          </Row>
        </Col>
      </Row>
    </Container>
  );
}
