import * as React from 'react';
import { connect } from 'react-redux';
import { compose } from 'recompose';
import { Dispatch } from 'redux';
import PositionTag from '../../../components/position/PositionTag/PositionTag';
import { IMember } from '../../../models';
import { PositionActions } from '../../../store/reducers/positionsReducer';

interface IOuterProps {
  member: IMember;
}

interface IProps extends IOuterProps {
  deletePosition: (positionId: number) => any;
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
      </div>
    );
  }

  private deletePositionFactory(positionId: number) {
    return () => this.props.deletePosition(positionId);
  }
}

export default compose<IProps, IOuterProps>(
  connect(
    () => ({}),
    (dispatch: Dispatch) => ({
      deletePosition: (positionId: number) => dispatch(PositionActions.positionsDelete({ id: positionId }))
    })
  )
)(PositionTags);
