import { Button, Modal } from 'antd'
import { normalize } from 'normalizr';
import * as React from 'react'
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import AddMemberForm from '../../../components/member/AddMemberForm/AddMemberForm';
import { IMember, ITeam, memberSchema, ProtoModel } from '../../../models';
import { teamBareListSelector } from '../../../selectors/teamBareListSelector';
import { MemberService } from '../../../services';
import { OrmActions } from '../../../store/reducers/ormReducer/ormReducer';

interface IProps {
  teams: ITeam[];
  loadEntities: (payload: any) => void;
}

interface IState {
  visible: boolean;
}

class AddMemberButton extends React.Component<IProps, IState> {
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
            onCreate={this.onCreate}
          />
        </Modal>
      </div>
    )
  }
  private hideModal = () => this.setState({ visible: false })

  private showModal = () => this.setState({ visible: true })

  private onCreate = async (protoMember: ProtoModel<IMember>) => {
    const response = await MemberService.create(protoMember);

    const { entities } = normalize(response.data, memberSchema);

    return this.props.loadEntities({ entities });
  }
}

export default connect((state: any) => ({
    teams: teamBareListSelector(state.orm)
  }),
  (dispatch) => bindActionCreators({
    loadEntities: OrmActions.loadEntities
  }, dispatch)
)(AddMemberButton);
