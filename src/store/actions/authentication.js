import * as actionTypes from './actionTypes';

const authenticationStart = () => {
  return {
    type: actionTypes.AUTHENTICATION_START
  };
};

const authenticationSuccess = authData => {
  return {
    type: actionTypes.AUTHENTICATION_SUCCESS,
    authData: authData
  };
};

const authenticationFail = err => {
  return {
    type: actionTypes.AUTHENTICATION_FAIL,
    error: err
  };
};

export const authentication = (email, password) => {
  return dispatch => {
    dispatch(authenticationStart());
    // ...
  };
};
