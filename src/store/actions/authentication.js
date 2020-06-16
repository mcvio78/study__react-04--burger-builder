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
  // localStorage.removeItem('token');
  // localStorage.removeItem('expirationDate');
  // localStorage.removeItem('userId');
  return {
    type: actionTypes.AUTHENTICATION_INIT_LOGOUT
  };
};

export const logoutSucced = () => {
  return {
    type: actionTypes.AUTHENTICATION_LOGOUT
  };
};

const checkAuthExpiration = expiration => {
  return dispatch => {
    setTimeout(() => {
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
    if (!isSignUp) {
      url = 'https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyA1_i7dNm9G3TmTNnVTo4qp2mJ2wSsQSeo';
    }
    axios.post(
      url,
      authData,
      { headers: { 'content-type': 'application/json' } }
    )
      .then(response => {
        console.log('response: ', response);
        const expirationDate = new Date(new Date().getTime() + (response.data.expiresIn * 1000));/* eslint-disable-line */
        localStorage.setItem('token', response.data.idToken);
        localStorage.setItem('expirationDate', expirationDate);
        localStorage.setItem('userId', response.data.localId);

        dispatch(authenticationSuccess(response.data.idToken, response.data.localId));/* eslint-disable-line */
        dispatch(checkAuthExpiration(response.data.expiresIn));
      })
      .catch(error => {
        console.log('error: ', error);
        dispatch(authenticationFail(error));
      });
  };
};

export const setAuthRedirectPath = path => {
  return {
    type: actionTypes.SET_AUTH_REDIRECT_PATH,
    path: path
  };
};

export const checkAuthState = () => {
  return dispatch => {
    const token = localStorage.getItem('token');
    if (!token) {
      dispatch(logout());
    } else {
      const expirationDate = new Date(localStorage.getItem('expirationDate'));
      if (expirationDate <= new Date()) {
        dispatch(logout());
      } else {
        const userId = localStorage.getItem('userId');
        dispatch(authenticationSuccess(token, userId));
        dispatch(checkAuthExpiration((expirationDate.getTime() - new Date().getTime()) / 1000));/* eslint-disable-line */
      }
    }
  };
};
