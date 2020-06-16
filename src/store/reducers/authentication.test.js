import authReducer from './authentication';
import * as actionTypes from '../actions/actionTypes';

describe('auth reducer', () => {

  it('should return the initial state', () => {
    expect(authReducer(undefined, {})).toEqual({
      token: null,
      userId: null,
      error: null,
      loading: null,
      authRedirectPath: '/'
    });
  });

  it('authStart should error: null loading=true', () => {
    expect(authReducer(
      undefined,
      { type: actionTypes.AUTHENTICATION_START })).toEqual({
      token: null,
      userId: null,
      error: null,
      loading: true,
      authRedirectPath: '/'
    });
  });

  it('authSuccess should return an update state with token, userId and loading: false', () => {
    expect(authReducer(
      {
        token: null,
        userId: null,
        error: null,
        loading: null,
        authRedirectPath: '/'
      },
      {
        type: actionTypes.AUTHENTICATION_SUCCESS,
        token: 'some-token',
        userId: 'some-userId'
      })).toEqual({
      token: 'some-token',
      userId: 'some-userId',
      error: null,
      loading: false,
      authRedirectPath: '/'
    });
  });

  it('authFail should return an update state with error: action.error loading: false', () => {
    expect(authReducer(
      {
        token: null,
        userId: null,
        error: null,
        loading: null,
        authRedirectPath: '/'
      },
      {
        type: actionTypes.AUTHENTICATION_FAIL,
        error: 'some-error'
      })).toEqual({
      token: null,
      userId: null,
      error: 'some-error',
      loading: false,
      authRedirectPath: '/'
    });
  });

  it('authLogout should return an update state with token: null and userId: null', () => {
    expect(authReducer(
      {
        token: 'some-token',
        userId: 'some-userId',
        error: null,
        loading: false,
        authRedirectPath: '/'
      },
      {
        type: actionTypes.AUTHENTICATION_LOGOUT,
        token: null,
        userId: null
      })).toEqual({
      token: null,
      userId: null,
      error: null,
      loading: false,
      authRedirectPath: '/'
    });
  });

  it('setAuthRedirectPath should return an update state with authRedirectPath: action.path', () => {
    expect(authReducer(
      {
        token: null,
        userId: null,
        error: null,
        loading: null,
        authRedirectPath: '/'
      },
      {
        type: actionTypes.SET_AUTH_REDIRECT_PATH,
        path: 'some-path'
      })).toEqual({
      token: null,
      userId: null,
      error: null,
      loading: null,
      authRedirectPath: 'some-path'
    });
  });

});
