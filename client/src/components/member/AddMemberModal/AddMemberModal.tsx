import { Button, Modal } from 'antd'
import * as React from 'react'
import { IMember, ITeam, ProtoModel } from '../../../models';
import AddMemberForm from '../AddMemberForm/AddMemberForm';

interface IProps {
  teams: ITeam[];
  onCreate: (member: ProtoModel<IMember>) => any
}

interface IState {
  visible: boolean;
}

export default class AddMemberModal extends React.Component<IProps, IState> {
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
        >Add Member
        </Button>
        <Modal
          visible={this.state.visible}
          footer={null}
          onCancel={this.hideModal}
        >
          <br/>
          <AddMemberForm
            teams={this.props.teams}
            onCreate={this.props.onCreate}
          />
        </Modal>
      </div>
    )
  }

  private hideModal = () => this.setState({ visible: false })

  private showModal = () => this.setState({ visible: true })
}
