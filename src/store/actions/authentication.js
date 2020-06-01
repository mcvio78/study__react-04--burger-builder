import * as actionTypes from './actionTypes';
import axios from 'axios';

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

export const authentication = (email, password, isSignUp) => {
  return dispatch => {
    dispatch(authenticationStart());
    const authData = {
      email: email,
      password: password,
      returnSecureToken: true
    };
    let url = 'https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyA1_i7dNm9G3TmTNnVTo4qp2mJ2wSsQSeo';
    if(!isSignUp){
      url = 'https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyA1_i7dNm9G3TmTNnVTo4qp2mJ2wSsQSeo';
    }
    axios.post(
      url,
      authData,
      { headers: { 'content-type': 'application/json' } }
    )
      .then(response => {
        console.log('response: ', response);
        dispatch(authenticationSuccess(response.data));
      })
      .catch(error => {
        console.log('error: ', error);
        dispatch(authenticationFail(error));
      });
  };
};
