import { configureStore } from '@reduxjs/toolkit';
import combinedReducers from './rootReducer';
// ...

export const store = configureStore({
  reducer: combinedReducers,
});
