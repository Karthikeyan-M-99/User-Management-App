import axios from 'axios';

const isServer = typeof window === 'undefined';

const httpClient = axios.create({
  baseURL: 'https://users-management-api.vercel.app',
  headers: {
    'Content-Type': 'application/json',
    'Accept': 'application/json',
  }
});

httpClient.interceptors.request.use(
  (config) => {
    if (!isServer) {
      const token = localStorage.getItem('token');
      if (token && token !== 'undefined') {
        config.headers.Authorization = `Bearer ${token}`;
      }
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default httpClient;