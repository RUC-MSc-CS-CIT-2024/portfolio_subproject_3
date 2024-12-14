import { useState } from 'react';
import {
  Container,
  Row,
  Col,
  Image,
  Placeholder,
  Button,
} from 'react-bootstrap';
import { formatDate } from '@/utils';
import { PlaceholderText, InfoRow, DefaultImage } from '@/components';
import './PersonInformation.css';

export default function PersonInformation({
  pictureUri,
  name,
  birthDate,
  deathDate,
  bio,
  alsoKnownAs = [],
  homepage,
  placeOfBirth,
  roles = [],
}) {
  const [showMore, setShowMore] = useState(false);

  const toggleShowMore = () => setShowMore(!showMore);

  const bioPreview = bio?.length > 200 ? bio.substring(0, 200) + '...' : bio;

  const formattedBirthDate = birthDate ? formatDate(birthDate) : 'Unknown';
  const formattedDeathDate = deathDate ? formatDate(deathDate) : null;
  const isLoading = !name;

  return (
    <Container className="person-layout">
      <Row>
        {/* Left Column: Picture */}
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

        {/* Right Column: Details */}
        <Col xs={12} md={9}>
          {/* Name and Dates */}
          <Row>
            <Col className="d-flex align-items-baseline">
              {isLoading ? (
                <PlaceholderText as="h1" xs={6} />
              ) : (
                <h1 className="title">{name || 'Unknown Name'}</h1>
              )}
            </Col>
          </Row>
          {/* Roles */}
          <Row className="mt-3">
            <Col>
              {isLoading ? (
                <PlaceholderText as="p" xs={6} />
              ) : (
                <>
                  <InfoRow
                    label="Birth Date"
                    value={formattedBirthDate || 'Unknown'}
                  />
                  {formattedDeathDate && (
                    <InfoRow
                      label="Death Date"
                      value={formattedDeathDate || 'Unknown'}
                    />
                  )}
                  <InfoRow
                    label="Roles"
                    value={roles.join(', ') || 'Unknown'}
                  />
                </>
              )}
            </Col>
          </Row>

          {/* Biography */}
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

          {/* Additional Information */}
          <Row className="mt-3">
            <Col>
              {isLoading ? (
                <PlaceholderText as="p" xs={6} />
              ) : (
                <>
                  <InfoRow
                    label="Also Known As"
                    value={
                      alsoKnownAs.length
                        ? alsoKnownAs.join(', ')
                        : 'No known aliases'
                    }
                  />
                  <InfoRow
                    label="Place of Birth"
                    value={placeOfBirth || 'Unknown'}
                  />
                  {homepage && (
                    <div className="mt-2">
                      <strong>Homepage:</strong>{' '}
                      <a
                        href={homepage}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        {homepage}
                      </a>
                    </div>
                  )}
                </>
              )}
            </Col>
          </Row>
        </Col>
      </Row>
    </Container>
  );
}
