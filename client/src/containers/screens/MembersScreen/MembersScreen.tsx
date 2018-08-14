import { Layout } from 'antd'
import * as React from 'react'
import { connect } from 'react-redux';
import { compose } from 'recompose';
import { bindActionCreators, Dispatch } from 'redux';
import { IMember, OrmModel } from '../../../models';
import { memberListSelector } from '../../../selectors/memberListSelector';
import { IState } from '../../../store';
import { IMemberPayloadDelete, MemberActions } from '../../../store/reducers/membersReducer';

import MembersHeader from './MembersHeader/MembersHeader';
import MembersTable from './MembersTable/MembersTable';

interface IProps {
  queryMembers: () => any;
  deleteMember: (member: IMemberPayloadDelete) => any;
  members: Array<OrmModel<IMember>>;
}

class MembersScreen extends React.Component<IProps, {}> {
  public render () {
    return (
      <Layout>
        <MembersHeader onRefresh={this.props.queryMembers}/>
        <MembersTable
          members={this.props.members}
          onDelete={this.deleteMember}
        />
      </Layout>
    )
  }

  private deleteMember = (id: number) => this.props.deleteMember({ id });
}

export default compose(
  connect((state: IState) => ({
      members: memberListSelector(state.orm),
    }),
    (dispatch: Dispatch) => bindActionCreators({
      queryMembers: MemberActions.membersQuery,
      deleteMember: MemberActions.membersDelete
    }, dispatch)
  )
)(MembersScreen);
