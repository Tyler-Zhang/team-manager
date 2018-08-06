import * as _ from 'lodash';
import { AnyAction } from 'redux';
import { getType } from 'typesafe-actions';
import { orm } from '../../../models';
import { OrmActions } from './ormReducer';

export default function teamReducer(state: any, action: AnyAction) {
  const sess = orm.session(state);
  const { Team } = sess;

  switch(action.type) {
    case getType(OrmActions.loadEntities): {
      const teamEntites = _.get(action, 'payload.entities.teams');

      if (teamEntites) {
        const teams = Object.values(teamEntites);
        teams.forEach(team => Team.upsert(team));
      }
    }
  }

  return sess.state;
}
