import {
  RequestStatus,
  TConstructorIngredient,
  TIngredient,
  TOrder
} from '@utils-types';
import { createSlice, nanoid, PayloadAction } from '@reduxjs/toolkit';
import { BURGER_SLICE_NAME } from './slicesName';
import { orderBurgers } from '../thunk/burger';

type TBurgerState = {
  data: TConstructorIngredient[];
  bun: TConstructorIngredient | null;
  orderModalData: TOrder | null;
  requestStatus: RequestStatus;
};

const initialState: TBurgerState = {
  data: [],
  bun: null,
  orderModalData: null,
  requestStatus: RequestStatus.Idle
};

const burgerSlice = createSlice({
  name: BURGER_SLICE_NAME,
  initialState,
  reducers: {
    addBurgerIngredient: {
      reducer: (state, action: PayloadAction<TConstructorIngredient>) => {
        if (action.payload.type === 'bun') {
          state.bun = action.payload;
        } else {
          state.data.push(action.payload);
        }
      },
      prepare: (ingredient: TIngredient) => {
        const id = nanoid();
        return { payload: { ...ingredient, id } };
      }
    },
    removeBurgerIngredient: (state, action: PayloadAction<string>) => {
      state.data = state.data.filter(
        (ingredient) => ingredient.id !== action.payload
      );
    },
    moveBurgerIngredient: (
      state,
      action: PayloadAction<{ currentIndex: number; targetIndex: number }>
    ) => {
      const { currentIndex, targetIndex } = action.payload;
      const ingredientToMove = state.data[currentIndex];
      state.data.splice(currentIndex, 1);
      state.data.splice(targetIndex, 0, ingredientToMove);
    },
    setRequest: (state, action) => {
      state.requestStatus = action.payload;
    },
    clearBurger: (state) => {
      state.orderModalData = null;
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(orderBurgers.pending, (state) => {
        state.requestStatus = RequestStatus.Loading;
      })
      .addCase(orderBurgers.fulfilled, (state, action) => {
        state.orderModalData = action.payload.order;
        state.requestStatus = RequestStatus.Success;
        state.bun = null;
        state.data = [];
      })
      .addCase(orderBurgers.rejected, (state, action) => {
        state.requestStatus = RequestStatus.Failed;
      });
  },
  selectors: {
    selectBurgerIngredients: (state) => state.data,
    selectBurgerBun: (state) => state.bun,
    selectBurgerStatus: (state) => state.requestStatus,
    selectModalData: (state) => state.orderModalData
  }
});

export const burgerActions = {
  ...burgerSlice.actions,
  orderBurgers
};

export const burgerSelectors = burgerSlice.selectors;
export default burgerSlice;
