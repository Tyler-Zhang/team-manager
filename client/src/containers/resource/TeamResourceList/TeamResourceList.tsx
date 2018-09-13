import * as _ from 'lodash';
import * as React from 'react';
import { connect } from 'react-redux';
import { compose } from 'recompose';
import { Dispatch } from 'redux';
import ResourceCardList from '../../../components/resource/ResourceCardList/ResourceCardList';
import { IResource, ITeam } from '../../../models';
import { resourceListSelector, teamEnabledResourceListSelector } from '../../../selectors/resourceListSelector';
import { IStore } from '../../../store';
import { ITeamPatchPayload, TeamActions } from '../../../store/reducers/teamsReducer';

interface IOuterProps {
  team: ITeam; 
}

interface IProps extends IOuterProps {
  resources: IResource[];
  teamEnabledResources: IResource[];
  patchTeam: (payload: ITeamPatchPayload) => any;
}

class TeamResourceList extends React.Component<IProps> {
  public render() {
    return (
      <ResourceCardList
        selectable={true}
        selected={this.teamEnabledResourceIds}
        resources={this.props.resources}
        onSubmit={this.updateResources}
      />
    );
  }

  private get teamEnabledResourceIds() {
    return this.props.teamEnabledResources.map(resource => resource.id);
  }

  private updateResources = (resourceIds: number[]) => {
    const resourceIdsMap = _.keyBy(resourceIds);

    const resources = this.props.resources.filter((resource) => {
      return _.has(resourceIdsMap, resource.id);
    });

    // We should only send the resource ids
    const resourcesWithOnlyIds = resources.map(resource => ({ id: resource.id }));

    this.props.patchTeam({ id: this.props.team.id, resources: resourcesWithOnlyIds as any });
  }
}

export default compose<IProps, IOuterProps>(
  connect((state: IStore, props: IOuterProps) => ({
    resources: resourceListSelector(state.orm),
    teamEnabledResources: teamEnabledResourceListSelector(props.team.id, state.orm)
  }), (dispatch: Dispatch) => ({
    patchTeam: (team: ITeamPatchPayload) => dispatch(TeamActions.teamsPatch(team))
  }))
)(TeamResourceList);
