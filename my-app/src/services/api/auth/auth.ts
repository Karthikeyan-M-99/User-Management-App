import httpClient from '../../../httpClient';
import { LoginRequest, LoginResponse } from './types';

export const authApi = {
  login: async (credentials: LoginRequest): Promise<LoginResponse> => {
    try {
      const response = await httpClient.post<LoginResponse>('/api/login', credentials);
      console.log('Login response:', response); 
      return response.data;
    } catch (error: any) {
      console.error('Login error:', error); 
      throw new Error(
        error.response?.data?.message || 
        error.message || 
        'Login failed'
      );
    }
  }
};