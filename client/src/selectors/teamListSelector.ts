/**
 * This selector only returns the model without any associations
 */
import { createSelector } from 'redux-orm';
import { orm } from '../models';

export const teamBareListSelector = createSelector(
  orm,
  session => {
    return session.Team.all().toModelArray();
  }
)

export const teamListSelector = createSelector(
  orm,
  session => {
    const teams = session.Team.all().toModelArray();
    
    return teams.map((teamModel) => ({
      ...teamModel,
      positions: teamModel.positions.toRefArray()
    }));
  }
)
