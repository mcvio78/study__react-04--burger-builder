import React from 'react';
import ReactDOM from 'react-dom';
import { createStore, applyMiddleware, compose, combineReducers } from 'redux';
import { Provider } from 'react-redux';
import thunk from 'redux-thunk';

import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';
import { BrowserRouter } from 'react-router-dom';
import burgerBuilderReducer from './store/reducers/burgerBuilder';
import orderReducer from './store/reducers/order';
import authReducer from './store/reducers/authentication';

const logger = store => {
  return next => {
    return action => {
      //console.log('[Middleware] before state', store.getState());
      //console.log('[Middleware] Dispatching', action);
      const result = next(action);
      //console.log('[Middleware] next state', store.getState());
      return result;
    };
  };
};

// eslint-disable-next-line
const composeEnhancers = (typeof window !== 'undefined' && window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__) || compose;

const rootReducer = combineReducers({
  brgBld: burgerBuilderReducer,
  ord: orderReducer,
  auth: authReducer
});

const store = createStore(
  rootReducer, /* preloadedState, */
  composeEnhancers(applyMiddleware(logger, thunk))
);

const app = (
  <React.StrictMode>
    <Provider store={store}>
      <BrowserRouter>
        <App/>
      </BrowserRouter>
    </Provider>
  </React.StrictMode>
);

ReactDOM.render(app, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
