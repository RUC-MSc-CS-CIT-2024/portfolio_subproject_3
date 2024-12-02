import { Table } from 'react-bootstrap';
import 'bootstrap-icons/font/bootstrap-icons.css';
import './FollowingList.css';

export default function FollowingList() {
  const data = [
    {
      followingId: 1,
      person: { name: 'Alice' },
      followedSince: '2021-01-01',
    },
    {
      followingId: 2,
      person: { name: 'Bob' },
      followedSince: '2021-02-01',
    },
    {
      followingId: 3,
      person: { name: 'Charlie' },
      followedSince: '2021-03-01',
    },
  ];

  const rows = data.map((item) => (
    <tr key={item.followingId}>
      <td>{item.person.name}</td>
      <td>{item.followedSince}</td>
      <td>
        <i className="bi bi-person-dash text-danger" title="Unfollow" />
      </td>
    </tr>
  ));

  return (
    <Table hover>
      <thead>
        <tr>
          <th>Person Name</th>
          <th className="w-25">Following date</th>
          <th className="action-col"></th>
        </tr>
      </thead>
      <tbody>{rows}</tbody>
    </Table>
  );
}
