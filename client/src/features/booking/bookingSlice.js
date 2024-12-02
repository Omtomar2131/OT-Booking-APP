import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

const initialState = {
  booking: null,
  isLoading: false,
  isSuccess: false,
  isError: false,
  message: "",
};

export const createBooking = createAsyncThunk(
  "booking/create",
  async (bookingData, thunkApi) => {
    try {
      const res = await fetch(`/api/bookings`, {
        headers: {
          "Content-Type": "application/json",
        },
        method: "POST",
        body: JSON.stringify(bookingData),
      });
      const data = await res.json();
      if (!res.ok) {
        // Assuming the error response contains a message or description
        return thunkApi.rejectWithValue(data.message || "Failed to create booking");
      }
      return data;
    } catch (error) {
      // In case of a network or other unexpected error
      return thunkApi.rejectWithValue(error.message || "An unexpected error occurred");
    }
  }
);

export const bookingSlice = createSlice({
  name: "booking",
  initialState,
  reducers: {
    reset: (state) => {
      state.isLoading = false;
      state.isSuccess = false;
      state.isError = false;
      state.message = "";
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(createBooking.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(createBooking.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.booking = action.payload;
      })
      .addCase(createBooking.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload || "An error occurred"; // Default message if no error payload is provided
      });
  },
});

export const { reset } = bookingSlice.actions;

export default bookingSlice.reducer;
