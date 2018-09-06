import { createSelector } from 'redux-orm';
import { orm } from '../models';

export const organizationSelector = createSelector(
  orm,
  session => {
    return session.Organization.all().first();
  }
)
