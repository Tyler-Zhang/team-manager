import * as React from 'react';
import { connect } from 'react-redux';
import { RouteComponentProps, withRouter } from 'react-router';
import { compose } from 'recompose';
import { Dispatch } from 'redux';
import CenterInPage from '../../../components/CenterInPage/CenterInPage';
import { IAlertProps, withAlertContext } from '../../../compositions';
import { AuthenticationService } from '../../../services';
import { AuthActions, IAuthPayloadLoggedIn } from '../../../store/reducers/authReducer';
import LoginForm from './LoginForm/LoginForm';

interface IProps {
  loginAction: (params: IAuthPayloadLoggedIn) => any;
}

class LoginContainer extends React.Component<IProps & IAlertProps & RouteComponentProps<{}>> {
  public render() {
    return (
      <CenterInPage width={4}>
        <LoginForm
          onSubmit={this.onSubmit}/>
      </CenterInPage>
    )
  }

  public onSubmit = async (params: AuthenticationService.ILoginParams) => {
    try {
      const response = await AuthenticationService.login(params);
      this.props.loginAction(response.data);
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
    loginAction: (params: IAuthPayloadLoggedIn) => dispatch(AuthActions.authLoggedIn(params))
  }))
)(LoginContainer);
