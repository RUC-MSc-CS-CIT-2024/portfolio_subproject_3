import React from 'react';
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
import { Link } from 'react-router-dom';
import { formatDate } from '@/utils/date';
import { useToast } from '@/hooks';
import { useState, useEffect } from 'react';
import {
  removeBookmark,
  markBookmarkAsCompleted,
} from '@/services/userService';

export default function BookmarkList({ items }) {
  const [bookmarks, setBookmarks] = useState(items);
  const [expandedRow, setExpandedRow] = useState(null);
  const [rewatchability, setRewatchability] = useState(1);
  const [note, setNote] = useState('');
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

  const handleMarkAsCompleted = async (bookmarkId) => {
    const completedDate = new Date().toISOString();

    try {
      await markBookmarkAsCompleted(
        bookmarkId,
        completedDate,
        rewatchability,
        note,
      );
      setBookmarks(bookmarks.filter((item) => item.bookmarkId !== bookmarkId));
      showToastMessage('Bookmark marked as completed.', 'success');
      setExpandedRow(null); // Collapse the row after submission
    } catch (error) {
      console.error('Error marking bookmark as completed:', error);
      showToastMessage('Failed to mark bookmark as completed.', 'danger');
    }
  };

  const toggleRow = (bookmarkId) => {
    setExpandedRow(expandedRow === bookmarkId ? null : bookmarkId);
  };

  let rows = bookmarks.map((item) => (
    <React.Fragment key={item.bookmarkId}>
      <tr>
        <td>
          <img className="mx-2" src={item.media.posterUri} height={68} />
          <Link to={`/media/${item.media.id}`}>{item.media.title}</Link>
        </td>
        <td className="align-middle">{item.media.type}</td>
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
            <Form inline>
              <Row className="align-items-end mb-3">
                <Col>
                  <Form.Group controlId="rewatchability">
                    <Form.Label>Rewatchability</Form.Label>
                    <Form.Control
                      type="number"
                      value={rewatchability}
                      onChange={(e) => setRewatchability(e.target.value)}
                      className="ml-2"
                    />
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
                  <Button
                    variant="outline-dark"
                    onClick={() => handleMarkAsCompleted(item.bookmarkId)}
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
  );
}
