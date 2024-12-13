import { Table } from 'react-bootstrap';
import 'bootstrap-icons/font/bootstrap-icons.css';
import { formatDate } from '@/utils';
import { MediaCardBadge, DefaultImage } from '@/components';

export default function CreditsList({ items = [] }) {
  const sortedItems = items.sort(
    (a, b) => new Date(b.releaseDate) - new Date(a.releaseDate),
  );

  let rows = sortedItems.map((item, index) => (
    <tr key={`${item.id}${index}`}>
      <td className="d-flex align-items-center">
        {item.media.posterUri ? (
          <img
            className="mx-2 responsive-img"
            src={`${item?.media?.posterUri}`}
            height={68}
          />
        ) : (
          <div className="default-image-container mx-2">
            <DefaultImage />
          </div>
        )}
        <p to={`/media/${item.id}`}>{item.media.title}</p>
      </td>
      <td className="align-middle">
        <MediaCardBadge type={item?.media.type} />
      </td>
      <td className="align-middle text-capitalize ">{item?.role}</td>
      <td className="align-middle">{formatDate(item?.media?.releaseDate)}</td>
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
            <th>Role</th>
            <th>Release Date</th>
          </tr>
        </thead>
        <tbody>{rows}</tbody>
      </Table>
    </div>
  );
}
