import 'bootstrap-icons/font/bootstrap-icons.css';
import { ButtonGroup } from 'react-bootstrap';
import { createBookmark, createMarkAsCompleted, createScore } from '@/services';
import { useToast } from '@/contexts';
import { ActionDropdown } from '@/components';
import { rewatchabilityMap } from '@/utils';

export default function MediaActions({ id }) {
  const { showToastMessage } = useToast();

  const handleAddToWatchlist = async (formData) => {
    try {
      await createBookmark({ mediaId: id, note: formData.watchlistNote });
      showToastMessage('Added to watchlist', 'success');
    } catch (error) {
      console.error('Error adding to watchlist', error);
      showToastMessage('Error adding to watchlist', 'danger');
    }
  };

  const handleComplete = async (formData) => {
    try {
      await createMarkAsCompleted({
        mediaId: id,
        rewatchability: formData.rewatchability,
        note: formData.completedNote,
      });

      if (formData.rating || formData.review) {
        await createScore({
          mediaId: id,
          score: formData.rating,
          reviewText: formData.review,
        });
      }

      showToastMessage('Marked as completed and rating submitted', 'success');
    } catch (error) {
      console.error('Error marking as completed and submitting rating', error);
      showToastMessage(
        'Error marking as completed and submitting rating',
        'danger',
      );
    }
  };

  const rewatchabilityOptions = [
    { value: '0', label: 'Select rewatchability' },
    ...Object.entries(rewatchabilityMap).map(([value, label]) => ({
      value,
      label,
    })),
  ];

  return (
    <ButtonGroup className="d-flex flex-column">
      <ActionDropdown
        title="Add to Watchlist"
        formFields={[
          { name: 'watchlistNote', type: 'text', placeholder: 'Enter a note' },
        ]}
        handleSubmit={handleAddToWatchlist}
        buttonText="Submit to Watchlist"
      />

      <ActionDropdown
        title="Mark as Completed"
        formFields={[
          {
            name: 'rewatchability',
            type: 'select',
            options: rewatchabilityOptions,
          },
          { name: 'completedNote', type: 'text', placeholder: 'Enter note' },
          { name: 'rating', type: 'rating' },
          { name: 'review', type: 'text', placeholder: 'Enter review text' },
        ]}
        handleSubmit={handleComplete}
        buttonText="Submit as Completed"
      />
    </ButtonGroup>
  );
}
