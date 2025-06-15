export interface apiResponse<T> {
  data: T;
  status: number;
  message?: string;
}

export interface paginatedResponse<T> {
  data: T[];
  total: number;
  page: number;
  limit: number;
}

export interface apiError {
  message: string;
  code: string;
  status: number;
}