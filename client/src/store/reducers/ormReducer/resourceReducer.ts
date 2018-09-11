import * as _ from 'lodash';
import { AnyAction } from 'redux';
import { getType } from 'typesafe-actions';
import { orm } from '../../../models';
import { OrmActions } from './ormReducer';

export default function resourceReducer(state: any, action: AnyAction) {
  const sess = orm.session(state);
  const { Resource } = sess;

  switch(action.type) {
    case getType(OrmActions.loadEntities): {
      const resourceEntites = _.get(action, 'payload.entities.resources');

      if (resourceEntites) {
        const resources = Object.values(resourceEntites);
        resources.forEach(resource => Resource.upsert(resource));
      }
      break;
    }
  }

  return sess.state;
}
