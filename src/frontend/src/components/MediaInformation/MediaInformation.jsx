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
import { PlaceholderText, InfoRow, DefaultImage } from '@/components';

export default function MediaInformation({
  poster,
  title,
  year,
  length,
  rating,
  plot,
  director,
  screenwriter,
  composer,
  isLoading,
}) {
  const [showMore, setShowMore] = useState(false);

  const toggleShowMore = () => setShowMore(!showMore);

  const plotPreview =
    plot?.length > 200 ? plot.substring(0, 200) + '...' : plot;

  return (
    <Container className="container-layout">
      <Row>
        <Col xs={12} md={3}>
          {isLoading ? (
            <Placeholder as={Image} className="mediaCard-img" />
          ) : (
            <div className="mediaCard-img">
              {poster ? (
                <Image src={poster} alt={`${title} poster`} fluid rounded />
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
                  <h1 className="title">{title || 'Unknown Title'}</h1>
                  <p className="secondary-information">
                    {year || 'Unknown Year'}
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
                  <InfoRow label="Length" value={length} />
                  <p className="mx-3">|</p>
                  <InfoRow label="Rating" value={rating} />
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
                <div className="d-flex mt-3">
                  <InfoRow label="Director" value={director} />
                  <p className="mx-3">|</p>
                  <InfoRow label="Screenwriter" value={screenwriter} />
                  <p className="mx-3">|</p>
                  <InfoRow label="Composer" value={composer} />
                </div>
              )}
            </Col>
          </Row>
        </Col>
      </Row>
    </Container>
  );
}
