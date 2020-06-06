import { combineReducers } from 'redux';

import burgerBuilderReducer from './burgerBuilder';
import orderReducer from './order';
import authReducer from './authentication';

export const rootReducer = combineReducers({
  brgBld: burgerBuilderReducer,
  ord: orderReducer,
  auth: authReducer
});
