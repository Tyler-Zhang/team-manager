import { Icon, Popconfirm } from 'antd';
import * as React from 'react';
import { ITeam } from '../../../models';

interface IProps {
  onDelete: () => any;
  team: ITeam;
}

const DeleteTeamButton: React.SFC<IProps> = ({
  onDelete,
  team
}) => (
  <Popconfirm
    title={`Delete ${team.name}?`}
    onConfirm={onDelete}
  >
    <Icon type="delete"/>
  </Popconfirm>
)

export default DeleteTeamButton;
