import * as actionTypes from './actionTypes';

export const authenticationStart = () => {
  return {
    type: actionTypes.AUTHENTICATION_START,
  };
};

export const authenticationSuccess = (token, userId) => {
  return {
    type: actionTypes.AUTHENTICATION_SUCCESS,
    token,
    userId,
  };
};

export const authenticationFail = err => {
  return {
    type: actionTypes.AUTHENTICATION_FAIL,
    error: err,
  };
};

export const logout = () => {
  return {
    type: actionTypes.AUTHENTICATION_LOGOUT_INIT,
  };
};

export const logoutSucceed = () => {
  return {
    type: actionTypes.AUTHENTICATION_LOGOUT,
  };
};

export const checkAuthExpiration = expiration => {
  return {
    type: actionTypes.CHECK_AUTH_EXPIRATION,
    expiration,
  };
};

export const authentication = (email, password, isSignUp) => {
  return {
    type: actionTypes.AUTHENTICATION_USER,
    email,
    password,
    isSignUp,
  };
};

export const setAuthRedirectPath = path => {
  return {
    type: actionTypes.SET_AUTH_REDIRECT_PATH,
    path,
  };
};

export const checkAuthState = () => {
  return {
    type: actionTypes.AUTHENTICATION_CHECKOUT,
  };
};
