import { attr, TableState } from 'redux-orm';
import { ApplicationModel, fetchableFields, IFetchableFields } from './ApplicationModel';

export interface ITeamModel {
  id: number;
  name: string;
}

export type TeamState = TableState<ITeamModel & IFetchableFields>;

export class Team extends ApplicationModel<ITeamModel, IFetchableFields> {
  public static modelName = 'team';

  public static fields = {
    ...fetchableFields,
    id: attr(),
    name: attr()
  }
}
