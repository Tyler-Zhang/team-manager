import * as React from 'react';
import { Provider } from 'react-redux';
import './App.css';

import AppNavigation from './navigation/AppNavigation';
import { store } from './store';

class App extends React.Component {
  public render() {
    return (
      <Provider store={store}>
        <AppNavigation/>
      </Provider>
    );
  }
}

export default App;
