import { put } from 'redux-saga/effects';
import { delay } from 'redux-saga/effects';

import * as actions from '../actions/index';
import axios from 'axios';

export function* logoutSaga() {
  yield localStorage.removeItem('token');
  yield localStorage.removeItem('expirationDate');
  yield localStorage.removeItem('userId');
  yield put(actions.logoutSucceed());
}

export function* checkAuthExpirationSaga(action) {
  yield delay(action.expiration * 1000);
  yield put(actions.logout())
}

export function* authenticationUserSaga(action) {
  yield put(actions.authenticationStart())
  const authData = {
    email: action.email,
    password: action.password,
    returnSecureToken: true
  };
  let url =
    'https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyA1_i7dNm9G3TmTNnVTo4qp2mJ2wSsQSeo';
  if (!action.isSignUp) {
    url =
      'https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyA1_i7dNm9G3TmTNnVTo4qp2mJ2wSsQSeo';
  }
  const response = yield axios.post(url, authData, { headers: { 'content-type': 'application/json' } })
  try {
    const expirationDate = yield new Date(new Date().getTime() + (response.data.expiresIn * 1000));
    yield localStorage.setItem('token', response.data.idToken);
    yield localStorage.setItem('expirationDate', expirationDate);
    yield localStorage.setItem('userId', response.data.localId);
    yield put(actions.authenticationSuccess(response.data.idToken, response.data.localId));
    yield put(actions.checkAuthExpiration(response.data.expiresIn));
  } catch (error) {
    yield put(actions.authenticationFail(error));
  }
}

export function* checkAuthStateSaga() {
  const token = yield localStorage.getItem('token');
  if (!token) {
    yield put(actions.logout());
  } else {
    const expirationDate = yield new Date(localStorage.getItem('expirationDate'));
    if (expirationDate <= new Date()) {
      yield put(actions.logout());
    } else {
      const userId = yield localStorage.getItem('userId');
      yield put(actions.authenticationSuccess(token, userId));
      yield put(actions.checkAuthExpiration((expirationDate.getTime() - new Date().getTime()) / 1000));
    }
  }

}
