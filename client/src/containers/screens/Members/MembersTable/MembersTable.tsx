import { Table } from 'antd';
import * as React from 'react';
import { IMember } from '../../../../models';

interface IProps {
  members: IMember[];
}

export default class MembersTable extends React.PureComponent<IProps> {
  public columns = [{
    title: 'First Name',
    dataIndex: 'firstName',
    key: 'firstName'
  }, {
    title: 'Last Name',
    dataIndex: 'lastName',
    key: 'lastName'
  }, {
    title: 'Email',
    dataIndex: 'email',
    key: 'email'
  }]

  public render() {
    return (
    <Table
      columns={this.columns}
      dataSource={this.props.members} />
    );
  }
}

