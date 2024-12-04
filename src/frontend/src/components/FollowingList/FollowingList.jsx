import { OverlayTrigger, Table, Tooltip } from 'react-bootstrap';
import 'bootstrap-icons/font/bootstrap-icons.css';
import './FollowingList.css';
import { Link } from 'react-router-dom';

export default function FollowingList({ items }) {
  let rows = items.map((item) => (
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

  if (rows.length === 0) {
    rows = (
      <tr>
        <td colSpan={3} height={100} className="text-center align-middle">
          It looks like you&apos;re not following anyone yet. Use the search bar
          to find people to follow!
        </td>
      </tr>
    );
  }

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
