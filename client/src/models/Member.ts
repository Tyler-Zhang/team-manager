import { schema } from 'normalizr';
import { attr, TableState } from 'redux-orm';
import { ApplicationModel, baseFields, IBaseFields } from './ApplicationModel';
import { IPosition, positionSchema } from './Position';

export enum Authority {
  member = 'member',
  admin = 'admin'
}

export interface IMember {
  id: number;
  authority: Authority;
  firstName: string;
  lastName: string;
  email: string;
  phoneNumber: string;
  password?: string;
  positions?: IPosition[]
}

export type MemberModel = IMember & IBaseFields;

export type MemberState = TableState<MemberModel>;

export class Member extends ApplicationModel<IMember, IBaseFields> {
  public static modelName = 'Member';

  public static fields = {
    ...baseFields,
    id: attr(),
    authority: attr(),
    firstName: attr(),
    lastName: attr(),
    email: attr(),
    phoneNumber: attr()
  }
}

export const memberSchema: schema.Entity = new schema.Entity('members', {
  positions: new schema.Array(positionSchema)
});

export const memberListSchema = new schema.Array(memberSchema);
