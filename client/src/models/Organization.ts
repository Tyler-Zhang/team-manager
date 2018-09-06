import { schema } from 'normalizr';
import { attr, TableState } from 'redux-orm';
import { ApplicationModel, baseFields, IBaseFields } from './ApplicationModel';
import { ExternalConnectionListSchema } from './ExternalConnection';

export interface IOrganization {
  id: number;
  name: string;
}

export type OrganizationState = TableState<IOrganization & IBaseFields>;

export class Organization extends ApplicationModel<IOrganization, IBaseFields> {
  public static modelName = 'Organization';

  public static fields = {
    ...baseFields,
    id: attr(),
    name: attr()
  }
}

export const OrganizationSchema = new schema.Entity('organizations', {
  externalConnections: ExternalConnectionListSchema
});

export const OrganizationListSchema = new schema.Array(OrganizationSchema);
