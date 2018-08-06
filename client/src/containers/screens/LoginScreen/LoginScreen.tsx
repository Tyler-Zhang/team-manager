import * as React from 'react';
import { connect } from 'react-redux';
import { RouteComponentProps, withRouter } from 'react-router';
import { compose } from 'recompose';
import { Dispatch } from 'redux';
import CenterInPage from '../../../components/CenterInPage/CenterInPage';
import { IAlertProps, withAlertContext } from '../../../compositions';
import { AuthenticationService } from '../../../services';
import { AuthActions, IAuthPayloadSuccess } from '../../../store/reducers/authReducer';
import LoginForm from './LoginForm/LoginForm';

interface IProps {
  loginSuccess: (params: IAuthPayloadSuccess) => any;
}

class LoginScreen extends React.Component<IProps & IAlertProps & RouteComponentProps<{}>> {
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
      this.props.loginSuccess(response.data);
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
    loginSuccess: (params: IAuthPayloadSuccess) => dispatch(AuthActions.authSuccess(params))
  }))
)(LoginScreen);
