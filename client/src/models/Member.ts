import { attr } from 'redux-orm';
import { ApplicationModel, Fetchable } from './ApplicationModel';

export enum Authority {
  member = 'member',
  admin = 'admin'
}

export interface IMemberBody {
  id: number;
  authority: Authority;
  firstName: string;
  lastName: string;
  email: string;
  phoneNumber: string;
}

export type IMemberModel = Fetchable<IMemberBody>;

export class Member extends ApplicationModel<IMemberModel> {
  public static modelName = 'member';

  public static fields = {
    id: attr(),
    authority: attr(),
    firstName: attr(),
    lastName: attr(),
    email: attr(),
    phoneNumber: attr(),
    isFetching: attr()
  }
}
