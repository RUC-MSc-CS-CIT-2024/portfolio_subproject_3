import { API_BASE_URL } from '@/utils/constants';

export const login = async (credentials) => {
  try {
    const { username, password } = credentials;
    const authHeader = 'Basic ' + btoa(`${username}:${password}`);

    const response = await fetch(API_BASE_URL + '/api/auth/generate-token', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: authHeader,
      },
    });

    if (!response.ok) {
      throw new Error(
        `Failed to login (STATUS: ${response.status}): ${response.statusText}`,
      );
    }

    return await response.text();
  } catch (error) {
    console.error('Error logging in:', error);
    throw error;
  }
};
