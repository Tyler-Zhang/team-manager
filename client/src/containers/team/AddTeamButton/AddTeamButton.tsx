import { Button, Modal } from 'antd'
import { normalize } from 'normalizr';
import * as React from 'react'
import { connect } from 'react-redux';
import { compose } from 'recompose';
import { bindActionCreators } from 'redux';
import AddTeamForm from '../../../components/team/AddTeamForm/AddTeamForm';
import { IAlertProps, withAlertContext } from '../../../compositions';
import { IMember, ITeam, ProtoModel, teamSchema } from '../../../models';
import { memberListSelector } from '../../../selectors/memberListSelector';
import { TeamService } from '../../../services';
import { OrmActions } from '../../../store/reducers/ormReducer/ormReducer';

interface IProps {
  members: IMember[];
  loadEntities: (payload: any) => void;
}

interface IState {
  visible: boolean;
  loading: boolean;
}

class AddTeamButton extends React.Component<IProps & IAlertProps, IState> {
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
        >Add Team
        </Button>
        <Modal
          visible={this.state.visible}
          footer={null}
          onCancel={this.hideModal}
        >
          <br/>
          <AddTeamForm
            ref={this.formRef}
            members={this.props.members}
            onCreate={this.onCreate}
            loading={this.state.loading}
          />
        </Modal>
      </div>
    )
  }
  private hideModal = () => this.setState({ visible: false })

  private showModal = () => this.setState({ visible: true })

  private onCreate = async (protoTeam: ProtoModel<ITeam>) => {
    this.setState({ loading: true });
    try {
      const response = await TeamService.create(protoTeam);
      const { entities } = normalize(response.data, teamSchema);
      this.props.loadEntities({ entities });

      this.props.alert.success('Team created');
      this.formRef.current.resetFields();
    } catch (e) {
      this.props.alert.error(e);
    } finally {
      this.setState({ loading: false });
    }
  }
}

const mapStateToProps = (state: any) => ({
  members: memberListSelector(state.orm)
});

const mapDispatchToProps = (dispatch: any) => bindActionCreators({
  loadEntities: OrmActions.loadEntities
}, dispatch);

export default compose(
  connect(mapStateToProps, mapDispatchToProps),
  withAlertContext
)(AddTeamButton);
