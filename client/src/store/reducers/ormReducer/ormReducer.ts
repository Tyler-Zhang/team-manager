import { Action } from 'redux';
import { createAction } from 'typesafe-actions';
import { orm } from '../../../models';
import memberReducer  from './memberReducer';

export interface IOrmPayloadLoadEntities {
  entities: any;
}

const Actions = {
  loadEntities: createAction('orm/LOAD_ENTITIES',
    (resolve) => (payload: IOrmPayloadLoadEntities) => resolve(payload))
}

export const OrmActions = Actions;

const ormReducers = [
  memberReducer
]

export default function ormReducer(state: any = orm.getEmptyState(), action: Action) {
  const newState = ormReducers.reduce(
    (currState, currOrmReducer) => currOrmReducer(currState, action),
    state
  );

  return newState;
}
