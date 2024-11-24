import { createAsyncThunk } from '@reduxjs/toolkit';
import { orderBurgerApi } from '@api';
import { BURGER_SLICE_NAME } from '../slices/slicesName';

export const orderBurgers = createAsyncThunk(
  `${BURGER_SLICE_NAME}/orderBurgers`,
  async (data: string[]) => orderBurgerApi(data)
);
