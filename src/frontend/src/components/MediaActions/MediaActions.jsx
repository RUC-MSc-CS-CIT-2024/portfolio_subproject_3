import { ButtonGroup } from 'react-bootstrap';
import { createBookmark, createScore, createMarkAsCompleted } from '@/services';
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

  const handleRate = async (formData) => {
    try {
      await createScore({
        mediaId: id,
        score: formData.rating,
        reviewText: formData.review,
      });
      showToastMessage('Rating submitted', 'success');
    } catch (error) {
      console.error('Error submitting rating', error);
      showToastMessage('Error submitting rating', 'danger');
    }
  };

  const handleComplete = async (formData) => {
    try {
      await createMarkAsCompleted({
        mediaId: id,
        rewatchability: formData.rewatchability,
        note: formData.completedNote,
      });
      showToastMessage('Marked as completed', 'success');
    } catch (error) {
      console.error('Error marking as completed', error);
      showToastMessage('Error marking as completed', 'danger');
    }
  };

  return (
    <ButtonGroup className="d-flex flex-column">
      <ActionDropdown
        title="Rate the title"
        formFields={[
          { name: 'rating', type: 'number', placeholder: 'Enter rating' },
          { name: 'review', type: 'text', placeholder: 'Enter review text' },
        ]}
        handleSubmit={handleRate}
        buttonText="Submit Rating"
      />

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
            type: 'number',
            placeholder: 'Enter rewatchability',
          },
          { name: 'completedNote', type: 'text', placeholder: 'Enter note' },
        ]}
        handleSubmit={handleComplete}
        buttonText="Submit as Completed"
      />
    </ButtonGroup>
  );
}
