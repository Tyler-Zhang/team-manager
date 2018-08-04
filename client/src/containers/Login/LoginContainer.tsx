import * as React from 'react';
import { RouteComponentProps, withRouter } from 'react-router';
import { compose } from 'recompose';
import { IAlertProps, withAlertContext } from '../../compositions';

import CenterInPage from '../../components/CenterInPage';
import { AuthenticationService } from '../../services';
import { ILoginParams } from '../../services/AuthenticationService';
import LoginForm from './components/LoginForm';

class CreateOrganizationContainer extends React.Component<IAlertProps & RouteComponentProps<{}>> {
  public render() {
    return (
      <CenterInPage width={4}>
        <LoginForm
          onSubmit={this.onSubmit}/>
      </CenterInPage>
    )
  }

  public onSubmit = async (params: ILoginParams) => {
    try {
      await AuthenticationService.login(params);
      this.props.history.push('/dashboard');
    } catch (e) {
      this.props.alert.error(e);
    }
  }
}

export default compose(
  withAlertContext,
  withRouter
)(CreateOrganizationContainer);
