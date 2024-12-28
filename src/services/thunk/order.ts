import { createAsyncThunk } from '@reduxjs/toolkit';
import { getOrderByNumberApi, getOrdersApi } from '../../utils/burger-api';
import { ORDER_SLICE_NAME } from '../slices/slicesName';

export const fetchOrderByNumber = createAsyncThunk(
  `${ORDER_SLICE_NAME}/fetchOrderByNumber`,
  async (number: number) => getOrderByNumberApi(number)
);

export const fetchOrdersAll = createAsyncThunk(
  `${ORDER_SLICE_NAME}/fetchOrdersAll`,
  getOrdersApi
);
