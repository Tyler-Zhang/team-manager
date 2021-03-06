import { schema } from 'normalizr';
import { attr, fk, TableState } from 'redux-orm';
import { ApplicationModel, baseFields, IBaseFields } from './ApplicationModel';
import { IExternalConnection } from './ExternalConnection';

export enum ResourceType {
  Resource = 'Resource',
  GoogleDriveFileResource ='Resource>GoogleDriveFileResource'
}

export interface IResource {
  id: number;
  name: string;
  externalConnection: IExternalConnection;
  type: ResourceType;
  data: any;
  createdAt: string;
  updatedAt: string;
}

export type ResourceModel = IResource & IBaseFields;

export type ResourceState = TableState<ResourceModel>;

export class Resource extends ApplicationModel<IResource, IBaseFields> {
  public static modelName = 'Resource';

  public static fields = {
    ...baseFields,
    id: attr(),
    name: attr(),
    externalConnection: fk('ExternalConnection', 'resources'),
    type: attr(),
    createdAt: attr(),
    updatedAt: attr()
  }
}

export const resourceSchema: schema.Entity = new schema.Entity('resources');

export const resourceListSchema = new schema.Array(resourceSchema);
