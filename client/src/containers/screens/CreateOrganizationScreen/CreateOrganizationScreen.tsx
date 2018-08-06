import * as React from 'react';

import { RouteComponentProps, withRouter } from 'react-router';
import { compose } from 'recompose';
import CenterInPage from '../../../components/CenterInPage/CenterInPage';
import { withAlertContext } from '../../../compositions';
import { IAlertProps } from '../../../compositions/withAlertContext';
import { IMember, IOrganization, ProtoModel } from '../../../models';
import { OrganizationService } from '../../../services';
import SignupFormComponent from './SignupForm/SignupForm';

interface ICreateOrganizationParams {
  organization: ProtoModel<IOrganization>;
  member: ProtoModel<IMember>;
}

class CreateOrganizationScreen extends React.Component<IAlertProps & RouteComponentProps<{}>> {
  public render() {
    return (
      <CenterInPage width={6}>
        <SignupFormComponent
          onSubmit={this.onSubmit}/>
      </CenterInPage>
    )
  }

  public onSubmit = async (params: ICreateOrganizationParams) => {
    try {
      await OrganizationService.init(params);
      this.props.history.push('/login');
    } catch (e) {
      this.props.alert.error(e);
    }
  }
}

export default compose(
  withAlertContext,
  withRouter
)(CreateOrganizationScreen);
