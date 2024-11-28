import { API_BASE_URL } from '@/utils/constants';

export const updateUserById = async (data, token) => {
  try {
    const response = await fetch(API_BASE_URL + '/api/users/1', {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(data),
    });

    if (!response.ok) {
      throw new Error('Network response was not ok');
    }

    const responseData = await response.json();
    return responseData;
  } catch (error) {
    console.error('Error updating user:', error);
    throw error;
  }
};
/* 
export const createUserBookmark = async (userId, data) => {};

export const fetchUserBookmarks = async (userId) => {};

export const moveUserBookmark = async (userId, id, data) => {};

export const fetchUserBookmarkById = async (userId, id) => {};

export const updateUserBookmarkById = async (userId, id, data) => {};

export const deleteUserBookmarkById = async (userId, id) => {};

export const fetchUserFollowing = async (userId) => {};

export const createUserFollowing = async (userId, data) => {};

export const deleteUserFollowingById = async (userId, followingId) => {};

export const fetchUserSearchHistory = async (userId) => {};

export const deleteUserSearchHistory = async (userId) => {};

export const fetchUserById = async (userId) => {};

export const deleteUserById = async (userId) => {};

export const createUser = async (data) => {};

export const fetchUserScores = async (userId) => {};

export const createUserScore = async (userId, data) => {};

export const createUserCompleted = async (userId, data) => {};

export const fetchUserCompleted = async (userId) => {};

export const fetchUserCompletedById = async (userId, id) => {};

export const updateUserCompletedById = async (userId, id, data) => {};

export const deleteUserCompletedById = async (userId, id) => {};
 */
