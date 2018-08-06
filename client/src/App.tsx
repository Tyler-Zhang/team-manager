import * as React from 'react';
import { Provider } from 'react-redux';
import './App.css';

import AppNavigation from './navigation/AppNavigation';
import { store } from './store';
import { StartupActions } from './store/reducers/startupReducer';

class App extends React.Component {
  public componentWillMount() {
    store.dispatch(StartupActions.initialLoad());
  }

  public render() {
    return (
      <Provider store={store}>
        <AppNavigation/>
      </Provider>
    );
  }
}

export default App;
