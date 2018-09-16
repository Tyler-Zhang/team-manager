import { createSelector } from 'redux-orm';
import { orm } from '../models';

export const memberListSelector = createSelector(
  orm,
  session => {
    const members = session.Member.all().toModelArray();

    return members.map(member => ({
      ...member.ref,
      positions: member.positions.toModelArray().map((position: any) => ({
        ...position.ref,
        team: position.team.ref
      }))
    }));
  }
)
