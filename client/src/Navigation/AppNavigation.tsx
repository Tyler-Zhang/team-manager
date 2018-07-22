import * as React from 'react';
import { BrowserRouter, Route } from 'react-router-dom';

/**
 * Containers
 */
import LoginContainer from '../Containers/Login/LoginContainer';


const AppNavigation = () => (
  <BrowserRouter>
    <Route exact={true} path="/login" component={LoginContainer}/>
  </BrowserRouter>
)

export default AppNavigation;
