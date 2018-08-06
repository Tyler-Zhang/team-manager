import * as React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';

/**
 * Containers
 */
import CreateOrganizationContainer from '../containers/screens/CreateOrganizationScreen/CreateOrganizationScreen';
import LoginContainer from '../containers/screens/LoginScreen/LoginScreen';
import MembersScreen from '../containers/screens/MembersScreen/MembersScreen';
import TeamsScreen from '../containers/screens/TeamsScreen/TeamsScreen';
import SidebarContainer from '../containers/Sidebar/SidebarContainer';


const AppNavigation = () => (
  <BrowserRouter>
    <Switch>
      <Route exact={true} path="/login" component={LoginContainer}/>
      <Route exact={true} path="/create_organization" component={CreateOrganizationContainer}/>
      <SidebarContainer>
        <Switch>
          <Route exact={true} path="/dashboard/users" component={MembersScreen}/>
          <Route exact={true} path="/dashboard/teams" component={TeamsScreen}/>
        </Switch>
      </SidebarContainer>
    </Switch>
  </BrowserRouter>
)

export default AppNavigation;
