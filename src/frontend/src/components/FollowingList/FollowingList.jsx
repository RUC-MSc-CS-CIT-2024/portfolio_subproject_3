import { OverlayTrigger, Table, Tooltip } from 'react-bootstrap';
import 'bootstrap-icons/font/bootstrap-icons.css';
import './FollowingList.css';
import { Link } from 'react-router-dom';

export default function FollowingList() {
  const data = [
    {
      followingId: 1,
      person: { id: 1, name: 'Tom Hanks' },
      pictureUri:
        'https://media.themoviedb.org/t/p/w300_and_h450_bestv2/eKF1sGJRrZJbfBG1KirPt1cfNd3.jpg',
      followedSince: '2021-01-01',
    },
    {
      followingId: 2,
      person: { id: 2, name: 'Meryl Streep' },
      pictureUri:
        'https://media.themoviedb.org/t/p/w300_and_h450_bestv2/emAAzyK1rJ6aiMi0wsWYp51EC3h.jpg',
      followedSince: '2021-02-01',
    },
    {
      followingId: 3,
      person: { id: 3, name: 'Joaquin Phoenix' },
      pictureUri:
        'https://media.themoviedb.org/t/p/w300_and_h450_bestv2/u38k3hQBDwNX0VA22aQceDp9Iyv.jpg',
      followedSince: '2021-03-01',
    },
  ];

  const rows = data.map((item) => (
    <tr key={item.followingId}>
      <td>
        <img className="mx-2" src={item.pictureUri} height={68} />
        <Link to={`/person/${item.person.id}`}>{item.person.name}</Link>
      </td>
      <td className="align-middle">{item.followedSince}</td>
      <td className="align-middle">
        <OverlayTrigger overlay={<Tooltip>Unfollow</Tooltip>}>
          <i className="bi bi-person-dash text-danger" />
        </OverlayTrigger>
      </td>
    </tr>
  ));

  return (
    <Table hover>
      <thead>
        <tr>
          <th>Name</th>
          <th className="w-25">Follow date</th>
          <th className="action-col"></th>
        </tr>
      </thead>
      <tbody>{rows}</tbody>
    </Table>
  );
}
