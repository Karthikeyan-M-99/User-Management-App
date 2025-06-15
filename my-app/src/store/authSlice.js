import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { authApi } from '../services/api/auth/auth';

export const login = createAsyncThunk(
  'auth/login',
  async (credentials) => {
    try {
      const {token} = await authApi.login(credentials);
      if(token) {
        loginSuccess(token);
      }
      return token;
    } catch (error) {
      throw error.response?.data?.error || 'Login failed';
    }
  }
);

const initialState = {
  token: typeof window !== 'undefined' ? localStorage.getItem('token') : null,
  loginEmail: null,
  fetch: {
    loading: false,
    error: null,
  },
  submit: {
    loading: false,
    error: null,
    success: false,
  }
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setLoginEmail: (state, action) => {
      state.loginEmail = action.payload;
    },
    resetAuthState: (state) => {
      state.submit = {
        loading: false,
        error: null,
        success: false,
      };
    },
    loginSuccess(state, action) {
      state.token = action.payload;
      if (typeof window !== 'undefined') {
        localStorage.setItem('token', action.payload);
      }
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(login.pending, (state) => {
        state.submit.loading = true;
        state.submit.error = null;
        state.submit.success = false;
      })
      .addCase(login.fulfilled, (state, action) => {
        state.token = action.payload;
        state.submit.loading = false;
        state.submit.success = true;
        if (typeof window !== 'undefined') {
          localStorage.setItem('token', action.payload);
        }
      })
      .addCase(login.rejected, (state, action) => {
        state.submit.loading = false;
        state.submit.error = action.error.message;
      });
  },
});

export const { loginSuccess, resetAuthState, setLoginEmail } = authSlice.actions;
export const authReducer = authSlice.reducer;

export const selectAuthToken = (state) => state.auth.token;
export const selectAuthSubmitState = (state) => state.auth.submit;
export const selectLoginEmail = (state) => state.auth.loginEmail
