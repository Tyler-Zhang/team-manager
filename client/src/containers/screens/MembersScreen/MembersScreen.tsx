import { Layout } from 'antd'
import * as React from 'react'
import { connect } from 'react-redux';
import { compose } from 'recompose';
import { bindActionCreators, Dispatch } from 'redux';
import { IMember, ITeam, ProtoModel } from '../../../models';
import { memberListSelector } from '../../../selectors/memberListSelector';
import { IState } from '../../../store';
import { IMemberPayloadCreate, IMemberPayloadDelete, MemberActions } from '../../../store/reducers/membersReducer';

import { teamBareListSelector } from '../../../selectors/teamBareListSelector';
import MembersHeader from './MembersHeader/MembersHeader';
import MembersTable from './MembersTable/MembersTable';

interface IProps {
  queryMembers: () => any;
  createMember: (member: IMemberPayloadCreate) => any;
  deleteMember: (member: IMemberPayloadDelete) => any;
  members: IMember[];
  teams: ITeam[];
}

class MembersScreen extends React.Component<IProps, {}> {
  public render () {
    return (
      <Layout>
        <MembersHeader
          onCreate={this.createUser}
          teams={this.props.teams}
          onRefresh={this.props.queryMembers}
        />
        <MembersTable
          members={this.props.members}
          onDelete={this.deleteMember}
        />
      </Layout>
    )
  }

  private createUser = (member: ProtoModel<IMember>) => {
    this.props.createMember({ member });
  }

  private deleteMember = (id: number) => this.props.deleteMember({ id });
}

export default compose(
  connect((state: IState) => ({
      members: memberListSelector(state.orm),
      teams: teamBareListSelector(state.orm)
    }),
    (dispatch: Dispatch) => bindActionCreators({
      queryMembers: MemberActions.membersQuery,
      createMember: MemberActions.membersCreate,
      deleteMember: MemberActions.membersDelete
    }, dispatch)
  )
)(MembersScreen);
