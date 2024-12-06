import { useState } from 'react';
import {
  Container,
  Row,
  Col,
  Image,
  Button,
  Placeholder,
} from 'react-bootstrap';
import { formatDate } from '@/utils';
import {
  PlaceholderText,
  DefaultImage,
  Rating,
  InfoRowWithSeparator,
} from '@/components';
import './MediaInformation.css';

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
                <PlaceholderText as="h1" xs={4} />
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
                  <InfoRowWithSeparator
                    label="Runtime"
                    value={
                      runtimeMinutes === null
                        ? 'Unknown length'
                        : `${runtimeMinutes} minutes`
                    }
                    showSeparator={runtimeMinutes !== null && rating}
                  />
                  {rating && (
                    <InfoRowWithSeparator
                      label="Age Rating"
                      value={rating}
                      showSeparator={false}
                    />
                  )}
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
                  {director.length > 0 && (
                    <InfoRowWithSeparator
                      label="Director"
                      value={director.join(', ')}
                      showSeparator={writer.length > 0 || producer.length > 0}
                    />
                  )}
                  {writer.length > 0 && (
                    <InfoRowWithSeparator
                      label="Writer"
                      value={writer.join(', ')}
                      showSeparator={producer.length > 0}
                    />
                  )}
                  {producer.length > 0 && (
                    <InfoRowWithSeparator
                      label="Producer"
                      value={producer.join(', ')}
                      showSeparator={false}
                    />
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
