import { getUserFromSession } from '@/utils/getUserFromSession';
import { ApiClient } from '@/utils/apiClient';
import { getTMDBImage, ImageSize } from './tmdbService';

const api = new ApiClient();

export const updateUserById = async (data) => {
  const user = getUserFromSession();
  if (!user) {
    throw new Error('No user found in session');
  }

  const path = `users/${user.id}`;
  try {
    const response = await api.Patch(path, data);

    if (!response.ok) {
      throw new Error('Network response was not ok');
    }

    sessionStorage.setItem('user', JSON.stringify(response.value));
    return response.value;
  } catch (error) {
    console.error('Error updating user:', error);
    throw error;
  }
};

export const deleteUserById = async () => {
  const user = getUserFromSession();
  if (!user) {
    throw new Error('No user found in session');
  }
  const path = `users/${user.id}`;
  try {
    const response = await api.Delete(path);

    if (!response.ok) {
      throw new Error('Network response was not ok');
    }

    sessionStorage.removeItem('user');
  } catch (error) {
    console.error('Error deleting user:', error);
    throw error;
  }
};

export const createBookmark = async (bookmarkData) => {
  const user = getUserFromSession();
  if (!user) {
    throw new Error('No user found in session');
  }

  const path = `users/${user.id}/bookmarks`;
  try {
    const response = await api.Post(path, bookmarkData);

    if (!response.ok) {
      throw new Error('Network response was not ok');
    }

    return await response.value;
  } catch (error) {
    console.error('Error adding bookmark:', error);
    throw error;
  }
};

export const createScore = async ({ mediaId, score, reviewText }) => {
  const user = getUserFromSession();
  if (!user) {
    throw new Error('No user found in session');
  }

  const path = `users/${user.id}/scores`;
  try {
    const response = await api.Post(path, { mediaId, score, reviewText });

    if (!response.ok) {
      throw new Error('Network response was not ok');
    }

    return response.value;
  } catch (error) {
    console.error('Error creating score:', error);
    throw error;
  }
};

export const createMarkAsCompleted = async ({
  mediaId,
  rewatchability,
  note,
}) => {
  const user = getUserFromSession();
  if (!user) {
    throw new Error('No user found in session');
  }

  const path = `users/${user.id}/completed`;

  const completedData = {
    mediaId,
    rewatchability,
    note,
    completedDate: new Date().toISOString(),
  };

  try {
    const response = await api.Post(path, completedData);

    if (!response.ok) {
      throw new Error('Network response was not ok');
    }

    return response.value;
  } catch (error) {
    console.error('Error marking as completed:', error);
    throw error;
  }
};

export const createFollow = async (personId) => {
  const user = getUserFromSession();
  if (!user) {
    throw new Error('No user found in session');
  }

  const path = `users/${user.id}/following`;
  const followData = {
    userId: user.id,
    personId: personId,
  };

  try {
    const response = await api.Post(path, followData);

    if (!response.ok) {
      const errorMessage = `Failed to follow person with ID ${personId}.`;
      throw new Error(errorMessage);
    }

    return response.value;
  } catch (error) {
    console.error('Error following user:', error);
    throw error;
  }
};

export const getCurrentUserFollowing = async (page, count) => {
  const user = getUserFromSession();
  const apiClient = new ApiClient();

  if (!user) {
    throw new Error('No user found in session');
  }
  let path = `users/${user.id}/following`;

  let queryParams = [];
  if (page) queryParams.push({ key: 'page', value: page });
  if (count) queryParams.push({ key: 'count', value: count });

  const response = await apiClient.Get(path, queryParams);

  if (!response.ok) {
    throw new Error('Network response was not ok.');
  }

  for (const followEntry of response.value.items) {
    followEntry.pictureUri = await getTMDBImage(
      followEntry.person.imdbId,
      ImageSize.VerySmall,
    );
  }

  return response.value;
};

export const getCurrentUserBookmarks = async (page, count) => {
  const user = getUserFromSession();
  const apiClient = new ApiClient();

  if (!user) {
    throw new Error('No user found in session');
  }
  let path = `users/${user.id}/bookmarks`;

  let queryParams = [];
  if (page) queryParams.push({ key: 'page', value: page });
  if (count) queryParams.push({ key: 'count', value: count });

  const response = await apiClient.Get(path, queryParams);

  if (!response.ok) {
    throw new Error('Network response was not ok.');
  }

  return response.value;
};

export const getCurrentUserCompleted = async (page, count) => {
  const user = getUserFromSession();
  const apiClient = new ApiClient();

  if (!user) {
    throw new Error('No user found in session');
  }
  let path = `users/${user.id}/completed`;

  let queryParams = [];
  if (page) queryParams.push({ key: 'page', value: page });
  if (count) queryParams.push({ key: 'count', value: count });

  const response = await apiClient.Get(path, queryParams);

  if (!response.ok) {
    throw new Error('Network response was not ok.');
  }

  return response.value;
};

export const unfollowPerson = async (followingId) => {
  const user = getUserFromSession();
  const apiClient = new ApiClient();

  if (!user) {
    throw new Error('No user found in session');
  }

  const path = `users/${user.id}/following/${followingId}`;
  const response = await apiClient.Delete(path);

  if (!response.ok) {
    throw new Error('Network response was not ok.');
  }

  return response.value;
};

export const removeBookmark = async (bookmarkId) => {
  const user = getUserFromSession();
  const apiClient = new ApiClient();

  if (!user) {
    throw new Error('No user found in session');
  }

  const path = `users/${user.id}/bookmarks/${bookmarkId}`;
  const response = await apiClient.Delete(path);

  if (!response.ok) {
    throw new Error('Network response was not ok.');
  }

  return response.value;
};

export const markBookmarkAsCompleted = async (
  bookmarkId,
  completedDate,
  rewatchability,
  note,
) => {
  const user = getUserFromSession();
  const apiClient = new ApiClient();

  if (!user) {
    throw new Error('No user found in session');
  }

  const path = `users/${user.id}/bookmarks/${bookmarkId}/move`;
  const data = {
    completedDate,
    rewatchability,
    note,
  };

  const response = await apiClient.Post(path, data);

  if (!response.ok) {
    throw new Error('Network response was not ok.');
  }

  return response.value;
};

export const removeCompletedItem = async (completedId) => {
  const user = getUserFromSession();
  const apiClient = new ApiClient();

  if (!user) {
    throw new Error('No user found in session');
  }

  const path = `users/${user.id}/completed/${completedId}`;
  const response = await apiClient.Delete(path);

  if (!response.ok) {
    throw new Error('Network response was not ok.');
  }

  return response.value;
};
