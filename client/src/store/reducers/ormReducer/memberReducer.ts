import { Action } from 'redux';
import { orm } from '../../../models';

export default function memberReducer(state: any, action: Action) {
  const sess = orm.session(state);

  return sess.state;
}
