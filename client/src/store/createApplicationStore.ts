import { applyMiddleware, createStore, Middleware, Reducer, StoreEnhancer } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import createSagaMiddleware from 'redux-saga';
import rootSaga from './sagas/rootSaga';

export const createApplicationStore = (rootReducer: Reducer<any>) => {
  const enhancers: StoreEnhancer[] = [];
  const middlewares: Middleware[] = [];

  /**
   * Redux saga middleware
   */
  const sagaMiddleware = createSagaMiddleware();
  middlewares.push(sagaMiddleware);

  enhancers.push(applyMiddleware(...middlewares));

  const store = createStore(
    rootReducer,
    composeWithDevTools(...enhancers)
  )

  sagaMiddleware.run(rootSaga);

  return store;
}
