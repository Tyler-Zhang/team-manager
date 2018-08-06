import * as _ from 'lodash';
import { AnyAction } from 'redux';
import { getType } from 'typesafe-actions';
import { orm } from '../../../models';
import { IPosition } from '../../../models/Position';
import { OrmActions } from './ormReducer';

export default function positionReducer(state: any, action: AnyAction) {
  const sess = orm.session(state);
  const { Position } = sess;

  switch(action.type) {
    case getType(OrmActions.loadEntities): {
      const positionEntites = _.get(action, 'payload.entities.positions');

      if (positionEntites) {
        const positions = Object.values(positionEntites);
        positions.forEach((position: IPosition) => {
          const createdPosition = Position.upsert(position);
          createdPosition.member = position.memberId;
          createdPosition.team = position.teamId;
        });
      }
    }
  }

  return sess.state;
}
