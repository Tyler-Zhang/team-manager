import { Icon, Popconfirm } from 'antd';
import * as React from 'react';

interface IProps {
  onDelete: () => any;
  message: string;
}

const DeleteButton: React.SFC<IProps> = ({
  onDelete,
  message
}) => (
  <Popconfirm
    title={message}
    onConfirm={onDelete}
  >
    <Icon type="delete"/>
  </Popconfirm>
)

export default DeleteButton;
