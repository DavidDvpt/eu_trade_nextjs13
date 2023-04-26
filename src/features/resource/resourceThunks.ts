import { createAsyncThunk } from '@reduxjs/toolkit';

export const fetchResourcesThunk = createAsyncThunk(
  'resource/fetchResourcesThunk',
  async (params: void) => {
    return null;
  }
);
