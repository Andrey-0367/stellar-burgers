import { expect, describe } from '@jest/globals';

import { mockedOrders, mockedPayload } from '../../data';
import { initialState, orderSlice } from './order';
import { fetchOrderByNumber, fetchOrdersAll } from '../thunk/order';

describe('order reducer', () => {
  it('initializes correctly', () => {
    const state = orderSlice.reducer(undefined, {
      type: 'UNKNOWN_ACTION'
    });
    expect(state).toEqual(initialState);
  });

  it('fetchOrderByNumber fulfilled', () => {
    const action = {
      type: fetchOrderByNumber.fulfilled.type,
      payload: mockedPayload
    };
    const state = orderSlice.reducer(initialState, action);
    expect(state).toEqual({
      ...initialState,
      orderData: mockedPayload.orders[0],
      requestStatus: 'Success'
    });
  });

  it('fetchOrderByNumber pending', () => {
    const action = { type: fetchOrderByNumber.pending.type };
    const state = orderSlice.reducer(initialState, action);
    expect(state).toEqual({ ...initialState, requestStatus: 'Loading' });
  });

  it('fetchOrderByNumber rejected', () => {
    const action = { type: fetchOrderByNumber.rejected.type };
    const state = orderSlice.reducer(initialState, action);
    expect(state).toEqual({ ...initialState, requestStatus: 'Failed' });
  });

  it('fetchOrdersAll fulfilled', () => {
    const action = {
      type: fetchOrdersAll.fulfilled.type,
      payload: mockedOrders
    };
    const state = orderSlice.reducer(initialState, action);
    expect(state).toEqual({
      ...initialState,
      orders: mockedOrders,
      requestStatus: 'Success'
    });
  });

  it('fetchOrdersAll pending', () => {
    const action = { type: fetchOrdersAll.pending.type };
    const state = orderSlice.reducer(initialState, action);
    expect(state).toEqual({ ...initialState, requestStatus: 'Loading' });
  });

  it('fetchOrdersAll rejected', () => {
    const action = { type: fetchOrdersAll.rejected.type };
    const state = orderSlice.reducer(initialState, action);
    expect(state).toEqual({ ...initialState, requestStatus: 'Failed' });
  });
});
