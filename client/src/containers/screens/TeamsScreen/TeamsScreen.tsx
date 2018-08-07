import { Layout } from 'antd'
import * as React from 'react'
import { connect } from 'react-redux';
import { compose } from 'recompose';
import { bindActionCreators, Dispatch } from 'redux';
import { IMember, ITeam, ProtoModel } from '../../../models';
import { memberListSelector } from '../../../selectors/memberListSelector';
import { IState } from '../../../store';
import { ITeamPayloadCreate, ITeamPayloadDelete, TeamActions } from '../../../store/reducers/teamsReducer';

import { teamBareListSelector } from '../../../selectors/teamBareListSelector';
import TeamsHeader from './TeamsHeader/TeamsHeader';
import TeamsTable from './TeamsTable/TeamsTable';

interface IProps {
  queryTeams: () => any;
  createTeam: (member: ITeamPayloadCreate) => any;
  deleteTeam: (payload: ITeamPayloadDelete) => any;
  teams: ITeam[];
  members: IMember[];
}

class TeamsScreen extends React.Component<IProps, {}> {
  public render () {
    return (
      <Layout>
        <TeamsHeader
          onCreate={this.createTeam}
          members={this.props.members}
          onRefresh={this.props.queryTeams}
        />
        <TeamsTable
          teams={this.props.teams}
          onDelete={this.deleteTeam}
        />
      </Layout>
    )
  }

  private createTeam = (team: ProtoModel<ITeam>) => {
    this.props.createTeam({ team });
  }


  private deleteTeam = (id: number) => this.props.deleteTeam({ id });
}

export default compose(
  connect((state: IState) => ({
      members: memberListSelector(state.orm),
      teams: teamBareListSelector(state.orm)
    }),
    (dispatch: Dispatch) => bindActionCreators({
      queryTeams: TeamActions.teamsQuery,
      createTeam: TeamActions.teamsCreate,
      deleteTeam: TeamActions.teamsDelete
    }, dispatch)
  )
)(TeamsScreen);
