import { Action } from 'redux';
import { createAction } from 'typesafe-actions';
import { orm } from '../../../models';

import externalConnectionReducer from './externalConnectionReducer';
import memberReducer  from './memberReducer';
import organizationReducer from './organizationReducer';
import positionReducer from './positionReducer';
import resourceReducer from './resourceReducer';
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
  organizationReducer,
  externalConnectionReducer,
  memberReducer,
  teamReducer,
  positionReducer,
  resourceReducer
]

export default function ormReducer(state: any = orm.getEmptyState(), action: Action) {
  const newState = ormReducers.reduce(
    (currState, currOrmReducer) => currOrmReducer(currState, action),
    state
  );

  return newState;
}
