import * as actionTypes from '../actions/actionTypes';
import { updateObject } from '../utility';

const initialState = {
  token: null,
  userId: null,
  error: null,
  loading: null
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

const authReducer =(state = initialState, action) => {
  switch(action.type) {
    case actionTypes.AUTHENTICATION_START: return authStart(state, action);
    case actionTypes.AUTHENTICATION_SUCCESS: return authSuccess(state, action);
    case actionTypes.AUTHENTICATION_FAIL: return authFail(state, action);
    default: return state;
  }
};

export default authReducer;
