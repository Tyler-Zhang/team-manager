import { createSelector } from 'redux-orm';
import { orm } from '../models';

export const organizationSelector = createSelector(
  orm,
  session => {
    let organization = session.Organization.all().first();
    
    if (organization) {
      organization = {
        ...organization.ref,
        externalConnections: organization.externalConnections.toRefArray()
      };
    }

    return organization;
  }
);
