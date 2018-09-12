import * as React from 'react';
import { connect } from 'react-redux';
import { compose } from 'recompose';
import ResourceCardList from '../../../components/resource/ResourceCardList/ResourceCardList';
import { IResource, ITeam } from '../../../models';
import { resourceListSelector, teamEnabledResourceListSelector } from '../../../selectors/resourceListSelector';
import { IState } from '../../../store';

interface IOuterProps {
  team: ITeam;
}

interface IProps extends IOuterProps {
  resources: IResource[];
}

class TeamResourceList extends React.Component<IProps> {
  public render() {
    return (
      <ResourceCardList
        selectable={true}
        selected={this.teamEnabledResourceIds}
        resources={this.props.resources}
      />
    );
  }

  private get teamEnabledResourceIds() {
    return this.props.resources.map(resource => resource.id);
  }
}

export default compose<IProps, IOuterProps>(
  connect((state: IState, props: IOuterProps) => ({
    resources: resourceListSelector(state.orm),
    teamEnabledResources: teamEnabledResourceListSelector(props.team.id, state.orm)
  }))
)(TeamResourceList);
