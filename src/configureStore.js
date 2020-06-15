import { applyMiddleware, createStore } from 'redux';
import thunkMiddleware from 'redux-thunk';
import { composeWithDevTools } from 'redux-devtools-extension';
import createSagaMiddleware from 'redux-saga';

import { rootReducer } from './store/reducers/rootReducer';
import { loggerMiddleware } from './store/middleware/loggerMiddleware';
import { watchAuth } from './store/sagas/index';

export default function configureStore(preloadedState) {
  const sagaMiddleware = createSagaMiddleware();

  const middlewares = [thunkMiddleware, sagaMiddleware];

  if (process.env.NODE_ENV === 'development') {
    middlewares.push(loggerMiddleware);
  }
  const middlewareEnhancer = applyMiddleware(...middlewares);

  const enhancers = [middlewareEnhancer];
  const composedEnhancers = composeWithDevTools(...enhancers);

  const store = createStore(rootReducer, preloadedState, composedEnhancers);

  sagaMiddleware.run(watchAuth);

  return store;
}
