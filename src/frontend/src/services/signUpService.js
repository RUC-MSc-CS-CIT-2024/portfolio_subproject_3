import { ApiClient } from '../utils/apiClient';
import { login } from './authService';

const api = new ApiClient();

export const signUpUser = async (data) => {
  try {
    const response = await api.Post('api/users', data);
    if (!response.ok) {
      throw new Error(response.value?.message || 'Failed to sign up');
    }
    const loginData = {
      username: data.username,
      password: data.password,
    };
    const token = await login(loginData);
    return {
      message: 'Sign-up and login successful',
      user: response.value,
      token,
    };
  } catch (error) {
    console.error('Error during sign-up:', error);
    throw error;
  }
};

// TODO: Currently if you wanna use signup Service remove the login part or you will get the following error "Authorization header is invalid"
