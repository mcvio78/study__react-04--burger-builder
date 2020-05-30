import * as actionTypes from '../actions/actionTypes';
import { updateObject } from '../utility';

const initialState = {
  orders: [],
  loading: false,
  error: false,
  purchased: false
};

const orderReducer = (state = initialState, action) => {
  switch (action.type) {

    case actionTypes.PURCHASE_INIT:
      return updateObject(state, { purchased: false });

    case actionTypes.PURCHASE_BURGER_START:
      return updateObject(state, { loading: true });

    case actionTypes.PURCHASE_BURGER_SUCCESS: {
      const newOrder = updateObject(action.orderData, { id: action.orderId });

      const stateUpdatedProperties = {
        loading: false,
        orders: state.orders.concat(newOrder),
        purchased: true
      };
      return updateObject(state, stateUpdatedProperties);
    }

    case actionTypes.PURCHASE_BURGER_FAIL: {
      const stateUpdatedProperties = {
        loading: false,
        error: true
      };
      return updateObject(state, stateUpdatedProperties);
    }

    case actionTypes.FETCH_ORDER_START: {
      return updateObject(state, { loading: true });
    }

    case actionTypes.FETCH_ORDER_SUCCESS:{
      const stateUpdatedProperties = {
        orders: action.orders,
        loading: false
      };
      return updateObject(state, stateUpdatedProperties);
    }

    case actionTypes.FETCH_ORDER_FAIL:{
      const stateUpdatedProperties = {
        error: true,
        loading: false
      };
      return updateObject(state, stateUpdatedProperties);
    }

    default:
      return state;
  }
};

export default orderReducer;
