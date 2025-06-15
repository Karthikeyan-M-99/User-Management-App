import httpClient from '../../../httpClient';
import { UserInterface, ReqResListResponse } from '../../../types/user';

export const usersApi = {
  getUsers: (page: number = 1) => 
    httpClient.get<ReqResListResponse<UserInterface>>(`/api/users?page=${page}&per_page=200`),

  getUserById: (id: number) => 
    httpClient.get<{ data: UserInterface }>(`/api/users/${id}`),

  createUser: (userData: Partial<UserInterface>) => 
    httpClient.post<UserInterface>(`/api/users`, userData),

  updateUser: (id: number, userData: Partial<UserInterface>) => 
    httpClient.put<UserInterface>(`/api/users/${id}`, userData),

  deleteUser: (id: number) => 
    httpClient.delete(`/api/users/${id}`)
};