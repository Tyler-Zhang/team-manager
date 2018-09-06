import { schema } from 'normalizr';
import { attr, TableState } from 'redux-orm';
import { ApplicationModel, baseFields, IBaseFields } from './ApplicationModel';

export enum ExternalConnectionType {
  google = 'GoogleExternalConnection'
}

export interface IExternalConnection {
  id: number;
  type: ExternalConnectionType;
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
    createdAt: attr(),
    updatedAt: attr()
  }
}

export const ExternalConnectionSchema: schema.Entity = new schema.Entity('ExternalConnections');

export const ExternalConnectionListSchema = new schema.Array(ExternalConnectionSchema);
