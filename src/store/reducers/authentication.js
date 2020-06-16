import * as actionTypes from '../actions/actionTypes';
import { updateObject } from '../../shared/utility';

const initialState = {
  token: null,
  userId: null,
  error: null,
  loading: null,
  authRedirectPath: '/'
};

const authStart = (state, action) => {
  return updateObject(state, {
    error: null,
    loading: true
  });
};

const authSuccess = (state, action) => {
  return updateObject(state, {
    token: action.token,
    userId: action.userId,
    loading: false
  });
};

const authFail = (state, action) => {
  return updateObject(state, {
    error: action.error,
    loading: false
  });
};

const authLogout = (state, action) => {
  return updateObject(state, {
    token: null,
    userId: null
  });
};

const setAuthRedirectPath = (state, action) => {
  return updateObject(state, {
    authRedirectPath: action.path
  });
};

const authReducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.AUTHENTICATION_START:
      return authStart(state, action);
    case actionTypes.AUTHENTICATION_SUCCESS:
      return authSuccess(state, action);
    case actionTypes.AUTHENTICATION_FAIL:
      return authFail(state, action);
    case actionTypes.AUTHENTICATION_LOGOUT:
      return authLogout(state, action);
    case actionTypes.SET_AUTH_REDIRECT_PATH:
      return setAuthRedirectPath(state, action);/* eslint-disable-line */
    default:
      return state;
  }
};

export default authReducer;
