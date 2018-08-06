import { Action } from 'redux';
import { createAction } from 'typesafe-actions';
import { orm } from '../../../models';
import memberReducer  from './memberReducer';
import positionReducer from './positionReducer';
import teamReducer from './teamReducer';

export interface IOrmPayloadLoadEntities {
  entities: any;
}

const Actions = {
  loadEntities: createAction('orm/LOAD_ENTITIES',
    (resolve) => (payload: IOrmPayloadLoadEntities) => resolve(payload))
}

export const OrmActions = Actions;

const ormReducers = [
  memberReducer,
  teamReducer,
  positionReducer
]

export default function ormReducer(state: any = orm.getEmptyState(), action: Action) {
  const newState = ormReducers.reduce(
    (currState, currOrmReducer) => currOrmReducer(currState, action),
    state
  );

  return newState;
}
