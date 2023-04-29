import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { deleteCookie, setCookie } from "../../utils/cookie";
import { IUser, IUserReq } from "../../utils/burger-api";
import { ThunkAPI } from "../store";
import { RootState } from "../store";
import { ILogoutBody } from "../../components/profile-navigation/profile-navigation";

export const sliceName = "user";

export const getUser = (state: RootState) => state[sliceName]?.data;

export const getIsAuthChecked = (store: RootState) => store[sliceName]?.isAuthChecked;

export type TIsActionPending = {
  type: string,
  payload: unknown
}

interface IUserState {
  isAuthChecked: boolean;
  data?: {
    email?: string;
    name?: string;
    password?: string;
  } | null;

  registerUserError: unknown;
  registerUserRequest: boolean;

  loginUserError: unknown;
  loginUserRequest: boolean;

  getUserError: unknown;
  getUserRequest: boolean;

  logoutUserError: unknown;
  logoutUserRequest: boolean;

  updateInfoUserError: unknown;
  updateInfoUserRequest: boolean;

  resetPasswordEmailError: unknown;
  resetPasswordEmailRequest: boolean;

  resetPasswordNewError: unknown;
  resetPasswordNewRequest: boolean;
}

const initialState: IUserState = {
  data: null,
  isAuthChecked: false,

  registerUserError: null,
  registerUserRequest: false,

  loginUserError: null,
  loginUserRequest: false,

  getUserError: null,
  getUserRequest: false,

  logoutUserError: null,
  logoutUserRequest: false,

  updateInfoUserError: null,
  updateInfoUserRequest: false,

  resetPasswordEmailError: null,
  resetPasswordEmailRequest: false,

  resetPasswordNewError: null,
  resetPasswordNewRequest: false,
};

export function isActionPending(action: TIsActionPending): boolean {
  return action.type.endsWith('pending')
}

export function isActionRejected(action: TIsActionPending): boolean {
  return action.type.endsWith('rejected')
}

export function isActionSuccess(action: TIsActionPending): boolean {
  return action.type.endsWith('fulfilled')
}

export function getActionName(actionType: string): string {
  return actionType.split('/')[1];
}

export const checkUserAuth = createAsyncThunk<IUser, void, ThunkAPI>(`${sliceName}/checkUserAuth`,
  async (_, { extra: api, rejectWithValue, dispatch }) => {
    try {
      const data = await api.getUser();
      if (!data?.success) {
        return rejectWithValue(data)
      }
      return data.user;
    } catch (error) {
      return rejectWithValue(error);
    }
    finally {
      dispatch(authCheck())
    }

  }
);

export const registerUser = createAsyncThunk<IUser, IUser, ThunkAPI>(`${sliceName}/registerUser`,
  async (dataUser, { extra: api, rejectWithValue }) => {
    const data = await api.registerUser(dataUser);
    console.log('responce', data);
    if (!data?.success) {
      return rejectWithValue(data)
    }
    setCookie('accessToken', data.accessToken, { 'max-age': 1000 });
    setCookie('refreshToken', data.refreshToken)
    return data.user;
  }
);


export const loginUser = createAsyncThunk<IUser, IUser, ThunkAPI>(`${sliceName}/loginUser`,
  async (dataUser: IUser, { extra: api, rejectWithValue }) => {
    const data = await api.loginUser(dataUser);
    console.log('responce', data);
    if (!data?.success) {
      return rejectWithValue(data)
    }
    setCookie('accessToken', data.accessToken);
    setCookie('refreshToken', data.refreshToken);
    return data.user;
  }
);

export const logoutUser = createAsyncThunk<IUser, ILogoutBody, ThunkAPI>(`${sliceName}/logoutUser`,
  async (dataUser, { extra: api, rejectWithValue }) => {
    const data = await api.logoutUser(dataUser);
    console.log('responce', data);
    if (!data?.success) {
      return rejectWithValue(data)
    }
    deleteCookie('accessToken');
    deleteCookie('refreshToken');
    return data.user;
  }
);

export const updateInfoUser = createAsyncThunk<IUser, object, ThunkAPI>(`${sliceName}/updateInfoUser`,
  async (dataUser, { extra: api, rejectWithValue }) => {
    const data = await api.updateInfoUser(dataUser);
    console.log('responce', data);
    if (!data?.success) {
      return rejectWithValue(data)
    }
    return data.user;
  }
);

export const resetPasswordEmail = createAsyncThunk<any, object, ThunkAPI>(`${sliceName}/resetPasswordEmail`,
  async (dataUser, { extra: api, rejectWithValue }) => {
    const data = await api.forgotPasswordEmail(dataUser);
    console.log('responce', data);
    if (!data?.success) {
      return rejectWithValue(data)
    }
    return data;
  }
);

export const resetPasswordNew = createAsyncThunk<void, IUser, ThunkAPI>(`${sliceName}/resetPasswordNew`,
  async (dataUser, { extra: api, rejectWithValue }) => {
    const data = await api.forgotPasswordNew(dataUser);
    console.log('responce', data);
    if (!data?.success) {
      return rejectWithValue(data)
    }
  }
);

const user = createSlice({
  name: sliceName,
  initialState,
  reducers: {
    authCheck: (state) => {
      state.isAuthChecked = true;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(checkUserAuth.fulfilled, (state, action) => {
        state.data = action.payload;
        state.getUserRequest = false;
      })
      .addCase(registerUser.fulfilled, (state, action) => {
        state.data = action.payload;
        state.registerUserRequest = false;
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.data = action.payload;
        state.loginUserRequest = false;
      })
      .addCase(logoutUser.fulfilled, (state, action) => {
        state.data = null;
        state.logoutUserRequest = false;
      })
      .addCase(updateInfoUser.fulfilled, (state, action) => {
        state.data = action.payload;
        state.updateInfoUserRequest = false;
      })
      .addCase(resetPasswordEmail.fulfilled, (state, action) => {
        state.resetPasswordEmailRequest = false;
      })
      .addCase(resetPasswordNew.fulfilled, (state) => {
        state.resetPasswordNewRequest = false;
      })
      .addMatcher(isActionPending, (state: { [key: string]: unknown }, action) => {
        state[`${getActionName(action.type)}Request`] = true;
        state[`${getActionName(action.type)}Error`] = null;
      })
      .addMatcher(isActionRejected, (state: { [key: string]: unknown }, action) => {
        state[`${getActionName(action.type)}Error`] = action.payload;
        state[`${getActionName(action.type)}Request`] = false;
      });
  },
});

export const { authCheck } = user.actions;

export default user.reducer;
