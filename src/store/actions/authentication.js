import * as actionTypes from './actionTypes';

export const authenticationStart = () => {
  return {
    type: actionTypes.AUTHENTICATION_START
  };
};

export const authenticationSuccess = (token, userId) => {
  return {
    type: actionTypes.AUTHENTICATION_SUCCESS,
    token: token,
    userId: userId
  };
};

export const authenticationFail = err => {
  return {
    type: actionTypes.AUTHENTICATION_FAIL,
    error: err
  };
};

export const logout = () => {
  return {
    type: actionTypes.AUTHENTICATION_INIT_LOGOUT
  };
};

export const logoutSucceed = () => {
  return {
    type: actionTypes.AUTHENTICATION_LOGOUT
  };
};

export const checkAuthExpiration = expiration => {
  return {
    type: actionTypes.CHECK_AUTH_EXPIRATION,
    expiration: expiration
  };
};

export const authentication = (email, password, isSignUp) => {

  return {
    type: actionTypes.AUTHENTICATION_USER,
    email: email,
    password: password,
    isSignUp: isSignUp
  };
};

export const setAuthRedirectPath = path => {
  return {
    type: actionTypes.SET_AUTH_REDIRECT_PATH,
    path: path
  };
};

export const checkAuthState = () => {
  return {
    type: actionTypes.AUTHENTICATION_CHECKOUT
  }
};
