import { Popconfirm, Tag as AntTag } from 'antd';
import * as React from 'react';
import { IPosition } from '../../../models/Position';

interface IProps {
  position: IPosition;
  display?: 'team' | 'member';
  deleteable?: boolean;
  onDelete?: () => any;
}

interface IState {
  showConfirm: boolean;
}

export default class PositionTag extends React.PureComponent<IProps, IState> {
  public static defaultProps: Partial<IProps> = {
    display: 'team',
    deleteable: false
  };

  public state: IState = {
    showConfirm: false
  };

  public render() {
    return (
      <Popconfirm
        title={`Delete ${this.displayName}?`}
        visible={this.state.showConfirm}
        onConfirm={this.props.onDelete}
        onCancel={this.closeConfirmation}
      >
        <AntTag
          closable={this.props.deleteable}
          onClose={this.openConfirmation}
        > {this.displayName}
        </AntTag>
      </Popconfirm>
    );
  }

  private openConfirmation = (e: any) => {
    e.preventDefault();
    this.setState({ showConfirm: true });
  }

  private closeConfirmation = () => {
    this.setState({ showConfirm: false });
  }

  private get displayName() {
    return this.props.display === 'team'?
      this.props.position.team.name :
      this.props.position.member.firstName;
  }
}
