import { Table } from 'antd';
import * as React from 'react';
import { ITeam } from '../../../../models';

interface IProps {
  teams: ITeam[];
}

export default class MembersTable extends React.PureComponent<IProps> {
  public columns = [{
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
}

