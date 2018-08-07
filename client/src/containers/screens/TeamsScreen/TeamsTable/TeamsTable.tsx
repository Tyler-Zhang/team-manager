import { Table } from 'antd';
import * as React from 'react';
import DeleteTeamButton from '../../../../components/team/DeleteTeamButton/DeleteMemberButton';
import { ITeam } from '../../../../models';

interface IProps {
  teams: ITeam[];
  onDelete: (id: number) => any;
}

export default class MembersTable extends React.PureComponent<IProps> {
  public columns = [{
    title: 'Delete',
    dataIndex: 'id',
    key: 'delete',
    render: (id: number, team: ITeam) => (
      <DeleteTeamButton
        onDelete={this.onDeleteFactory(id)}
        team={team}
      />
    ),
    width: 80
  }, {
    title: 'Name',
    dataIndex: 'name',
    key: 'name'
  }]

  public render() {
    return (
    <Table
      columns={this.columns}
      dataSource={this.props.teams} />
    );
  }

  private onDeleteFactory = (id: number) => () => this.props.onDelete(id);
}

