import * as actionTypes from './actionTypes';
import axios from '../../axios-orders';


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

export const purchaseBurgerStart = orderData => {
  return dispatch => {
    axios.post('/orders.json', orderData)
      .then(response => {
        dispatch(purchaseBurgerSuccess(response.data, orderData));
      })
      .catch(err => {
        dispatch(purchaseBurgerFail(err));
      });
  };
};
