import { Card, Layout } from 'antd'
import * as React from 'react'
import { connect } from 'react-redux';
import { compose } from 'recompose';
import { bindActionCreators, Dispatch } from 'redux';
import { ITeam, OrmModel } from '../../../models';
import { IStore } from '../../../store';
import { ITeamPayload, ITeamPayloadCreate, TeamActions } from '../../../store/reducers/teamsReducer';

import { Flex } from 'reflexbox';
import { teamBareListSelector } from '../../../selectors/teamBareListSelector';
import TeamSettings from '../../team/TeamSettings/TeamSettings';
import TeamsHeader from './TeamsHeader/TeamsHeader';
import TeamsTable from './TeamsTable/TeamsTable';

interface IProps {
  queryTeams: () => any;
  createTeam: (member: ITeamPayloadCreate) => any;
  deleteTeam: (payload: ITeamPayload) => any;
  teams: Array<OrmModel<ITeam>>;
}

interface IState {
  selectedTeam: ITeam | null;
}

class TeamsScreen extends React.Component<IProps, IState> {
  public state: IState = {
    selectedTeam: null
  };

  public render () {
    return (
      <Layout>
        <TeamsHeader onRefresh={this.props.queryTeams}/>

        <Flex>
          <Flex w={1}>
            <TeamsTable
              teams={this.props.teams}
              onDelete={this.deleteTeam}
              onSelect={this.selectTeam}
            />
          </Flex>
          {
            this.state.selectedTeam &&
            <Flex w={0.4}>
              <Card title="Team settings" style={{flex:1}}>
                <TeamSettings
                  team={this.state.selectedTeam}
                />
              </Card>
            </Flex>
          }
        </Flex>
      </Layout>
    )
  }

  private selectTeam = (team: ITeam) => {
    this.setState({ selectedTeam: team });
  }

  private deleteTeam = (id: number) => this.props.deleteTeam({ id });
}

export default compose(
  connect((state: IStore) => ({
      teams: teamBareListSelector(state.orm)
    }),
    (dispatch: Dispatch) => bindActionCreators({
      queryTeams: TeamActions.teamsQuery,
      deleteTeam: TeamActions.teamsDelete
    }, dispatch)
  )
)(TeamsScreen);
