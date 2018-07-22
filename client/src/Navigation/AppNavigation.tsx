import * as React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';

/**
 * Containers
 */
import LoginContainer from '../Containers/Login/LoginContainer';
import SidebarContainer from '../Containers/Sidebar/SidebarContainer';
import UsersContainer from '../Containers/Users/UsersContainer';


const AppNavigation = () => (
  <BrowserRouter>
    <Switch>
      <Route exact={true} path="/login" component={LoginContainer}/>
      <SidebarContainer>
        <Switch>
          <Route exact={true} path="/users" component={UsersContainer}/>
        </Switch>
      </SidebarContainer>
    </Switch>
  </BrowserRouter>
)

export default AppNavigation;
