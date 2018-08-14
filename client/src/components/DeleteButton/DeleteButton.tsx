import { Icon, Popconfirm } from 'antd';
import * as React from 'react';

interface IProps {
  loading?: boolean;
  message: string;
  onDelete: () => any;
}

const DeleteButton: React.SFC<IProps> = ({
  loading,
  message,
  onDelete
}) => (
  loading ?
    <Icon type="loading" />
    :
    <Popconfirm
      title={message}
      onConfirm={onDelete}
    >
      <Icon type="delete"/>
    </Popconfirm>
)

export default DeleteButton;
