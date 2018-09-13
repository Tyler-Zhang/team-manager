import { Layout } from 'antd';
import * as React from 'react';
import { connect } from 'react-redux';
import { compose } from 'recompose';
import { IOrganization } from '../../../models';
import { organizationSelector } from '../../../selectors/organizationSelector';
import { IStore } from '../../../store';

import CenterInPage from '../../../components/CenterInPage/CenterInPage';
import spinnerWhileLoading from '../../../compositions/spinnerWhileLoading';
import ExternalConnections from './ExternalConnections/ExternalConnections';
import OrganizationHeader from './OrganizationHeader/OrganizationHeader';

interface IProps {
  organization: IOrganization;
}

class OrganizationScreen extends React.Component<IProps> {
  public render() {
    console.log(this.props.organization);
    return (
      <Layout>
        <OrganizationHeader organization={this.props.organization}/>
        
        <Layout.Content style={{ padding: 24 }}>
          <CenterInPage width={8}>
            <ExternalConnections externalConnections={this.props.organization.externalConnections as any}/>
          </CenterInPage>
        </Layout.Content>
      </Layout>
    );
  }
}

export default compose(
  connect((state: IStore) => ({
    organization: organizationSelector(state.orm),
  })),
  spinnerWhileLoading(['organization'])
)(OrganizationScreen);
