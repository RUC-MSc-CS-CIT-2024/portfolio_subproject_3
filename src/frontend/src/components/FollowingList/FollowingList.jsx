import { OverlayTrigger, Table, Tooltip } from 'react-bootstrap';
import 'bootstrap-icons/font/bootstrap-icons.css';
import './FollowingList.css';
import { Link } from 'react-router-dom';
import { unfollowPerson } from '@/services/userService';
import { useEffect, useState } from 'react';
import { formatDate } from '@/utils/date';
import { useToast } from '@/hooks';

export default function FollowingList({ items }) {
  const [following, setFollowing] = useState(items);
  const { showToastMessage } = useToast();

  useEffect(() => {
    setFollowing(items);
  }, [items]);

  const handleUnfollow = async (followingId) => {
    try {
      await unfollowPerson(followingId);
      setFollowing(
        following.filter((item) => item.followingId !== followingId),
      );
      showToastMessage('Unfollowed user.', 'success');
    } catch (error) {
      console.error('Error unfollowing user:', error);
      showToastMessage('Error unfollowing user.', 'danger');
    }
  };

  let rows = following.map((item) => (
    <tr key={item.followingId}>
      <td>
        <img className="mx-2" src={item.pictureUri} height={68} />
        <Link to={`/person/${item.person.id}`}>{item.person.name}</Link>
      </td>
      <td className="align-middle">{formatDate(item.followedSince)}</td>
      <td className="align-middle">
        <OverlayTrigger overlay={<Tooltip>Unfollow</Tooltip>}>
          <span
            onClick={() => handleUnfollow(item.followingId)}
            className="currsor-pointer "
          >
            <i className="bi bi-person-dash text-danger" />
          </span>
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
