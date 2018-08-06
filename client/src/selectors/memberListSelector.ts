import { createSelector } from 'redux-orm';
import { orm } from '../models';

export const memberListSelector = createSelector(
  orm,
  session => {
    return session.Member.all().toModelArray();
  }
)
