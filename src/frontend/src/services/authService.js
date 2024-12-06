import { ApiClient } from '@/utils/apiClient';

export const authenticate = async (credentials) => {
  try {
    const { username, password } = credentials;
    const authHeader = 'Basic ' + btoa(`${username}:${password}`);
    const path = `${import.meta.env.VITE_API_BASE_URL}auth/generate-token`;
    const response = await fetch(path, {
      method: 'POST',
      headers: {
        Authorization: authHeader,
      },
    });

    if (!response.ok) {
      throw new Error(
        `Failed to login (STATUS: ${response.statusCode}): ${
          response.value?.message || 'Unknown error'
        }`,
      );
    }

    return response.json();
  } catch (error) {
    console.error('Error logging in:', error);
    throw error;
  }
};

export const refreshToken = async (refreshToken) => {
  const client = new ApiClient();
  try {
    const path = `auth/refresh-token?refreshToken=${refreshToken}`;
    const response = await client.Post(path, undefined);

    if (!response.ok) {
      throw new Error(
        `Failed to refresh token (STATUS: ${response.statusCode}): ${
          response.value?.message || 'Unknown error'
        }`,
      );
    }

    return response.value;
  } catch (error) {
    console.error('Error refreshing token:', error);
    throw error;
  }
};

export const revokeToken = async (refreshToken) => {
  const client = new ApiClient();
  try {
    const path = `auth/revoke-token?refreshToken=${refreshToken}`;
    const response = await client.Post(path, undefined);

    if (!response.ok) {
      throw new Error(
        `Failed to revoke token (STATUS: ${response.statusCode}): ${
          response.value?.message || 'Unknown error'
        }`,
      );
    }
  } catch (error) {
    console.error('Error revoking token:', error);
    throw error;
  }
};
