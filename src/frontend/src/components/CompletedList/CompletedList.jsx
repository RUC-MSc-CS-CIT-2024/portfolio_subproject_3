import { Table, OverlayTrigger, Tooltip } from 'react-bootstrap';
import 'bootstrap-icons/font/bootstrap-icons.css';
import './CompletedList.css';
import { Link } from 'react-router-dom';

export default function CompletedList({ items }) {
  let rows = items.map((item) => (
    <tr key={item.media.id}>
      <td>
        <img className="mx-2" src={item.media.posterUri} height={68} />
        <Link to={`/media/${item.media.id}`}>{item.media.title}</Link>
      </td>
      <td className="align-middle">{item.media.type}</td>
      <td className="align-middle">{item.completedDate}</td>
      <td className="align-middle">{item.rewatchability}</td>
      <td className="align-middle">{item.score.value}</td>
      <td className="align-middle">{item.score.reviewText}</td>
      <td className="align-middle">
        <OverlayTrigger overlay={<Tooltip>Remove bookmark</Tooltip>}>
          <i className="bi bi-bookmark-x text-danger" />
        </OverlayTrigger>
      </td>
    </tr>
  ));

  if (rows.length === 0) {
    rows = (
      <tr>
        <td colSpan={6} height={100} className="text-center align-middle">
          It looks like you haven&apos;t completed anything yet. Use the search
          bar to find media you have complete and mark them as so!
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
          <th>Completed Date</th>
          <th>Rewatchability</th>
          <th>Score</th>
          <th>Review Text</th>
          <th className="action-col"></th>
        </tr>
      </thead>
      <tbody>{rows}</tbody>
    </Table>
  );
}
