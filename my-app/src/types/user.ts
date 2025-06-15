export interface UserInterface {
  id: number;
  email: string;
  first_name: string;
  last_name: string;
  avatar: string;
}

export interface ReqResListResponse<T> {
  page: number;
  perPage: number;
  total: number;
  totalPages: number;
  data: T[];
  support?: {
    url: string;
    text: string;
  };
}

export interface LoginRequest {
  email: string;
  password: string;
}

export interface LoginResponse {
  token: string;
}
