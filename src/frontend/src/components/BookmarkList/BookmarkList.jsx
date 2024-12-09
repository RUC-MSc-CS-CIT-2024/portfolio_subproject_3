import { Link } from 'react-router-dom';
import { Table, OverlayTrigger, Tooltip } from 'react-bootstrap';
import 'bootstrap-icons/font/bootstrap-icons.css';
import './BookmarkList.css';

export default function BookmarkList({ items }) {
  let rows = items.map((item) => (
    <tr key={item.bookmarkId}>
      <td>
        <img className="mx-2" src={item.media.posterUri} height={68} />
        <Link to={`/media/${item.media.id}`}>{item.media.title}</Link>
      </td>
      <td className="align-middle">{item.media.type}</td>
      <td className="align-middle">{item.media.releaseDate}</td>
      <td className="align-middle">{item.media.ageRating}</td>
      <td className="align-middle">{item.media.runtimeMinutes}</td>
      <td className="align-middle">{item.note}</td>
      <td className="align-middle">
        <OverlayTrigger overlay={<Tooltip>Remove bookmark</Tooltip>}>
          <i className="bi bi-bookmark-x text-danger" />
        </OverlayTrigger>
        <OverlayTrigger overlay={<Tooltip>Mark as completed</Tooltip>}>
          <i className="bi bi-star-fill text-warning" />
        </OverlayTrigger>
      </td>
    </tr>
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
