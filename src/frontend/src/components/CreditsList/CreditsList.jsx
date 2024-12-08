import { Table } from 'react-bootstrap';
import 'bootstrap-icons/font/bootstrap-icons.css';
import { formatDate } from '@/utils/date';

export default function CreditsList({ items = [] }) {
  const sortedItems = items.sort(
    (a, b) => new Date(b.releaseDate) - new Date(a.releaseDate),
  );

  let rows = sortedItems.map((item) => (
    <tr key={item.id}>
      <td className="d-flex align-items-center">
        <img
          className="mx-2 responsive-img"
          src={`https://image.tmdb.org/t/p/w500${item.posterPath}`}
          height={68}
        />
        <p to={`/media/${item.id}`}>{item.originalTitle}</p>
      </td>
      <td className="align-middle">{item.mediaType}</td>
      <td className="align-middle">{item.voteAverage}</td>
      <td className="align-middle">{item.voteCount}</td>
      <td className="align-middle">{formatDate(item.releaseDate)}</td>
    </tr>
  ));

  if (rows.length === 0) {
    rows = (
      <tr>
        <td colSpan={3} height={100} className="text-center align-middle">
          No known works available.
        </td>
      </tr>
    );
  }

  return (
    <div className="table-responsive">
      <Table>
        <thead>
          <tr>
            <th>Title</th>
            <th>Type</th>
            <th>Rating</th>
            <th>Vote Count</th>
            <th>Release Date</th>
          </tr>
        </thead>
        <tbody>{rows}</tbody>
      </Table>
    </div>
  );
}
