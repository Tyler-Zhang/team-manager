import { schema } from 'normalizr';
import { attr, fk, TableState } from 'redux-orm';
import { ApplicationModel, baseFields, IBaseFields } from './ApplicationModel';
import { IOrganization } from './Organization';

export enum ExternalConnectionType {
  google = 'ExternalConnection>GoogleExternalConnection'
}

export interface IExternalConnection {
  id: number;
  type: ExternalConnectionType;
  organization: IOrganization;
  createdAt: Date;
  updatedAt: Date;
}

export type ExternalConnectionModel = IExternalConnection & IBaseFields;

export type ExternalConnectionState = TableState<ExternalConnectionModel>;

export class ExternalConnection extends ApplicationModel<IExternalConnection, IBaseFields> {
  public static modelName = 'ExternalConnection';

  public static fields = {
    ...baseFields,
    id: attr(),
    type: attr(),
    organization: fk('Organization', 'externalConnections'),
    createdAt: attr(),
    updatedAt: attr()
  }
}

export const ExternalConnectionSchema: schema.Entity = new schema.Entity('externalConnections');

export const ExternalConnectionListSchema = new schema.Array(ExternalConnectionSchema);
