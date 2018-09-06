import * as _ from 'lodash';
import { AnyAction } from 'redux';
import { getType } from 'typesafe-actions';
import { orm } from '../../../models';
import { OrmActions } from './ormReducer';

export default function organizationReducer(state: any, action: AnyAction) {
  const sess = orm.session(state);
  const { Organization } = sess;

  switch(action.type) {
    case getType(OrmActions.loadEntities): {
      const organizationEntites = _.get(action, 'payload.entities.organizations');

      if (organizationEntites) {
        const organizations = Object.values(organizationEntites);
        organizations.forEach(organization => Organization.upsert(organization));
      }
      break;
    }
  }

  return sess.state;
}
