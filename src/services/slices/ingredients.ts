import { createSlice } from '@reduxjs/toolkit';
import { INGREDIENTS_SLICE_NAME } from './slicesName';
import { RequestStatus, TIngredient } from '@utils-types';
import { fetchIngredients } from '../thunk/ingredients';

export interface IngredientsState {
  ingredients: TIngredient[];
  requestStatus: RequestStatus;
}

const initialState: IngredientsState = {
  ingredients: [],
  requestStatus: RequestStatus.Idle
};

const ingredientsSlice = createSlice({
  name: INGREDIENTS_SLICE_NAME,
  initialState,
  reducers: {},
  selectors: {
    selectIngredients: (state) => state.ingredients,
    selectIngredientsStatus: (state) => state.requestStatus,
    getIngredientState: (state) => state
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchIngredients.pending, (state) => {
        state.requestStatus = RequestStatus.Loading;
      })
      .addCase(fetchIngredients.fulfilled, (state, action) => {
        state.ingredients = action.payload;
        state.requestStatus = RequestStatus.Success;
      })
      .addCase(fetchIngredients.rejected, (state, action) => {
        state.requestStatus = RequestStatus.Success;
      });
  }
});

export const ingredientsActions = {
  ...ingredientsSlice.actions,
  fetchIngredients
};
export const ingredientsSelectors = ingredientsSlice.selectors;
export default ingredientsSlice;
