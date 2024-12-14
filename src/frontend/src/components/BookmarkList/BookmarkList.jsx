import React, { useState, useEffect } from 'react';
import {
  Table,
  OverlayTrigger,
  Tooltip,
  Button,
  Form,
  Row,
  Col,
} from 'react-bootstrap';
import 'bootstrap-icons/font/bootstrap-icons.css';
import ReactStarsRating from 'react-awesome-stars-rating';
import { Link } from 'react-router-dom';
import { formatDate, rewatchabilityMap } from '@/utils';
import { useToast } from '@/hooks';
import {
  removeBookmark,
  markBookmarkAsCompleted,
  createScore,
} from '@/services';
import { MediaCardBadge, DefaultImage } from '@/components';

export default function BookmarkList({
  items,
  loadMoreBookmarks,
  hasMoreItems,
}) {
  const [bookmarks, setBookmarks] = useState(items);
  const [expandedRow, setExpandedRow] = useState(null);
  const [rewatchability, setRewatchability] = useState('');
  const [note, setNote] = useState('');
  const [rating, setRating] = useState('');
  const [review, setReview] = useState('');
  const { showToastMessage } = useToast();

  useEffect(() => {
    setBookmarks(items);
  }, [items]);

  const handleRemoveBookmark = async (bookmarkId) => {
    try {
      await removeBookmark(bookmarkId);
      setBookmarks(bookmarks.filter((item) => item.bookmarkId !== bookmarkId));
      showToastMessage('Bookmark removed.', 'success');
    } catch (error) {
      console.error('Error removing bookmark:', error);
      showToastMessage('Failed to remove bookmark.', 'danger');
    }
  };

  const handleMarkAsCompleted = async (bookmarkId, mediaId) => {
    const completedDate = new Date().toISOString();

    try {
      await markBookmarkAsCompleted(
        bookmarkId,
        completedDate,
        rewatchability,
        note,
      );

      if (rating || review) {
        await createScore({
          mediaId: mediaId,
          score: rating,
          reviewText: review,
        });
      }

      setBookmarks(bookmarks.filter((item) => item.bookmarkId !== bookmarkId));
      showToastMessage(
        'Bookmark marked as completed and rating submitted.',
        'success',
      );
      setExpandedRow(null);
    } catch (error) {
      console.error(
        'Error marking bookmark as completed and submitting rating:',
        error,
      );
      showToastMessage(
        'Failed to mark bookmark as completed and submit rating.',
        'danger',
      );
    }
  };

  const toggleRow = (bookmarkId) => {
    setExpandedRow(expandedRow === bookmarkId ? null : bookmarkId);
  };

  const handleRatingChange = (value) => {
    const ratingValue = value * 2;
    setRating(ratingValue);
  };

  let rows = bookmarks.map((item) => (
    <React.Fragment key={item.bookmarkId}>
      <tr>
        <td className="d-flex align-items-center gap-3">
          {item.media.posterUri ? (
            <img
              className="mx-2 responsive-img rounded"
              src={item.media.posterUri}
              height={68}
            />
          ) : (
            <div className="default-image-container mx-2">
              <DefaultImage />
            </div>
          )}
          <Link to={`/media/${item.media.id}`}>{item.media.title}</Link>
        </td>
        <td className="align-middle">
          <MediaCardBadge type={item.media.type} />
        </td>
        <td className="align-middle">{formatDate(item.media.releaseDate)}</td>
        <td className="align-middle">{item.media.ageRating}</td>
        <td className="align-middle">{item.media.runtimeMinutes}</td>
        <td className="align-middle">{item.note}</td>
        <td className="align-middle">
          <OverlayTrigger overlay={<Tooltip>Remove bookmark</Tooltip>}>
            <span
              className="cursor-pointer"
              onClick={() => handleRemoveBookmark(item.bookmarkId)}
            >
              <i className="bi bi-bookmark-x text-danger" />
            </span>
          </OverlayTrigger>
          <OverlayTrigger overlay={<Tooltip>Mark as completed</Tooltip>}>
            <span
              className="cursor-pointer"
              onClick={() => toggleRow(item.bookmarkId)}
            >
              <i className="bi bi-star-fill text-warning" />
            </span>
          </OverlayTrigger>
        </td>
      </tr>
      {expandedRow === item.bookmarkId && (
        <tr>
          <td colSpan={7}>
            <Form>
              <Row className="align-items-end mb-3">
                <Col>
                  <Form.Group controlId="rewatchability">
                    <Form.Label>Rewatchability</Form.Label>
                    <Form.Control
                      as="select"
                      value={rewatchability}
                      onChange={(e) => setRewatchability(e.target.value)}
                      className="ml-2"
                    >
                      <option value="">Select rewatchability</option>
                      {Object.entries(rewatchabilityMap).map(
                        ([value, label]) => (
                          <option key={value} value={value}>
                            {label}
                          </option>
                        ),
                      )}
                    </Form.Control>
                  </Form.Group>
                </Col>
                <Col>
                  <Form.Group controlId="note">
                    <Form.Label>Note</Form.Label>
                    <Form.Control
                      type="text"
                      value={note}
                      onChange={(e) => setNote(e.target.value)}
                      className="ml-2"
                    />
                  </Form.Group>
                </Col>
                <Col>
                  <Form.Group controlId="rating" className="d-flex flex-column">
                    <Form.Label>Rating</Form.Label>
                    <ReactStarsRating
                      value={rating / 2 || 0}
                      onChange={handleRatingChange}
                      count={5}
                      size={30}
                      isHalf={true}
                      primaryColor="orange"
                      secondaryColor="grey"
                      className="mt-1"
                    />
                  </Form.Group>
                </Col>
                <Col>
                  <Form.Group controlId="review">
                    <Form.Label>Review</Form.Label>
                    <Form.Control
                      type="text"
                      value={review}
                      onChange={(e) => setReview(e.target.value)}
                      className="ml-2"
                    />
                  </Form.Group>
                </Col>
                <Col>
                  <Button
                    variant="outline-dark"
                    onClick={() =>
                      handleMarkAsCompleted(item.bookmarkId, item.media.id)
                    }
                    className="ml-2"
                  >
                    Submit
                  </Button>
                </Col>
              </Row>
            </Form>
          </td>
        </tr>
      )}
    </React.Fragment>
  ));

  if (rows.length === 0) {
    rows = (
      <tr>
        <td colSpan={7} height={100} className="text-center align-middle">
          It looks like you haven&apos;t bookmarked anything yet. Use the search
          bar to find media to bookmark!
        </td>
      </tr>
    );
  }

  return (
    <div className="table-responsive">
      <Table hover>
        <thead>
          <tr>
            <th>Title</th>
            <th>Type</th>
            <th>Release Date</th>
            <th>Age Rating</th>
            <th>Runtime</th>
            <th>Note</th>
            <th className="action-col"></th>
          </tr>
        </thead>
        <tbody>{rows}</tbody>
      </Table>
      {hasMoreItems && bookmarks.length > 0 && (
        <div className="text-left">
          <Button onClick={loadMoreBookmarks} variant="link">
            Load More
          </Button>
        </div>
      )}
    </div>
  );
}
