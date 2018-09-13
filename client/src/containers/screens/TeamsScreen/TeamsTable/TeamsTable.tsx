import { Table } from 'antd';
import * as React from 'react';
import DeleteButton from '../../../../components/DeleteButton/DeleteButton';
import { ITeam, OrmModel } from '../../../../models';

interface IProps {
  teams: Array<OrmModel<ITeam>>;
  onDelete: (id: number) => any;
  onSelect?: (team: ITeam) => any;
}

export default class MembersTable extends React.PureComponent<IProps> {
  public columns = [{
    title: 'Delete',
    dataIndex: 'id',
    key: 'delete',
    render: (id: number, team: OrmModel<ITeam>) => (
      <DeleteButton
        message={`Delete ${team.name}?`}
        loading={team.isDeleting}
        onDelete={this.onDeleteFactory(id)}
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
      style={{ flex: 1 }}
      columns={this.columns}
      dataSource={this.props.teams}
      onRowClick={this.props.onSelect}
    />
    );
  }

  private onDeleteFactory = (id: number) => () => this.props.onDelete(id);
}

