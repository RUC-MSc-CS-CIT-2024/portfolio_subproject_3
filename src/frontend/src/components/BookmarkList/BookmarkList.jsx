import { Table, OverlayTrigger, Tooltip } from 'react-bootstrap';
import 'bootstrap-icons/font/bootstrap-icons.css';
import './BookmarkList.css';
import { Link } from 'react-router-dom';

export default function BookmarkList() {
  const data = [
    {
      bookmarkId: 1,
      media: {
        id: 1,
        title: 'Toy Story',
        type: 'Movie',
        releaseDate: '1995-11-22',
        runtime: '81 min',
        rated: 'G',
        posterUri:
          'https://media.themoviedb.org/t/p/w300_and_h450_bestv2/uXDfjJbdP4ijW5hWSBrPrlKpxab.jpg',
      },
      note: 'A great movie',
    },
    {
      bookmarkId: 2,
      media: {
        id: 2,
        title: 'Game of Thrones',
        type: 'TV Show',
        releaseDate: '2011-04-17',
        runtime: '57 min',
        rated: 'TV-MA',
        posterUri:
          'https://media.themoviedb.org/t/p/w300_and_h450_bestv2/1XS1oqL89opfnbLl8WnZY1O1uJx.jpg',
      },
      note: undefined,
    },
    {
      bookmarkId: 3,
      media: {
        id: 3,
        title: 'The Witcher',
        type: 'TV Show',
        releaseDate: '2019-12-20',
        runtime: '60 min',
        rated: 'TV-MA',
        posterUri:
          'https://media.themoviedb.org/t/p/w300_and_h450_bestv2/cZ0d3rtvXPVvuiX22sP79K3Hmjz.jpg',
      },
      note: 'Recommended by a friend',
    },
  ];

  const rows = data.map((item) => (
    <tr key={item.bookmarkId}>
      <td>
        <img className="mx-2" src={item.media.posterUri} height={68} />
        <Link to={`/media/${item.media.id}`}>{item.media.title}</Link>
      </td>
      <td className="align-middle">{item.media.type}</td>
      <td className="align-middle">{item.media.releaseDate}</td>
      <td className="align-middle">{item.media.rated}</td>
      <td className="align-middle">{item.media.runtime}</td>
      <td className="align-middle">{item.note}</td>
      <td className="align-middle">
        <OverlayTrigger overlay={<Tooltip>Remove bookmark</Tooltip>}>
          <div>
            <i className="bi bi-bookmark-x text-danger" />
            <i className="bi bi-star-fill text-warning" />
          </div>
        </OverlayTrigger>
      </td>
    </tr>
  ));

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
