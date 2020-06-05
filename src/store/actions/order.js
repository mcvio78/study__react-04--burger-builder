import * as actionTypes from './actionTypes';
import axios from '../../axios-orders';

export const purchaseInit = () => {
  return {
    type: actionTypes.PURCHASE_INIT
  };
};

const purchaseBurgerStart = () => {
  return {
    type: actionTypes.PURCHASE_BURGER_START
  };
};

const purchaseBurgerSuccess = (id, data) => {
  return {
    type: actionTypes.PURCHASE_BURGER_SUCCESS,
    orderId: id,
    orderData: data
  };
};

const purchaseBurgerFail = err => {
  return {
    type: actionTypes.PURCHASE_BURGER_FAIL,
    error: err
  };
};

export const purchaseBurger = (orderData, token) => {
  return dispatch => {
    dispatch(purchaseBurgerStart());
    axios.post('/orders.json?auth=' + token, orderData)
      .then(response => {
        console.log('RESPONSE: ', response);
        dispatch(purchaseBurgerSuccess(response.data.name, orderData));
      })
      .catch(err => {
        dispatch(purchaseBurgerFail(err));
      });
  };
};


const fetchOrderStart = () => {
  return {
    type: actionTypes.FETCH_ORDER_START
  };
};

const fetchOrderSuccess = fetchedData => {
  return {
    type: actionTypes.FETCH_ORDER_SUCCESS,
    orders: fetchedData
  };
};

const fetchOrderFail = err => {
  return {
    type: actionTypes.FETCH_ORDER_FAIL,
    error: err
  };
};

export const fetchOrders = (token, userId) => {
  return dispatch => {
    dispatch(fetchOrderStart());
    const queryParams = '?auth=' + token + '&orderBy="userId"&equalTo="' + userId + '"';
    axios.get('/orders.json' + queryParams)
      .then(res => {
        const fetchOrders = [];
        for (let key in res.data) {
          if (res.data.hasOwnProperty(key)) { /* eslint-disable-line */
            fetchOrders.push({ ...res.data[key], id: key });
          }
        }
        dispatch(fetchOrderSuccess(fetchOrders));
      })
      .catch(err => {
        dispatch(fetchOrderFail(err));
      });
  };
};
