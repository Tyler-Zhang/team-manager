import { Button, Modal } from 'antd'
import { normalize } from 'normalizr';
import * as React from 'react'
import { connect } from 'react-redux';
import { compose } from 'recompose';
import { bindActionCreators } from 'redux';
import AddMemberForm from '../../../components/member/AddMemberForm/AddMemberForm';
import { IAlertProps, withAlertContext } from '../../../compositions';
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
  loading: boolean;
}

class AddMemberButton extends React.Component<IProps & IAlertProps, IState> {
  public state = {
    visible: false,
    loading: false
  }

  private formRef = React.createRef<any>();

  public render () {
    return (
      <div>
        <Button
          icon="plus"
          type="primary"
          onClick={this.showModal}
        >Add Member
        </Button>
        <Modal
          visible={this.state.visible}
          footer={null}
          onCancel={this.hideModal}
        >
          <br/>
          <AddMemberForm
            ref={this.formRef}
            teams={this.props.teams}
            onCreate={this.onCreate}
            loading={this.state.loading}
          />
        </Modal>
      </div>
    )
  }
  private hideModal = () => this.setState({ visible: false })

  private showModal = () => this.setState({ visible: true })

  private onCreate = async (protoMember: ProtoModel<IMember>) => {
    this.setState({ loading: true });
    try {
      const response = await MemberService.create(protoMember);
      const { entities } = normalize(response.data, memberSchema);
      this.props.loadEntities({ entities });

      this.props.alert.success('Member created');
      this.formRef.current.resetFields();
    } catch (e) {
      this.props.alert.error(e);
    } finally {
      this.setState({ loading: false });
    }
  }
}

const mapStateToProps = (state: any) => ({
  teams: teamBareListSelector(state.orm)
});

const mapDispatchToProps = (dispatch: any) => bindActionCreators({
  loadEntities: OrmActions.loadEntities
}, dispatch);

export default compose(
  connect(mapStateToProps, mapDispatchToProps),
  withAlertContext
)(AddMemberButton);
