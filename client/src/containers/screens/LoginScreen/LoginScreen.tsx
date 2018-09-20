import * as React from 'react';
import { connect } from 'react-redux';
import { RouteComponentProps, withRouter } from 'react-router';
import { compose } from 'recompose';
import { Dispatch } from 'redux';
import { IAlertProps, withAlertContext } from '../../../compositions';
import { AuthenticationService } from '../../../services';
import { AuthActions, IAuthPayloadSuccess } from '../../../store/reducers/authReducer';
import LoginForm from './LoginForm/LoginForm';

import './LoginScreen.css';

interface IProps {
  authSuccess: (params: IAuthPayloadSuccess) => any;
}

class LoginScreen extends React.Component<IProps & IAlertProps & RouteComponentProps<{}>> {
  public render() {
    return (
      <div className="login-screen">
        <div className="login-form-container shadowed">
          <LoginForm
            onSubmit={this.onSubmit}/>
        </div>
      </div>
    )
  }

  public onSubmit = async (params: AuthenticationService.ILoginParams) => {
    try {
      const response = await AuthenticationService.login(params);
      this.props.authSuccess(response.data);
      this.props.history.push('/dashboard');
    } catch (e) {
      this.props.alert.error(e);
    }
  }
}

export default compose(
  withAlertContext,
  withRouter,
  connect(null, (dispatch: Dispatch) => ({
    authSuccess: (params: IAuthPayloadSuccess) => dispatch(AuthActions.authSuccess(params))
  }))
)(LoginScreen);
