import { Col, Layout, Row } from 'antd';
import * as React from 'react';
import { IOrganization } from '../../../../models';

interface IProps {
  organization: IOrganization;
}

export default class OrganizationHeader extends React.PureComponent<IProps> {
  public render() {
    return (
      <Layout.Header style={{ background: '#fff'}}>
          <Row>
            <Col span={4}><h3> Organization: {this.props.organization.name} </h3></Col>
          </Row>
      </Layout.Header>
    )
  }
}
