import {
  getUserApi,
  loginUserApi,
  logoutApi,
  registerUserApi,
  TAuthResponse,
  TLoginData,
  TRegisterData,
  TUserResponse,
  updateUserApi
} from '../../utils/burger-api';
import { deleteCookie, setCookie } from '../../utils/cookie';
import { USER_SLICE_NAME } from '../slices/slicesName';
import { createAppAsyncThunk, useActionCreators } from '../hooks';

export const fetchUser = createAppAsyncThunk<TUserResponse, void>(
  `${USER_SLICE_NAME}/fetchUser`,
  getUserApi
);

export const registerUser = createAppAsyncThunk<TAuthResponse, TRegisterData>(
  `${USER_SLICE_NAME}/registerUser`,
  async (registerData) => registerUserApi(registerData)
);

export const loginUser = createAppAsyncThunk<TAuthResponse, TLoginData>(
  `${USER_SLICE_NAME}/loginUser`,
  async (dataUser) => {
    const data = await loginUserApi(dataUser);
    if (!data.success) {
      return data;
    }
    setCookie('accessToken', data.accessToken);
    localStorage.setItem('refreshToken', data.refreshToken);
    return data;
  }
);

export const updateUser = createAppAsyncThunk<TUserResponse, TRegisterData>(
  `${USER_SLICE_NAME}/updateUser`,
  async (dataUser) => updateUserApi(dataUser)
);

export const logoutUser = createAppAsyncThunk<any>(
  `${USER_SLICE_NAME}/logoutUser`,
  async () => {
    const data = await logoutApi();
    localStorage.clear();
    deleteCookie('accessToken');
    return data;
  }
);
