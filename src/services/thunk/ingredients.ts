import { getIngredientsApi } from '@api';
import { INGREDIENTS_SLICE_NAME } from '../slices/slicesName';
import { createAsyncThunk } from '@reduxjs/toolkit';

export const fetchIngredients = createAsyncThunk(
  `${INGREDIENTS_SLICE_NAME}/fetchIngredients`,
  async () => getIngredientsApi()
);
