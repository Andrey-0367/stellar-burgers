import { expect, describe } from '@jest/globals';
import { mockedUser, mockedUserLogin, mockedUserRegister } from '../../data';
import userSlice, { initialState, userActions } from './user';
import {
  fetchUser,
  loginUser,
  logoutUser,
  registerUser,
  updateUser
} from '../thunk/user';
import { RequestStatus } from '../../utils/types';

describe('synchronous action tests', () => {
  afterAll(() => {
    jest.restoreAllMocks();
  });

  test('reducer setUserCheck', () => {
    const newState = userSlice.reducer(
      {
        data: null,
        isUserCheck: false,
        requestStatus: RequestStatus.Idle
      },
      userActions.setUserCheck()
    );
    const expected = {
      data: null,
      isUserCheck: true,
      requestStatus: RequestStatus.Idle
    };
    expect(newState).toEqual(expected);
  });
});

describe('user reducer', () => {
  it('initializes correctly', () => {
    const state = userSlice.reducer(undefined, {
      type: 'UNKNOWN_ACTION'
    });
    expect(state).toEqual(initialState);
  });

  it('fetchUser fulfilled', () => {
    const action = {
      type: fetchUser.fulfilled.type,
      payload: mockedUser
    };
    const state = userSlice.reducer(initialState, action);
    expect(state).toEqual({
      ...initialState,
      data: mockedUser.user,
      requestStatus: 'Success'
    });
  });

  it('fetchUser pending', () => {
    const action = { type: fetchUser.pending.type };
    const state = userSlice.reducer(initialState, action);
    expect(state).toEqual({ ...initialState, requestStatus: 'Loading' });
  });

  it('fetchUser rejected', () => {
    const action = { type: fetchUser.rejected.type };
    const state = userSlice.reducer(initialState, action);
    expect(state).toEqual({ ...initialState, requestStatus: 'Failed' });
  });

  it('registerUser fulfilled', () => {
    const action = {
      type: registerUser.fulfilled.type,
      payload: mockedUserRegister
    };
    const state = userSlice.reducer(initialState, action);
    expect(state).toEqual({
      ...initialState,
      data: mockedUserRegister.user,
      requestStatus: 'Success'
    });
  });

  it('registerUser pending', () => {
    const action = { type: registerUser.pending.type };
    const state = userSlice.reducer(initialState, action);
    expect(state).toEqual({ ...initialState, requestStatus: 'Loading' });
  });

  it('registerUser rejected', () => {
    const action = { type: registerUser.rejected.type };
    const state = userSlice.reducer(initialState, action);
    expect(state).toEqual({ ...initialState, requestStatus: 'Failed' });
  });

  it('loginUser fulfilled', () => {
    const action = {
      type: loginUser.fulfilled.type,
      payload: mockedUserLogin
    };
    const state = userSlice.reducer(initialState, action);
    expect(state).toEqual({
      ...initialState,
      data: mockedUserLogin.user,
      requestStatus: 'Success'
    });
  });

  it('loginUser pending', () => {
    const action = { type: loginUser.pending.type };
    const state = userSlice.reducer(initialState, action);
    expect(state).toEqual({ ...initialState, requestStatus: 'Loading' });
  });

  it('loginUser rejected', () => {
    const action = { type: loginUser.rejected.type };
    const state = userSlice.reducer(initialState, action);
    expect(state).toEqual({ ...initialState, requestStatus: 'Failed' });
  });

  it('updateUser fulfilled', () => {
    const action = {
      type: updateUser.fulfilled.type,
      payload: mockedUserRegister
    };
    const state = userSlice.reducer(initialState, action);
    expect(state).toEqual({
      ...initialState,
      data: mockedUserRegister.user,
      requestStatus: 'Success'
    });
  });

  it('updateUser pending', () => {
    const action = { type: updateUser.pending.type };
    const state = userSlice.reducer(initialState, action);
    expect(state).toEqual({ ...initialState, requestStatus: 'Loading' });
  });

  it('updateUser rejected', () => {
    const action = { type: updateUser.rejected.type };
    const state = userSlice.reducer(initialState, action);
    expect(state).toEqual({ ...initialState, requestStatus: 'Failed' });
  });

  it('logoutUser fulfilled', () => {
    const action = {
      type: logoutUser.fulfilled.type,
      payload: mockedUser
    };
    const state = userSlice.reducer(initialState, action);
    expect(state).toEqual({
      ...initialState,
      data: null,
      requestStatus: 'Success'
    });
  });

  it('logoutUser pending', () => {
    const action = { type: logoutUser.pending.type };
    const state = userSlice.reducer(initialState, action);
    expect(state).toEqual({ ...initialState, requestStatus: 'Loading' });
  });

  it('logoutUser rejected', () => {
    const action = { type: logoutUser.rejected.type };
    const state = userSlice.reducer(initialState, action);
    expect(state).toEqual({ ...initialState, requestStatus: 'Failed' });
  });
});
