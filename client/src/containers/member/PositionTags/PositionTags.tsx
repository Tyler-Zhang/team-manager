import * as _ from 'lodash';
import * as React from 'react';
import { connect } from 'react-redux';
import { compose } from 'recompose';
import { Dispatch } from 'redux';
import { IMember, ITeam, positionSchema } from '../../../models';
import { teamBareListSelector } from '../../../selectors/teamListSelector';
import { PositionService } from '../../../services';
import { IStore } from '../../../store';
import { PositionActions } from '../../../store/reducers/positionsReducer';

import { normalize } from 'normalizr';
import AddTeamTag from '../../../components/position/AddTeamTag/AddTeamTag';
import PositionTag from '../../../components/position/PositionTag/PositionTag';
import { OrmActions } from '../../../store/reducers/ormReducer/ormReducer';

interface IOuterProps {
  member: IMember;
}

interface IProps extends IOuterProps {
  teams: ITeam[];
  deletePosition: (positionId: number) => any;
  loadEntities: (a: { entities: any }) => any;
}

class PositionTags extends React.Component<IProps> {
  public render() {
    return (
      <div>
        {
          this.props.member.positions!.map((position) => (
            <PositionTag
              key={position.id}
              position={position}
              deleteable={true}
              onDelete={this.deletePositionFactory(position.id)}
            />
          ))
        }
        
        <AddTeamTag
          teams={this.addeableTeams}
          onAdd={this.addTeamAsPosition}
        />
      </div>
    );
  }

  private deletePositionFactory(positionId: number) {
    return () => this.props.deletePosition(positionId);
  }

  private addTeamAsPosition = async (team: ITeam) => {
    const position = {
      memberId: this.props.member.id,
      teamId: team.id
    };

    const response = await PositionService.create(position as any);
    const { entities } = normalize(response.data, positionSchema);
    this.props.loadEntities({ entities });
  }

  /**
   * Basically any team that the member is currently
   * not a part of
   */
  private get addeableTeams() {
    const currentTeamIdMap = _.keyBy(this.props.member.positions, 'teamId');

    return this.props.teams.filter(({ id }) => !_.has(currentTeamIdMap, id));
  }
}

export default compose<IProps, IOuterProps>(
  connect(
    (state: IStore) => ({
      teams: teamBareListSelector(state.orm)
    }),
    (dispatch: Dispatch) => ({
      deletePosition: (positionId: number) => dispatch(PositionActions.positionsDelete({ id: positionId })),
      loadEntities: (payload: any) => dispatch(OrmActions.loadEntities(payload))
    })
  )
)(PositionTags);
