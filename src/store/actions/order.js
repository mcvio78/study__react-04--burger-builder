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
