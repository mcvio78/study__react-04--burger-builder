export const loggerMiddleware = store => {
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
