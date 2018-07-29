import { Action } from 'redux';
import { orm } from '../../../models';
import memberReducer  from './memberReducer';

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
