import 'bootstrap-icons/font/bootstrap-icons.css';
import { useState, useEffect } from 'react';
import { ButtonGroup } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { createBookmark, createMarkAsCompleted, createScore } from '@/services';
import { useToast, useUserData } from '@/contexts';
import { ActionDropdown } from '@/components';
import { rewatchabilityMap } from '@/utils';

export default function MediaActions({ id }) {
  const { showToastMessage } = useToast();
  const { bookmarks, completed, refreshUserData } = useUserData();

  const [mediaDetails, setMediaDetails] = useState({
    isBookmarked: false,
    bookmarkedTitle: '',
    isCompleted: false,
    completedTitle: '',
  });

  useEffect(() => {
    const updateMediaDetails = () => {
      const bookmarked = bookmarks.find(
        (bookmark) => bookmark.mediaId === parseInt(id),
      );
      const completedItem = completed.find(
        (item) => item.mediaId === parseInt(id),
      );

      setMediaDetails({
        isBookmarked: !!bookmarked,
        bookmarkedTitle: bookmarked ? bookmarked.media.title : '',
        isCompleted: !!completedItem,
        completedTitle: completedItem ? completedItem.media.title : '',
      });
    };

    updateMediaDetails();
  }, [bookmarks, completed, id]);

  const handleAddToWatchlist = async (formData) => {
    try {
      await createBookmark({ mediaId: id, note: formData.watchlistNote });
      showToastMessage('Added to watchlist', 'success');
      refreshUserData();
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
      refreshUserData();
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
      {mediaDetails.isBookmarked ? (
        <div className="alert alert-info">
          You have already bookmarked &quot;{mediaDetails.bookmarkedTitle}
          &quot;. See all bookmarks:
          <Link className="m-lg-1" to="/profile/lists#bookmarked">
            here
          </Link>
        </div>
      ) : (
        <ActionDropdown
          title="Add to Watchlist"
          formFields={[
            {
              name: 'watchlistNote',
              type: 'text',
              placeholder: 'Enter a note',
            },
          ]}
          handleSubmit={handleAddToWatchlist}
          buttonText="Submit to Watchlist"
        />
      )}

      {mediaDetails.isCompleted ? (
        <div className="alert alert-info">
          You have already completed &quot;{mediaDetails.completedTitle}&quot;.
          See all completed titles:
          <Link className="m-lg-1" to="/profile/lists#completed">
            here
          </Link>
        </div>
      ) : (
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
      )}
    </ButtonGroup>
  );
}
