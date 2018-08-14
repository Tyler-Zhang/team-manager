import { Table } from 'antd';
import * as React from 'react';
import { IMember } from '../../../../models';

import DeleteButton from '../../../../components/DeleteButton/DeleteButton';

interface IProps {
  members: IMember[];
  onDelete: (id: number) => any;
}

export default class MembersTable extends React.PureComponent<IProps> {
  public columns = [{
    title: 'Delete',
    dataIndex: 'id',
    key: 'delete',
    render: (id: number, member: IMember) => (
      <DeleteButton
        onDelete={this.onDeleteFactory(id)}
        message={`Delete ${member.firstName} ${member.lastName}?`}
      />
    ),
    width: 80
  }, {
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

  private onDeleteFactory = (id: number) => () => this.props.onDelete(id);
}

