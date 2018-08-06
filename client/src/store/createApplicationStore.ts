import { connectRouter, routerMiddleware } from 'connected-react-router';
import { createBrowserHistory } from 'history';
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

  /**
   * connected-react-router
   */
  const history = createBrowserHistory();
  middlewares.push(routerMiddleware(history));

  /**
   * Creating the store
   */
  enhancers.push(applyMiddleware(...middlewares));

  const store = createStore(
    connectRouter(history)(rootReducer),
    composeWithDevTools(...enhancers)
  )

  sagaMiddleware.run(rootSaga);

  return { store, history };
}
