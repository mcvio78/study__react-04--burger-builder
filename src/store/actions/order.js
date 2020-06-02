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

export const purchaseBurger = orderData => {
  return dispatch => {
    dispatch(purchaseBurgerStart());
    axios.post('/orders.json', orderData)
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

export const fetchOrders = token => {
  return dispatch => {
    dispatch(fetchOrderStart());
    axios.get('/orders.json?auth=' + token)
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
