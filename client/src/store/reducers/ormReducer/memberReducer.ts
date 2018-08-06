import * as _ from 'lodash';
import { AnyAction } from 'redux';
import { getType } from 'typesafe-actions';
import { orm } from '../../../models';
import { OrmActions } from './ormReducer';

export default function memberReducer(state: any, action: AnyAction) {
  const sess = orm.session(state);
  const { Member } = sess;

  switch(action.type) {
    case getType(OrmActions.loadEntities): {
      const memberEntites = _.get(action, 'payload.entities.members');

      if (memberEntites) {
        const members = Object.values(memberEntites);
        members.forEach(member => Member.upsert(member));
      }
    }
  }

  return sess.state;
}
