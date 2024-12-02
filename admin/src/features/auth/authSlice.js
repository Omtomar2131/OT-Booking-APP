import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

const user = JSON.parse(localStorage.getItem('user'));

// Helper function for API calls
const fetchWithDefaultHeaders = async (url, options = {}) => {
  const defaultHeaders = {
    'Content-Type': 'application/json',
  };
  return await fetch(url, {
    ...options,
    headers: { ...defaultHeaders, ...options.headers },
  });
};

// Thunks
export const registerUser = createAsyncThunk(
  'auth/register',
  async (userData, thunkAPI) => {
    try {
      const res = await fetchWithDefaultHeaders(`/api/users/`, {
        method: 'POST',
        body: JSON.stringify(userData),
      });

      if (!res.ok) {
        const error = await res.json().catch(() => ({}));
        return thunkAPI.rejectWithValue(
          error.message || 'Registration failed'
        );
      }

      const data = await res.json();
      localStorage.setItem('user', JSON.stringify(data));
      return data;
    } catch (err) {
      return thunkAPI.rejectWithValue(err.message || 'Something went wrong');
    }
  }
);

export const loginUser = createAsyncThunk(
  'auth/login',
  async (userData, thunkAPI) => {
    try {
      const res = await fetchWithDefaultHeaders('/api/users/login', {
        method: 'POST',
        body: JSON.stringify(userData),
      });

      if (!res.ok) {
        const error = await res.json().catch(() => ({}));
        return thunkAPI.rejectWithValue(error.message || 'Login failed');
      }

      const data = await res.json();
      localStorage.setItem('user', JSON.stringify(data));
      return data;
    } catch (err) {
      return thunkAPI.rejectWithValue(err.message || 'Something went wrong');
    }
  }
);

export const logoutUser = createAsyncThunk(
  'auth/logout',
  async (_, thunkAPI) => {
    try {
      const res = await fetchWithDefaultHeaders('/api/users/logout');
      if (!res.ok) {
        const error = await res.json().catch(() => ({}));
        return thunkAPI.rejectWithValue(error.message || 'Logout failed');
      }

      localStorage.removeItem('user');
      return true; // Return a simple success flag
    } catch (err) {
      localStorage.removeItem('user'); // Ensure local user is removed
      return thunkAPI.rejectWithValue(err.message || 'Something went wrong');
    }
  }
);

// Initial State
const initialState = {
  user: user || null,
  isLoading: false,
  isSuccess: false,
  isError: false,
  message: '',
};

// Slice
const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    reset: (state) => ({
      ...initialState, // Avoid state mutation
      user: null,
    }),
  },
  extraReducers: (builder) => {
    builder
      .addCase(registerUser.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(registerUser.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.user = action.payload;
      })
      .addCase(registerUser.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      })
      .addCase(loginUser.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.user = action.payload;
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      })
      .addCase(logoutUser.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(logoutUser.fulfilled, (state) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.user = null;
      })
      .addCase(logoutUser.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      });
  },
});

// Export actions and reducer
export const { reset } = authSlice.actions;

export default authSlice.reducer;
