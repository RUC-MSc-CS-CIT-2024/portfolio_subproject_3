import { Table } from 'react-bootstrap';
import 'bootstrap-icons/font/bootstrap-icons.css';
import { formatDate } from '@/utils/date';
import { MediaCardBadge } from '@/components';

export default function CreditsList({ items = [] }) {
  const sortedItems = items.sort(
    (a, b) => new Date(b.releaseDate) - new Date(a.releaseDate),
  );

  let rows = sortedItems.map((item, index) => (
    <tr key={`${item.id}${index}`}>
      <td className="d-flex align-items-center">
        <img
          className="mx-2 responsive-img"
          src={`https://image.tmdb.org/t/p/w500${item.posterUri}`}
          height={68}
        />
        <p to={`/media/${item.id}`}>{item.title}</p>
      </td>
      <td className="align-middle">
        <MediaCardBadge type={item?.type} />
      </td>
      <td className="align-middle">{item.character}</td>
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
            <th>Character name</th>
            <th>Release Date</th>
          </tr>
        </thead>
        <tbody>{rows}</tbody>
      </Table>
    </div>
  );
}
