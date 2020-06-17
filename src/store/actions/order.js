import * as actionTypes from './actionTypes';

export const purchaseInit = () => {
  return {
    type: actionTypes.PURCHASE_INIT
  };
};

export const purchaseBurgerStart = () => {
  return {
    type: actionTypes.PURCHASE_BURGER_START
  };
};

export const purchaseBurgerSuccess = (id, data) => {
  return {
    type: actionTypes.PURCHASE_BURGER_SUCCESS,
    orderId: id,
    orderData: data
  };
};

export const purchaseBurgerFail = err => {
  return {
    type: actionTypes.PURCHASE_BURGER_FAIL,
    error: err
  };
};

export const purchaseBurger = (orderData, token) => {
  return {
    type: actionTypes.PURCHASE_BURGER_INIT,
    orderData: orderData,
    token: token
  }
};

export const fetchOrderStart = () => {
  return {
    type: actionTypes.FETCH_ORDER_START
  };
};

export const fetchOrderSuccess = fetchedData => {
  return {
    type: actionTypes.FETCH_ORDER_SUCCESS,
    orders: fetchedData
  };
};

export const fetchOrderFail = err => {
  return {
    type: actionTypes.FETCH_ORDER_FAIL,
    error: err
  };
};

export const fetchOrders = (token, userId) => {
  return {
    type: actionTypes.FETCH_ORDER_INIT,
    token: token,
    userId: userId
  }
};
