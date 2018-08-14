import { Layout } from 'antd'
import * as React from 'react'
import { connect } from 'react-redux';
import { compose } from 'recompose';
import { bindActionCreators, Dispatch } from 'redux';
import { ITeam, OrmModel } from '../../../models';
import { IState } from '../../../store';
import { ITeamPayloadCreate, ITeamPayloadDelete, TeamActions } from '../../../store/reducers/teamsReducer';

import { teamBareListSelector } from '../../../selectors/teamBareListSelector';
import TeamsHeader from './TeamsHeader/TeamsHeader';
import TeamsTable from './TeamsTable/TeamsTable';

interface IProps {
  queryTeams: () => any;
  createTeam: (member: ITeamPayloadCreate) => any;
  deleteTeam: (payload: ITeamPayloadDelete) => any;
  teams: Array<OrmModel<ITeam>>;
}

class TeamsScreen extends React.Component<IProps, {}> {
  public render () {
    return (
      <Layout>
        <TeamsHeader onRefresh={this.props.queryTeams}/>
        <TeamsTable
          teams={this.props.teams}
          onDelete={this.deleteTeam}
        />
      </Layout>
    )
  }

  private deleteTeam = (id: number) => this.props.deleteTeam({ id });
}

export default compose(
  connect((state: IState) => ({
      teams: teamBareListSelector(state.orm)
    }),
    (dispatch: Dispatch) => bindActionCreators({
      queryTeams: TeamActions.teamsQuery,
      deleteTeam: TeamActions.teamsDelete
    }, dispatch)
  )
)(TeamsScreen);
