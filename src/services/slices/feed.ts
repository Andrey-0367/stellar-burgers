import { RequestStatus, TOrder } from '../../utils/types';
import { createSlice } from '@reduxjs/toolkit';
import { FEED_SLICE_NAME } from './slicesName';
import { fetchGetFeeds } from '../thunk/feed';

type TFeedState = {
  orders: TOrder[];
  total: number;
  totalToday: number;
  requestStatus: RequestStatus;
};

export const initialState: TFeedState = {
  orders: [],
  total: 0,
  totalToday: 0,
  requestStatus: RequestStatus.Idle
};

export const feedSlice = createSlice({
  name: FEED_SLICE_NAME,
  initialState,
  reducers: {},
  selectors: {
    getFeedState: (state) => state
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchGetFeeds.pending, (state) => {
        state.requestStatus = RequestStatus.Loading;
      })
      .addCase(fetchGetFeeds.fulfilled, (state, action) => {
        state.requestStatus = RequestStatus.Success;
        state.orders = action.payload.orders;
        state.total = action.payload.total;
        state.totalToday = action.payload.totalToday;
      })
      .addCase(fetchGetFeeds.rejected, (state, action) => {
        state.requestStatus = RequestStatus.Failed;
      });
  }
});

export const feedActions = {
  ...feedSlice.actions,
  fetchGetFeeds
};
export const feedSelectors = feedSlice.selectors;
export default feedSlice.reducer;
export const reducer = feedSlice.reducer;
