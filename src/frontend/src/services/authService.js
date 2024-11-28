import { API_BASE_URL } from '@/utils/constants';
import { jwtDecode } from 'jwt-decode';

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
      throw new Error('Network response was not ok');
    }

    const token = await response.text();
    const decodedToken = jwtDecode(token);

    const userData = {
      username: decodedToken.sub,
      email: decodedToken.email,
      id: decodedToken.user_id,
      role: decodedToken.role,
      token,
    };

    sessionStorage.setItem('user', JSON.stringify(userData));

    return userData;
  } catch (error) {
    console.error('Error logging in:', error);
    throw error;
  }
};
