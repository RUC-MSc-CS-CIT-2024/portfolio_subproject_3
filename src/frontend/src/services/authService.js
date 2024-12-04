import { ApiClient } from '../utils/apiClient';

export const login = async (credentials) => {
  try {
    const { username, password } = credentials;
    const authHeader = 'Basic ' + btoa(`${username}:${password}`);
    const api = new ApiClient(undefined, undefined, {
      headers: {
        Authorization: authHeader,
      },
    });
    const path = '/api/auth/generate-token';
    const response = await api.Post(path, {});
    if (!response.ok) {
      throw new Error(
        `Failed to login (STATUS: ${response.statusCode}): ${
          response.value?.message || 'Unknown error'
        }`,
      );
    }

    return response.value;
  } catch (error) {
    console.error('Error logging in:', error);
    throw error;
  }
};
