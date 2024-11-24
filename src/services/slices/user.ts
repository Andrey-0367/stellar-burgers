import { RequestStatus, TUser } from '@utils-types';
import { createSlice } from '@reduxjs/toolkit';
import { USER_SLICE_NAME } from './slicesName';
import {
  fetchUser,
  loginUser,
  logoutUser,
  registerUser,
  updateUser
} from '../thunk/user';

export interface UserState {
  data: TUser | null;
  requestStatus: RequestStatus;
  isUserCheck: boolean;
}

const initialState: UserState = {
  data: null,
  requestStatus: RequestStatus.Idle,
  isUserCheck: false
};

const userSlice = createSlice({
  name: USER_SLICE_NAME,
  initialState,
  selectors: {
    selectUser: (state) => state.data,
    selectUserCheck: (state) => state.isUserCheck,
    selectUserStatus: (state) => state.requestStatus,
    getUserState: (state) => state
  },
  reducers: {
    setUserCheck: (state) => {
      state.isUserCheck = true;
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchUser.pending, (state) => {
        state.requestStatus = RequestStatus.Loading;
      })
      .addCase(fetchUser.fulfilled, (state, action) => {
        state.data = action.payload.user;
        state.requestStatus = RequestStatus.Success;
      })
      .addCase(fetchUser.rejected, (state) => {
        state.requestStatus = RequestStatus.Failed;
      })
      .addCase(registerUser.pending, (state) => {
        state.requestStatus = RequestStatus.Loading;
      })
      .addCase(registerUser.fulfilled, (state, action) => {
        state.data = action.payload.user;
        state.requestStatus = RequestStatus.Success;
      })
      .addCase(registerUser.rejected, (state) => {
        state.requestStatus = RequestStatus.Failed;
      })
      .addCase(loginUser.pending, (state) => {
        state.requestStatus = RequestStatus.Loading;
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.data = action.payload.user;
        state.requestStatus = RequestStatus.Success;
      })
      .addCase(loginUser.rejected, (state) => {
        state.requestStatus = RequestStatus.Failed;
      })
      .addCase(updateUser.pending, (state) => {
        state.requestStatus = RequestStatus.Loading;
      })
      .addCase(updateUser.fulfilled, (state, action) => {
        state.data = action.payload.user;
        state.requestStatus = RequestStatus.Success;
      })
      .addCase(updateUser.rejected, (state) => {
        state.requestStatus = RequestStatus.Failed;
      })
      .addCase(logoutUser.pending, (state) => {
        state.requestStatus = RequestStatus.Loading;
      })
      .addCase(logoutUser.fulfilled, (state) => {
        state.requestStatus = RequestStatus.Success;
        state.data = null;
      })
      .addCase(logoutUser.rejected, (state) => {
        state.requestStatus = RequestStatus.Failed;
      });
  }
});

export const userActions = {
  ...userSlice.actions,
  fetchUser,
  loginUser,
  registerUser,
  updateUser,
  logoutUser
};

export const userSelectors = userSlice.selectors;
export default userSlice;
