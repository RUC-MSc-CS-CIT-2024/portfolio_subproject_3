export const login = async (credentials) => {
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

    return response.text();
  } catch (error) {
    console.error('Error logging in:', error);
    throw error;
  }
};
