import { INGREDIENTS_SLICE_NAME } from '../slices/slicesName';
import { createAsyncThunk } from '@reduxjs/toolkit';
import { getIngredientsApi } from '../../utils/burger-api';

export const fetchIngredients = createAsyncThunk(
  `${INGREDIENTS_SLICE_NAME}/fetchIngredients`,
  async () => getIngredientsApi()
);
