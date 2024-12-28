import { describe, expect } from '@jest/globals';
import burgerSlice, {
  burgerActions,
  initialState,
  TBurgerState
} from './burger';
import { nanoid } from '@reduxjs/toolkit';
import {
  bunIngredientToAdd,
  mainIngredientToAdd,
  mockedBurger,
  mockedPayload,
  testInitialState,
  testMoveBurgerState
} from '../../data';
import { orderBurgers } from '../thunk/burger';

jest.mock('@reduxjs/toolkit', () => ({
  ...jest.requireActual('@reduxjs/toolkit'),
  nanoid: jest.fn(() => 'mockID')
}));

describe('burgers reducer synchronous action tests', () => {
  it('addBurgerIngredient - bun', () => {
    const newState = burgerSlice.reducer(
      testInitialState,
      burgerActions.addBurgerIngredient(bunIngredientToAdd)
    );
    expect(nanoid).toHaveBeenCalled();
    expect(newState.bun).toEqual({
      ...bunIngredientToAdd,
      id: newState.bun?.id
    });
  });
  it('addBurgerIngredient - main', () => {
    const newState = burgerSlice.reducer(
      testInitialState,
      burgerActions.addBurgerIngredient(mainIngredientToAdd)
    );
    expect(nanoid).toHaveBeenCalled();
    expect(newState.data).toEqual([
      {
        ...mainIngredientToAdd,
        id: 'mockID'
      }
    ]);
  });
  it('removeBurgerIngredient', () => {
    const ingredientId = '1';
    const endState: TBurgerState = testInitialState;
    endState.data = endState.data.filter(
      (ingredient) => ingredient.id != ingredientId
    );
    const newState = burgerSlice.reducer(
      testInitialState,
      burgerActions.removeBurgerIngredient(ingredientId)
    );
    expect(newState).toEqual(endState);
  });
  it('moveBurgerIngredient', () => {
    const newState = burgerSlice.reducer(
      { ...initialState, data: testInitialState.ingredients },
      burgerActions.moveBurgerIngredient({ currentIndex: 1, targetIndex: 0 })
    );
    const { data } = newState;
    expect(data).toEqual(testMoveBurgerState.ingredients);
  });
});

describe('burgers reducer', () => {
  it('initializes correctly', () => {
    const state = burgerSlice.reducer(undefined, {
      type: 'UNKNOWN_ACTION'
    });
    expect(state).toEqual(initialState);
  });

  it('orderBurgers fulfilled', () => {
    const action = {
      type: orderBurgers.fulfilled.type,
      payload: mockedBurger
    };
    const state = burgerSlice.reducer(initialState, action);
    expect(state).toEqual({
      ...initialState,
      bun: null,
      data: [],
      orderModalData: [mockedBurger.order[0]],
      requestStatus: 'Success'
    });
  });

  it('orderBurgers pending', () => {
    const action = { type: orderBurgers.pending.type };
    const state = burgerSlice.reducer(initialState, action);
    expect(state).toEqual({ ...initialState, requestStatus: 'Loading' });
  });

  it('orderBurgers rejected', () => {
    const action = { type: orderBurgers.rejected.type };
    const state = burgerSlice.reducer(initialState, action);
    expect(state).toEqual({ ...initialState, requestStatus: 'Failed' });
  });
});
