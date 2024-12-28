import { createAsyncThunk } from '@reduxjs/toolkit';
import { getFeedsApi } from '../../utils/burger-api';
import { FEED_SLICE_NAME } from '../slices/slicesName';

export const fetchGetFeeds = createAsyncThunk(
  `${FEED_SLICE_NAME}/fetchGetFeeds`,
  async () => getFeedsApi()
);
