import { configureStore } from '@reduxjs/toolkit';
import roomReducer from '../features/room/roomSlice'
import bookingReducer from '../features/booking/bookingSlice'
const store = configureStore({
  reducer: {
    room: roomReducer,
    booking: bookingReducer
  },
});

export default store;
