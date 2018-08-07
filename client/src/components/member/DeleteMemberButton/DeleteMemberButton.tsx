import { Icon, Popconfirm } from 'antd';
import * as React from 'react';
import { IMember } from '../../../models';

interface IProps {
  onDelete: () => any;
  member: IMember;
}

const DeleteMemberButton: React.SFC<IProps> = ({
  onDelete,
  member
}) => (
  <Popconfirm
    title={`Delete ${member.firstName} ${member.lastName}?`}
    onConfirm={onDelete}
  >
    <Icon type="delete"/>
  </Popconfirm>
)

export default DeleteMemberButton;
