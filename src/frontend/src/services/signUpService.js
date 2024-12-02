import { API_BASE_URL } from '@/utils/constants';

export const signUpUser = async (data) => {
  try {
    const response = await fetch(`${API_BASE_URL}/api/users`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    });

    if (!response.ok) {
      const errorResponse = await response.json();
      throw new Error(errorResponse.message || 'Failed to sign up');
    }

    const responseData = await response.json();
    return responseData; // Basically, here I was thinking if we can return the token, then it could be used to log in the newly created user. This is not a secure way though and we should probably find another solution.
  } catch (error) {
    console.error('Error during sign-up:', error);
    throw error;
  }
};
