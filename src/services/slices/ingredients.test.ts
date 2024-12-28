import { expect, describe } from '@jest/globals';
import { fetchIngredients } from '../thunk/ingredients';
import ingredientsSlice, { initialState } from './ingredients';
import { data } from '../../data';

describe('ingredients reducer', () => {
  it('initializes correctly', () => {
    const state = ingredientsSlice.reducer(undefined, {
      type: 'UNKNOWN_ACTION'
    });
    expect(state).toEqual(initialState);
  });

  it('fetchIngredients fulfilled', () => {
    const action = {
      type: fetchIngredients.fulfilled.type,
      payload: data
    };
    const state = ingredientsSlice.reducer(initialState, action);
    expect(state).toEqual({
      ...initialState,
      ingredients: data,
      requestStatus: 'Success'
    });
  });

  it('fetchIngredients pending', () => {
    const action = { type: fetchIngredients.pending.type };
    const state = ingredientsSlice.reducer(initialState, action);
    expect(state).toEqual({ ...initialState, requestStatus: 'Loading' });
  });

  it('fetchIngredients rejected', () => {
    const action = { type: fetchIngredients.rejected.type };
    const state = ingredientsSlice.reducer(initialState, action);
    expect(state).toEqual({ ...initialState, requestStatus: 'Success' });
  });
});
