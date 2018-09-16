import { Table } from 'antd';
import * as React from 'react';
import { IMember, ITeam, OrmModel } from '../../../../models';

import DeleteButton from '../../../../components/DeleteButton/DeleteButton';
import PositionTags from '../../../member/PositionTags/PositionTags';

interface IProps {
  members: Array<OrmModel<IMember>>;
  onDelete: (id: number) => any;
}

export default class MembersTable extends React.PureComponent<IProps> {
  public columns = [{
    title: 'Delete',
    dataIndex: 'id',
    key: 'delete',
    render: (id: number, member: OrmModel<IMember>) => (
      <DeleteButton
        message={`Delete ${member.firstName} ${member.lastName}?`}
        loading={member.isDeleting}
        onDelete={this.onDeleteFactory(id)}
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
  }, {
    title: 'Teams',
    dataIndex: 'teams',
    key: 'teams',
    render: (teams: ITeam[], member: IMember) => (
      <PositionTags member={member}/>
    )
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

