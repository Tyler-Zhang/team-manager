import { attr, TableState } from 'redux-orm';
import { ApplicationModel, fetchableFields, IFetchableFields } from './ApplicationModel';

export interface ITeam {
  id: number;
  name: string;
}

export type TeamState = TableState<ITeam & IFetchableFields>;

export class Team extends ApplicationModel<ITeam, IFetchableFields> {
  public static modelName = 'team';

  public static fields = {
    ...fetchableFields,
    id: attr(),
    name: attr()
  }
}
