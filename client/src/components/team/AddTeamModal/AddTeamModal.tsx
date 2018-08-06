import { Button, Modal } from 'antd'
import * as React from 'react'
import { IMember, ITeam, ProtoModel } from '../../../models';
import AddTeamForm from '../AddTeamForm/AddTeamForm';

interface IProps {
  members: IMember[];
  onCreate: (member: ProtoModel<ITeam>) => any
}

interface IState {
  visible: boolean;
}

export default class AddTeamModal extends React.Component<IProps, IState> {
  public state = {
    visible: false
  }

  public render () {
    return (
      <div>
        <Button
          icon="plus"
          onClick={this.showModal}
          type="primary"
        >Create Team
        </Button>
        <Modal
          visible={this.state.visible}
          footer={null}
          onCancel={this.hideModal}
        >
          <br/>
          <AddTeamForm
            members={this.props.members}
            onCreate={this.props.onCreate}
          />
        </Modal>
      </div>
    )
  }

  private hideModal = () => this.setState({ visible: false })

  private showModal = () => this.setState({ visible: true })
}
