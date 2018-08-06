import { schema } from 'normalizr';
import { attr, many, TableState } from 'redux-orm';
import { ApplicationModel, fetchableFields, IFetchableFields } from './ApplicationModel';
import { positionSchema } from './Position';

export interface ITeam {
  id: number;
  name: string;
}

export type TeamState = TableState<ITeam & IFetchableFields>;

export class Team extends ApplicationModel<ITeam, IFetchableFields> {
  public static modelName = 'Team';

  public static fields = {
    ...fetchableFields,
    id: attr(),
    name: attr(),
    positions: many('Position', 'positions')
  }
}

export const teamSchema: schema.Entity = new schema.Entity('members', {
  positions: [positionSchema]
});
