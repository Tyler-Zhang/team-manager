import { schema } from 'normalizr';
import { attr, many, TableState } from 'redux-orm';
import { ApplicationModel, baseFields, IBaseFields } from './ApplicationModel';
import { positionSchema } from './Position';
import { IResource, resourceListSchema } from './Resource';

export interface ITeam {
  id: number;
  name: string;
  resources: IResource[];
}

export type TeamState = TableState<ITeam & IBaseFields>;

export class Team extends ApplicationModel<ITeam, IBaseFields> {
  public static modelName = 'Team';

  public static fields = {
    ...baseFields,
    id: attr(),
    name: attr(),
    resources: many('Resource', 'team')
  }
}

export const teamSchema: schema.Entity = new schema.Entity('teams', {
  positions: new schema.Array(positionSchema),
  resources: resourceListSchema
});

export const teamListSchema = new schema.Array(teamSchema);
