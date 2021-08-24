import { configureStore } from '@reduxjs/toolkit';
import counterReducer from '../features/counter/counterSlice';
import barangReducer from '../features/barang/barangSlice';

export const store = configureStore({
  reducer: {
    counter: counterReducer,
    barang: barangReducer,
  },
});
