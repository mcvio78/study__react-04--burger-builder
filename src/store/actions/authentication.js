import * as actionTypes from './actionTypes';
import axios from 'axios';

const authenticationStart = () => {
  return {
    type: actionTypes.AUTHENTICATION_START
  };
};

const authenticationSuccess = (token, userId) => {
  return {
    type: actionTypes.AUTHENTICATION_SUCCESS,
    token: token,
    userId: userId
  };
};

const authenticationFail = err => {
  return {
    type: actionTypes.AUTHENTICATION_FAIL,
    error: err
  };
};

export const logout = () => {
  return {
    type: actionTypes.AUTHENTICATION_LOGOUT
  };
};

const checkAuthExpiration = expiration => {
  return dispatch => {
    setTimeout(()=> {
      dispatch(logout());
    }, expiration * 1000);
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
        dispatch(checkAuthExpiration(response.data.expiresIn));
        dispatch(authenticationSuccess(response.data.idToken, response.data.localId));/* eslint-disable-line */
      })
      .catch(error => {
        console.log('error: ', error);
        dispatch(authenticationFail(error));
      });
  };
};
