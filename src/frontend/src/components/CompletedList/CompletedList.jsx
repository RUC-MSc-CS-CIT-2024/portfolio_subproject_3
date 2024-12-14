import { useState, useEffect } from 'react';
import { Table, OverlayTrigger, Tooltip, Button } from 'react-bootstrap';
import 'bootstrap-icons/font/bootstrap-icons.css';
import { Link } from 'react-router-dom';
import { formatDate, rewatchabilityMap } from '@/utils';
import { useToast } from '@/hooks';
import { removeCompletedItem } from '@/services';
import { MediaTypeBadge, DefaultImage } from '@/components';

export default function CompletedList({
  items,
  loadMoreCompleted,
  hasMoreItems,
}) {
  const [completedItems, setCompletedItems] = useState(items);
  const { showToastMessage } = useToast();

  useEffect(() => {
    setCompletedItems(items);
  }, [items]);

  const handleRemoveCompletedItem = async (completedId) => {
    try {
      await removeCompletedItem(completedId);
      setCompletedItems(
        completedItems.filter((item) => item.completedId !== completedId),
      );
      showToastMessage('Completed item removed.', 'success');
    } catch (error) {
      console.error('Error removing completed item:', error);
      showToastMessage('Failed to remove completed item.', 'danger');
    }
  };

  let rows = completedItems.map((item, index) => {
    if (!item) return null;

    return (
      <tr key={`${item.media.id}-${index}`}>
        <td className="d-flex align-items-center gap-3">
          {item.media.posterUri ? (
            <img
              className="mx-2 responsive-img rounded"
              src={item.media.posterUri}
              height={68}
            />
          ) : (
            <div className="default-image-container mx-2">
              <DefaultImage />
            </div>
          )}
          <Link to={`/media/${item.media.id}`}>{item.media.title}</Link>
        </td>
        <td className="align-middle">
          <MediaTypeBadge type={item.media.type} />
        </td>
        <td className="align-middle">{formatDate(item.completedDate)}</td>
        <td className="align-middle">
          {rewatchabilityMap[item.rewatchability] || 'Unknown'}
        </td>
        <td className="align-middle">{item.score?.value}</td>
        <td className="align-middle">{item.score?.reviewText || item.note}</td>
        <td className="align-middle">
          <OverlayTrigger overlay={<Tooltip>Remove completed item</Tooltip>}>
            <span
              className="cursor-pointer"
              onClick={() => handleRemoveCompletedItem(item.completedId)}
            >
              <i className="bi bi-bookmark-x text-danger" />
            </span>
          </OverlayTrigger>
        </td>
      </tr>
    );
  });

  if (rows.length === 0) {
    rows = (
      <tr>
        <td colSpan={7} height={100} className="text-center align-middle">
          It looks like you haven&apos;t completed anything yet. Use the search
          bar to find media you have completed and mark them as so!
        </td>
      </tr>
    );
  }

  return (
    <div className="table-responsive">
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
      {hasMoreItems && completedItems.length > 0 && (
        <div className="text-left">
          <Button onClick={loadMoreCompleted} variant="link">
            Load More
          </Button>
        </div>
      )}
    </div>
  );
}
