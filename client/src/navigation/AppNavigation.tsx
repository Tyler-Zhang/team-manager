import { ConnectedRouter } from 'connected-react-router';
import * as React from 'react';
import { Route, Switch } from 'react-router-dom';
import { history } from '../store';

/**
 * Containers
 */
import CreateOrganizationContainer from '../containers/screens/CreateOrganizationScreen/CreateOrganizationScreen';
import LoginContainer from '../containers/screens/LoginScreen/LoginScreen';
import MembersScreen from '../containers/screens/MembersScreen/MembersScreen';
import TeamsScreen from '../containers/screens/TeamsScreen/TeamsScreen';
import SidebarContainer from '../containers/Sidebar/SidebarContainer';


const AppNavigation = () => (
  <ConnectedRouter history={history}>
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
  </ConnectedRouter>
)

export default AppNavigation;
