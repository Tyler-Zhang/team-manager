import * as _ from 'lodash';
import { AnyAction } from 'redux';
import { getType } from 'typesafe-actions';
import { orm } from '../../../models';
import { MemberActions } from '../membersReducer';
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
      break;
    }

    case getType(MemberActions.membersDelete): {
      Member.withId(action.payload.id).isDeleting = true;
      break;
    }

    case getType(MemberActions.membersDeleteSuccess): {
      Member.withId(action.payload.id).delete();
      break;
    }

    case getType(MemberActions.membersDeleteCancel): {
      Member.withId(action.payload.id).isDeleting = false;
      break;
    }
  }

  return sess.state;
}
