import { RequestStatus, TOrder } from '../../utils/types';
import { createSlice } from '@reduxjs/toolkit';
import { ORDER_SLICE_NAME } from './slicesName';
import { fetchOrderByNumber, fetchOrdersAll } from '../thunk/order';

type TOrderState = {
  orders: TOrder[];
  orderData: TOrder | null;
  requestStatus: RequestStatus;
};

export const initialState: TOrderState = {
  orders: [],
  orderData: null,
  requestStatus: RequestStatus.Idle
};

export const orderSlice = createSlice({
  name: ORDER_SLICE_NAME,
  initialState,
  reducers: {},
  selectors: {
    selectOrderState: (state) => state,
    selectOrderStatus: (state) => state.requestStatus
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchOrderByNumber.pending, (state) => {
        state.requestStatus = RequestStatus.Loading;
      })
      .addCase(fetchOrderByNumber.fulfilled, (state, action) => {
        state.requestStatus = RequestStatus.Success;
        state.orderData = action.payload.orders[0];
      })
      .addCase(fetchOrderByNumber.rejected, (state) => {
        state.requestStatus = RequestStatus.Failed;
      })
      .addCase(fetchOrdersAll.pending, (state) => {
        state.requestStatus = RequestStatus.Loading;
      })
      .addCase(fetchOrdersAll.fulfilled, (state, action) => {
        state.requestStatus = RequestStatus.Success;
        state.orders = action.payload;
      })
      .addCase(fetchOrdersAll.rejected, (state, action) => {
        state.requestStatus = RequestStatus.Failed;
      });
  }
});

export const orderActions = {
  ...orderSlice.actions,
  fetchOrderByNumber,
  fetchOrdersAll
};
export const orderSelections = orderSlice.selectors;
export default orderSlice.reducer;
