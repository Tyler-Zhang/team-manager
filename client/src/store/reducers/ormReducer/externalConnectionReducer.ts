import * as _ from 'lodash';
import { AnyAction } from 'redux';
import { getType } from 'typesafe-actions';
import { orm } from '../../../models';
import { OrmActions } from './ormReducer';

export default function organizationReducer(state: any, action: AnyAction) {
  const sess = orm.session(state);
  const { ExternalConnection } = sess;

  switch(action.type) {
    case getType(OrmActions.loadEntities): {
      const externalConnectionEntities = _.get(action, 'payload.entities.externalConnections');

      if (externalConnectionEntities) {
        const externalConnections = Object.values(externalConnectionEntities);
        externalConnections.forEach(externalConnection => ExternalConnection.upsert(externalConnection));
      }
      break;
    }
  }

  return sess.state;
}
