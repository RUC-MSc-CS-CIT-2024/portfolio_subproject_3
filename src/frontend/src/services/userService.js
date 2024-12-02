import { API_BASE_URL } from '@/utils/constants';
import { getUserFromSession } from '@/utils/getUserFromSession';

export const updateUserById = async (data) => {
  const user = getUserFromSession();
  if (!user) {
    throw new Error('No user found in session');
  }

  try {
    const response = await fetch(`${API_BASE_URL}/api/users/${user.id}`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${user.token}`,
      },
      body: JSON.stringify(data),
    });

    if (!response.ok) {
      throw new Error('Network response was not ok');
    }

    const responseData = await response.json();

    sessionStorage.setItem('user', JSON.stringify(responseData));

    return responseData;
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

  try {
    const response = await fetch(`${API_BASE_URL}/api/users/${user.id}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${user.token}`,
      },
    });

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

  try {
    const response = await fetch(
      `${API_BASE_URL}/api/users/${user.id}/bookmarks`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${user.token}`,
        },
        body: JSON.stringify(bookmarkData),
      },
    );

    if (!response.ok) {
      throw new Error('Network response was not ok');
    }

    return await response.json();
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

  try {
    const response = await fetch(
      `${API_BASE_URL}/api/users/${user.id}/scores`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${user.token}`,
        },
        body: JSON.stringify({ mediaId, score, reviewText }),
      },
    );

    if (!response.ok) {
      throw new Error('Network response was not ok');
    }

    const responseText = await response.text();
    if (!responseText) {
      return null;
    }

    return JSON.parse(responseText);
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

  try {
    const completedData = {
      mediaId,
      rewatchability,
      note,
      completedDate: new Date().toISOString(),
    };

    const response = await fetch(
      `${API_BASE_URL}/api/users/${user.id}/completed`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${user.token}`,
        },
        body: JSON.stringify(completedData),
      },
    );

    if (!response.ok) {
      throw new Error('Network response was not ok');
    }

    return await response.json();
  } catch (error) {
    console.error('Error marking as completed:', error);
    throw error;
  }
};
