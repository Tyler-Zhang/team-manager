import { Layout } from 'antd';
import * as React from 'react';
import { connect } from 'react-redux';
import { compose } from 'recompose';
import { IOrganization } from '../../../models';
import { organizationSelector } from '../../../selectors/organizationSelector';
import { IState } from '../../../store';

import spinnerWhileLoading from '../../../compositions/spinnerWhileLoading';
import ExternalConnections from './ExternalConnections/ExternalConnections';
import OrganizationHeader from './OrganizationHeader/OrganizationHeader';

interface IProps {
  organization: IOrganization;
}

class OrganizationScreen extends React.Component<IProps> {
  public render() {
    return (
      <Layout>
        <OrganizationHeader organization={this.props.organization}/>
        
        <Layout.Content>
          <ExternalConnections externalConnections={this.props.organization.externalConnections as any}/>
        </Layout.Content>
      </Layout>
    );
  }
}

export default compose(
  connect((state: IState) => ({
    organization: organizationSelector(state.orm),
  })),
  spinnerWhileLoading(['organization'])
)(OrganizationScreen);
