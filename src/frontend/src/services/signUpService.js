import { ApiClient } from '@/utils/apiClient';

export const signUpUser = async (data) => {
  const api = new ApiClient();
  try {
    const response = await api.Post('users/register', data);
    if (!response.ok) {
      throw new Error(response.value?.message || 'Failed to sign up');
    }
    return response.value.refreshToken;
  } catch (error) {
    console.error('Error during sign-up:', error);
    throw error;
  }
};

// TODO: Currently if you wanna use signup Service remove the login part or you will get the following error "Authorization header is invalid"
