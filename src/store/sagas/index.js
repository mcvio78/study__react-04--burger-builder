import { takeEvery } from 'redux-saga/effects';

import * as actionTypes from '../actions/actionTypes';
import { logoutSaga, checkAuthExpirationSaga } from './auth';

export function* watchAuth() {
  yield takeEvery(actionTypes.AUTHENTICATION_INIT_LOGOUT, logoutSaga);
  yield takeEvery(actionTypes.CHECK_AUTH_EXPIRATION, checkAuthExpirationSaga);
}
