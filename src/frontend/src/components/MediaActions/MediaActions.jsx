import { ButtonGroup } from 'react-bootstrap';
import { createBookmark, createMarkAsCompleted, createScore } from '@/services';
import { useToast } from '@/contexts';
import { ActionDropdown } from '@/components';
import 'bootstrap-icons/font/bootstrap-icons.css';

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
            options: [
              { value: '0', label: 'Select rewatchability' },
              { value: '1', label: 'Very Low' },
              { value: '2', label: 'Low' },
              { value: '3', label: 'Medium' },
              { value: '4', label: 'High' },
              { value: '5', label: 'Very High' },
            ],
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
