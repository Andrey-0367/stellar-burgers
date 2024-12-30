import { expect, describe } from '@jest/globals';
import { data, mockedFeed } from '../../data';
import { feedSlice, initialState } from './feed';
import { fetchGetFeeds } from '../thunk/feed';

describe('feed reducer', () => {
  it('initializes correctly', () => {
    const state = feedSlice.reducer(undefined, {
      type: 'UNKNOWN_ACTION'
    });
    expect(state).toEqual(initialState);
  });

  it('fetchGetFeeds fulfilled', () => {
    const action = {
      type: fetchGetFeeds.fulfilled.type,
      payload: mockedFeed
    };
    const state = feedSlice.reducer(initialState, action);
    expect(state).toEqual({
      ...initialState,
      orders: mockedFeed.orders,
      total: mockedFeed.total,
      totalToday: mockedFeed.totalToday,
      requestStatus: 'Success'
    });
  });

  it('fetchGetFeeds pending', () => {
    const action = { type: fetchGetFeeds.pending.type };
    const state = feedSlice.reducer(initialState, action);
    expect(state).toEqual({ ...initialState, requestStatus: 'Loading' });
  });

  it('fetchGetFeeds rejected', () => {
    const action = { type: fetchGetFeeds.rejected.type };
    const state = feedSlice.reducer(initialState, action);
    expect(state).toEqual({ ...initialState, requestStatus: 'Failed' });
  });
});
