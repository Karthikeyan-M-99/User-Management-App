import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { usersApi } from '../services/api/users/users';
import { UserInterface } from '../types/user';

export const fetchUsers = createAsyncThunk(
  'users/fetchUsers',
  async (page: number, { dispatch }) => {
    try {
      dispatch(setIsFetching(true));
      const { data } = await usersApi.getUsers(page);
      return data;
    } catch (error: any) {
      throw new Error(error.response?.data?.message || 'Failed to fetch users');
    } finally {
      dispatch(setIsFetching(false));
    }
  }
);

export const fetchUserById = createAsyncThunk(
  'users/fetchUserById',
  async (id: number, { dispatch }) => {
    try {
      dispatch(setIsFetching(true));
      const { data: response } = await usersApi.getUserById(id);
      return response.data;
    } catch (error: any) {
      throw new Error(error.response?.data?.message || 'Failed to fetch user');
    } finally {
      dispatch(setIsFetching(false));
    }
  }
);

export const createUser = createAsyncThunk(
  'users/createUser',
  async (userData: Partial<UserInterface>, { dispatch }) => {
    try {
      dispatch(setIsSubmitting(true));
      const response = await usersApi.createUser(userData);
      return response.data;
    } catch (error: any) {
      throw new Error(error.response?.data?.message || 'Failed to create user');
    } finally {
      dispatch(setIsSubmitting(false));
    }
  }
);

export const updateUser = createAsyncThunk(
  'users/updateUser',
  async ({ id, userData }: { id: number; userData: Partial<UserInterface> }, { dispatch }) => {
    try {
      dispatch(setIsSubmitting(true));
      const response = await usersApi.updateUser(id, userData);
      return response.data;
    } catch (error: any) {
      throw new Error(error.response?.data?.message || 'Failed to update user');
    } finally {
      dispatch(setIsSubmitting(false));
    }
  }
);

export const deleteUser = createAsyncThunk(
  'users/deleteUser',
  async (id: number, { dispatch }) => {
    try {
      dispatch(setIsSubmitting(true));
      await usersApi.deleteUser(id);
      return id;
    } catch (error: any) {
      throw new Error(error.response?.data?.message || 'Failed to delete user');
    } finally {
      dispatch(setIsSubmitting(false));
    }
  }
);

const initialState = {
  users: [],
  user: {},
  isFetching: false,
  isSubmitting: false,
  currentPage: 1,
  totalPages: 1,
  pageSize: 4,
};

const userSlice = createSlice({
  name: 'users',
  initialState,
  reducers: {
    setIsFetching: (state, action) => {
      state.isFetching = action.payload;
    },
    setIsSubmitting: (state, action) => {
      state.isSubmitting = action.payload;
    },
  },
  extraReducers: {
    [fetchUsers.fulfilled.toString()]: (state, action) => {
      state.users = action.payload.data;
      state.totalPages = action.payload.total_pages;
      state.currentPage = action.payload.page;
      state.pageSize = action.payload.per_page;
    },
    [fetchUserById.fulfilled.toString()]: (state, action) => {
      state.user = action.payload;
    },
  },
});

export const { setIsFetching, setIsSubmitting } = userSlice.actions;
export const userReducer = userSlice.reducer;

export const selectUsers = (state) => state.users.users;
export const selectIsFetching = (state) => state.users.isFetching;
export const selectIsSubmitting = (state) => state.users.isSubmitting;
export const selectPagination = (state) => ({
  currentPage: state.users.currentPage,
  totalPages: state.users.totalPages
});
export const selectUser = (state) => state.users.user;