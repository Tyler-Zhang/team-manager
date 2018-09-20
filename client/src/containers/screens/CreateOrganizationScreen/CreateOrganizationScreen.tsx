import * as React from 'react';

import { RouteComponentProps, withRouter } from 'react-router';
import { compose } from 'recompose';
import { withAlertContext } from '../../../compositions';
import { IAlertProps } from '../../../compositions/withAlertContext';
import { IMember, IOrganization, ProtoModel } from '../../../models';
import { OrganizationService } from '../../../services';
import SignupFormComponent from './SignupForm/SignupForm';

import './CreateOrganizationScreen.css';

interface ICreateOrganizationParams {
  organization: ProtoModel<IOrganization>;
  member: ProtoModel<IMember>;
}

class CreateOrganizationScreen extends React.Component<IAlertProps & RouteComponentProps<{}>> {
  public render() {
    return (
      <div className="create-organization-screen">
        <div className="signup-form-container shadowed">
          <SignupFormComponent
            onSubmit={this.onSubmit}/>
        </div>
      </div>
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
