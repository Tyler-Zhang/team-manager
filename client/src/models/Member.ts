import { attr, TableState } from 'redux-orm';
import { ApplicationModel, fetchableFields, IFetchableFields } from './ApplicationModel';

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
}

export type MemberState = TableState<IMember & IFetchableFields>;

export class Member extends ApplicationModel<IMember, IFetchableFields> {
  public static modelName = 'member';

  public static fields = {
    ...fetchableFields,
    id: attr(),
    authority: attr(),
    firstName: attr(),
    lastName: attr(),
    email: attr(),
    phoneNumber: attr()
  }
}
