import { put } from 'redux-saga/effects';

import axios from '../../axios-orders';
import * as actions from '../actions/order';

export function* purchaseBurgerSaga(action) {
  yield put(actions.purchaseBurgerStart());
  const response = yield axios.post('/orders.json?auth=' + action.token, action.orderData)

  try {
    yield put(actions.purchaseBurgerSuccess(response.data.name, action.orderData));
  } catch (error) {
    yield put(actions.purchaseBurgerFail(error));
  }
}

export function* fetchOrdersSaga(action) {
  yield put(actions.fetchOrderStart());
  const queryParams = '?auth=' + action.token + '&orderBy="userId"&equalTo="' + action.userId + '"';
  const response = yield axios.get('/orders.json' + queryParams)

  try {
    const fetchOrders = [];
    for (let key in response.data) {
      if (response.data.hasOwnProperty(key)) {
        fetchOrders.push({ ...response.data[key], id: key });
      }
    }
    yield put(actions.fetchOrderSuccess(fetchOrders));
  } catch (error) {
    yield put(actions.fetchOrderFail(error));
  }
}
