import { schema } from 'normalizr';
import { attr, TableState } from 'redux-orm';
import { ApplicationModel, baseFields, IBaseFields } from './ApplicationModel';
import { positionSchema } from './Position';

export interface ITeam {
  id: number;
  name: string;
}

export type TeamState = TableState<ITeam & IBaseFields>;

export class Team extends ApplicationModel<ITeam, IBaseFields> {
  public static modelName = 'Team';

  public static fields = {
    ...baseFields,
    id: attr(),
    name: attr()
  }
}

export const teamSchema: schema.Entity = new schema.Entity('teams', {
  positions: new schema.Array(positionSchema)
});

export const teamListSchema = new schema.Array(teamSchema);
