import {
  loginUser,
  logoutUser,
  authCheck,
  checkUserAuth,
  initialState,
  registerUser,
  resetPasswordEmail,
  resetPasswordNew,
  updateInfoUser
} from './userSlice';
import userReducer from './userSlice';
import { testUserData } from '../../utils/tests';

describe('user reducer', () => {
  it('should return initial state', () => {
    expect(userReducer(undefined, { type: '' })).toEqual(initialState);
  });

  it('should hanlde authCheck action', () => {
    expect(userReducer(initialState, { type: authCheck.type })).toEqual({
      ...initialState,
      isAuthChecked: true
    });
  });

  it('should hanlde checkUserAuth fulfilled', () => {
    expect(
      userReducer(initialState, {
        payload: testUserData,
        type: checkUserAuth.fulfilled.type
      })
    ).toEqual({
      ...initialState,
      data: testUserData,
      getUserRequest: false
    });
  });

  it('should hanlde registerUser fulfilled', () => {
    expect(
      userReducer(initialState, {
        payload: testUserData,
        type: registerUser.fulfilled.type
      })
    ).toEqual({
      ...initialState,
      data: testUserData,
      registerUserRequest: false
    });
  });

  it('should hanlde loginUser fulfilled', () => {
    expect(
      userReducer(initialState, {
        payload: testUserData,
        type: loginUser.fulfilled.type
      })
    ).toEqual({
      ...initialState,
      data: testUserData,
      loginUserRequest: false
    });
  });

  it('should hanlde logoutUser fulfilled', () => {
    expect(
      userReducer(initialState, {
        payload: testUserData,
        type: logoutUser.fulfilled.type
      })
    ).toEqual({
      ...initialState,
      data: null,
      logoutUserRequest: false
    });
  });

  it('should hanlde updateInfoUser fulfilled', () => {
    expect(
      userReducer(initialState, {
        payload: testUserData,
        type: updateInfoUser.fulfilled.type
      })
    ).toEqual({
      ...initialState,
      data: testUserData,
      updateInfoUserRequest: false
    });
  });

  it('should hanlde resetPasswordNew fulfilled', () => {
    expect(
      userReducer(initialState, {
        payload: testUserData,
        type: resetPasswordNew.fulfilled.type
      })
    ).toEqual({
      ...initialState,
      resetPasswordNewRequest: false
    });
  });

  it('should hanlde resetPasswordEmail fulfilled', () => {
    expect(
      userReducer(initialState, {
        payload: testUserData,
        type: resetPasswordNew.fulfilled.type
      })
    ).toEqual({
      ...initialState,
      resetPasswordEmailRequest: false
    });
  });

  // pending

  it('should hanlde checkUserAuth pending', () => {
    expect(
      userReducer(initialState, { type: checkUserAuth.pending.type })
    ).toEqual({
      ...initialState,
      data: null,
      checkUserAuthRequest: true,
      checkUserAuthError: null
    });
  });

  it('should hanlde registerUser pending', () => {
    expect(
      userReducer(initialState, { type: registerUser.pending.type })
    ).toEqual({
      ...initialState,
      data: null,
      registerUserRequest: true,
      registerUserError: null
    });
  });

  it('should hanlde loginUser pending', () => {
    expect(userReducer(initialState, { type: loginUser.pending.type })).toEqual(
      {
        ...initialState,
        data: null,
        loginUserRequest: true,
        loginUserError: null
      }
    );
  });

  it('should hanlde logoutUser pending', () => {
    expect(
      userReducer(initialState, { type: logoutUser.pending.type })
    ).toEqual({
      ...initialState,
      data: null,
      logoutUserRequest: true,
      logoutUserError: null
    });
  });

  it('should hanlde updateInfoUser pending', () => {
    expect(
      userReducer(initialState, { type: updateInfoUser.pending.type })
    ).toEqual({
      ...initialState,
      data: null,
      updateInfoUserRequest: true,
      updateInfoUserError: null
    });
  });

  it('should hanlde resetPasswordNew pending', () => {
    expect(
      userReducer(initialState, { type: resetPasswordNew.pending.type })
    ).toEqual({
      ...initialState,
      data: null,
      resetPasswordNewRequest: true,
      resetPasswordNewError: null
    });
  });

  it('should hanlde resetPasswordEmail pending', () => {
    expect(
      userReducer(initialState, { type: resetPasswordEmail.pending.type })
    ).toEqual({
      ...initialState,
      data: null,
      resetPasswordEmailRequest: true,
      resetPasswordEmailError: null
    });
  });

  // reject

  it('should hanlde checkUserAuth rejected', () => {
    expect(
      userReducer(initialState, {
        payload: testUserData,
        type: checkUserAuth.rejected.type
      })
    ).toEqual({
      ...initialState,
      checkUserAuthRequest: false,
      checkUserAuthError: testUserData
    });
  });

  it('should hanlde registerUser rejected', () => {
    expect(
      userReducer(initialState, { type: registerUser.rejected.type })
    ).toEqual({
      ...initialState,
      data: null,
      registerUserRequest: false,
      registerUserError: undefined
    });
  });

  it('should hanlde loginUser rejected', () => {
    expect(
      userReducer(initialState, { type: loginUser.rejected.type })
    ).toEqual({
      ...initialState,
      data: null,
      loginUserRequest: false,
      loginUserError: undefined
    });
  });

  it('should hanlde loginUser rejected', () => {
    expect(
      userReducer(initialState, { type: loginUser.rejected.type })
    ).toEqual({
      ...initialState,
      data: null,
      loginUserRequest: false,
      loginUserError: undefined
    });
  });

  it('should hanlde updateInfoUser rejected', () => {
    expect(
      userReducer(initialState, { type: updateInfoUser.rejected.type })
    ).toEqual({
      ...initialState,
      data: null,
      updateInfoUserRequest: false,
      updateInfoUserError: undefined
    });
  });

  it('should hanlde resetPasswordNew rejected', () => {
    expect(
      userReducer(initialState, { type: resetPasswordNew.rejected.type })
    ).toEqual({
      ...initialState,
      data: null,
      resetPasswordNewRequest: false,
      resetPasswordNewError: undefined
    });
  });

  it('should hanlde resetPasswordEmail rejected', () => {
    expect(
      userReducer(initialState, { type: resetPasswordEmail.rejected.type })
    ).toEqual({
      ...initialState,
      data: null,
      resetPasswordEmailRequest: false,
      resetPasswordEmailError: undefined
    });
  });
});
