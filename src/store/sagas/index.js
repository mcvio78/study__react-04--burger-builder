import { takeEvery } from 'redux-saga/effects';

import * as actionTypes from '../actions/actionTypes';
import {
  authenticationUserSaga,
  checkAuthExpirationSaga,
  checkAuthStateSaga,
  logoutSaga
} from './auth';

export function* watchAuth() {
  yield takeEvery(actionTypes.AUTHENTICATION_INIT_LOGOUT, logoutSaga);
  yield takeEvery(actionTypes.CHECK_AUTH_EXPIRATION, checkAuthExpirationSaga);
  yield takeEvery(actionTypes.AUTHENTICATION_USER, authenticationUserSaga);
  yield takeEvery(actionTypes.AUTHENTICATION_CHECKOUT, checkAuthStateSaga)
}
