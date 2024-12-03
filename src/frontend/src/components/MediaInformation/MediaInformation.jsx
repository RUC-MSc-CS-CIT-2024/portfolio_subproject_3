import { useState } from 'react';
import {
  Container,
  Row,
  Col,
  Image,
  Button,
  Placeholder,
} from 'react-bootstrap';
import './MediaInformation.css';
import { PlaceholderText, InfoRow, DefaultImage, Rating } from '@/components';
import { formatDate } from '@/utils/date';

export default function MediaInformation({
  posterUri,
  title,
  releaseDate,
  runtimeMinutes,
  rating,
  plot,
  director,
  writer,
  producer,
  scores,
  isLoading,
}) {
  const [showMore, setShowMore] = useState(false);

  const toggleShowMore = () => setShowMore(!showMore);

  const plotPreview =
    plot?.length > 200 ? plot.substring(0, 200) + '...' : plot;

  const renderInfoRowWithSeparator = (label, value, showSeparator) => (
    <>
      <InfoRow label={label} value={value} />
      {showSeparator && <p className="mx-3 lines">|</p>}
    </>
  );

  return (
    <Container className="container-layout">
      <Row>
        <Col xs={12} md={3} className="image-container">
          {isLoading ? (
            <Placeholder as={Image} className="mediaCard-img" />
          ) : (
            <div className="mediaCard-img">
              {posterUri ? (
                <Image
                  src={posterUri}
                  alt={`${title} poster`}
                  fluid
                  rounded
                  className="img-media-information"
                />
              ) : (
                <DefaultImage />
              )}
            </div>
          )}
        </Col>
        <Col xs={12} md={9}>
          <Row>
            <Col className="d-flex align-items-baseline flex-wrap">
              {isLoading ? (
                <PlaceholderText as="h1" xs={6} />
              ) : (
                <>
                  <h1 className="title">{title || 'Unknown Title'}</h1>
                  <p className="secondary-information">
                    {formatDate(releaseDate) || 'Unknown Year'}
                  </p>
                </>
              )}
            </Col>
          </Row>
          <Row>
            <Col>
              {isLoading ? (
                <>
                  <PlaceholderText as="p" xs={4} />
                  <PlaceholderText as="p" xs={4} />
                </>
              ) : (
                <div className="d-flex">
                  {renderInfoRowWithSeparator(
                    'Runtime',
                    runtimeMinutes === null
                      ? 'Unknown length'
                      : `${runtimeMinutes} minutes`,
                    runtimeMinutes !== null && rating,
                  )}
                  {rating && <InfoRow label="Age Rating" value={rating} />}
                </div>
              )}
            </Col>
          </Row>
          <Row>
            <Col>
              <div>
                <h5>Plot</h5>
                {isLoading ? (
                  <>
                    <PlaceholderText as="p" xs={12} />
                    <PlaceholderText as="p" xs={12} />
                    <PlaceholderText as="p" xs={12} />
                    <PlaceholderText as="p" xs={12} />
                  </>
                ) : (
                  <>
                    <p className="plot-text">{showMore ? plot : plotPreview}</p>
                    {plot?.length > 200 && (
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
                <>
                  <PlaceholderText as="p" xs={6} />
                  <PlaceholderText as="p" xs={6} />
                </>
              ) : (
                <div className="d-flex mt-3 crew-information">
                  {director.length > 0 &&
                    renderInfoRowWithSeparator(
                      'Director',
                      director.join(', '),
                      writer.length > 0 || producer.length > 0,
                    )}
                  {writer.length > 0 &&
                    renderInfoRowWithSeparator(
                      'Writer',
                      writer.join(', '),
                      producer.length > 0,
                    )}
                  {producer.length > 0 && (
                    <InfoRow label="Producer" value={producer.join(', ')} />
                  )}
                </div>
              )}
            </Col>
          </Row>
          <Row>
            <Col>
              <Rating ratings={scores} />
            </Col>
          </Row>
        </Col>
      </Row>
    </Container>
  );
}
