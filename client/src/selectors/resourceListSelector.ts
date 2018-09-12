import { createSelector } from 'redux-orm';
import { orm } from '../models';

export const resourceListSelector = createSelector(
  orm,
  session => {
    return session.Resource.all().toModelArray();
  }
);

export const externalConnectionResourceListSelector = (externalConnectionId: number, ormState: any) => {
  return createSelector(
    orm,
    session => {
      const externalConnection = session.ExternalConnection.withId(externalConnectionId as any);

      return (externalConnection && externalConnection.resources) || [];
    }
  )(ormState);
}

export const teamEnabledResourceListSelector = (teamId: number, ormState: any) => {
  return createSelector(
    orm,
    session => {
      const team = session.Team.withId(teamId as any);

      if (!team) {
        return [];
      }

      return team.resources.toModelArray();
    }
  )(ormState);
}
