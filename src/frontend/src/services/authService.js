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
      const errorText = await response.text();
      console.error('Response error:', errorText);
      throw new Error('Login failed: ' + errorText);
    }

    const token = await response.text();
    return token;
  } catch (error) {
    console.error('An unexpected error occurred:', error);
    throw error;
  }
};
