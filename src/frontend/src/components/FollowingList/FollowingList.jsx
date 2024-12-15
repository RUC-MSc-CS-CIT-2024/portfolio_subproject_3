import { Link } from 'react-router-dom';
import { OverlayTrigger, Table, Tooltip } from 'react-bootstrap';
import 'bootstrap-icons/font/bootstrap-icons.css';
import { unfollowPerson } from '@/services';
import { useEffect, useState } from 'react';
import { formatDate } from '@/utils';
import { useToast } from '@/hooks';
import { DefaultImage } from '@/components';

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
      showToastMessage('Unfollowed person.', 'success');
    } catch (error) {
      console.error('Error unfollowing person:', error);
      showToastMessage('Error unfollowing person.', 'danger');
    }
  };

  let rows = following.map((item) => (
    <tr key={item.followingId}>
      <td className="d-flex align-items-center gap-3">
        {item?.pictureUri ? (
          <img className="mx-2 responsive-img rounded" src={item?.pictureUri} />
        ) : (
          <div className="default-image-container mx-2">
            <DefaultImage />
          </div>
        )}
        <Link to={`/persons/${item.person.id}`}>{item.person.name}</Link>
      </td>
      <td className="align-middle">{formatDate(item.followedSince)}</td>
      <td className="align-middle">
        <OverlayTrigger overlay={<Tooltip>Unfollow</Tooltip>}>
          <span
            onClick={() => handleUnfollow(item.followingId)}
            className="cursor-pointer "
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
    <div className="table-responsive">
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
    </div>
  );
}
