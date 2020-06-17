import { takeEvery } from 'redux-saga/effects';

import * as actionTypes from '../actions/actionTypes';

import {
  authenticationUserSaga,
  checkAuthExpirationSaga,
  checkAuthStateSaga,
  logoutSaga,
} from './auth';

import {
  purchaseBurgerSaga,
  fetchOrdersSaga
} from './order';

import {
  initIngredientsSaga
} from './burgerBuilder';

export function* watchAuth() {
  yield takeEvery(actionTypes.AUTHENTICATION_LOGOUT_INIT, logoutSaga);
  yield takeEvery(actionTypes.CHECK_AUTH_EXPIRATION, checkAuthExpirationSaga);
  yield takeEvery(actionTypes.AUTHENTICATION_USER, authenticationUserSaga);
  yield takeEvery(actionTypes.AUTHENTICATION_CHECKOUT, checkAuthStateSaga)
}

export function* watchOrder() {
  yield takeEvery(actionTypes.PURCHASE_BURGER_INIT, purchaseBurgerSaga)
  yield takeEvery(actionTypes.FETCH_ORDER_INIT, fetchOrdersSaga)
}

export function* watchBurgerBuilder() {
  yield takeEvery(actionTypes.INGREDIENTS, initIngredientsSaga)
}
