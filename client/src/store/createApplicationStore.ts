import { applyMiddleware, createStore, Middleware, Reducer, StoreEnhancer } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';

export const createApplicationStore = (rootReducer: Reducer<any>) => {
  const enhancers: StoreEnhancer[] = [];
  const middleware: Middleware[] = [];

  enhancers.push(applyMiddleware(...middleware));

  const store = createStore(
    rootReducer,
    composeWithDevTools(...enhancers)
  )

  return store;
}
