import * as React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';

/**
 * Containers
 */
import CreateOrganizationContainer from '../containers/screens/CreateOrganization/CreateOrganizationContainer';
import LoginContainer from '../containers/screens/Login/LoginContainer';
import SidebarContainer from '../containers/screens/Sidebar/SidebarContainer';
import UsersContainer from '../containers/screens/Users/UsersContainer';


const AppNavigation = () => (
  <BrowserRouter>
    <Switch>
      <Route exact={true} path="/login" component={LoginContainer}/>
      <Route exact={true} path="/create_organization" component={CreateOrganizationContainer}/>
      <SidebarContainer>
        <Switch>
          <Route exact={true} path="/dashboard/users" component={UsersContainer}/>
        </Switch>
      </SidebarContainer>
    </Switch>
  </BrowserRouter>
)

export default AppNavigation;
