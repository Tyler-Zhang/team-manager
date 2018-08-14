import * as _ from 'lodash';
import { AnyAction } from 'redux';
import { getType } from 'typesafe-actions';
import { orm } from '../../../models';
import { TeamActions } from '../teamsReducer';
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
      break;
    }
    case getType(TeamActions.teamsDelete): {
      Team.withId(action.payload.id).isDeleting = true;
      break;
    }

    case getType(TeamActions.teamsDeleteSuccess): {
      Team.withId(action.payload.id).delete();
      break;
    }

    case getType(TeamActions.teamsDeleteError): {
      Team.withId(action.payload.id).isDeleting = false;
      break;
    }
  }

  return sess.state;
}
