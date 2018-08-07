import { Table } from 'antd';
import * as React from 'react';
import { IMember } from '../../../../models';

import DeleteMemberButton from '../../../../components/member/DeleteMemberButton/DeleteMemberButton';

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
      <DeleteMemberButton
        onDelete={this.onDeleteFactory(id)}
        member={member}
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

