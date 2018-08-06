import { schema } from 'normalizr';
import { attr, fk, TableState } from 'redux-orm';
import { ApplicationModel, fetchableFields, IFetchableFields } from './ApplicationModel';
import { IMember, memberSchema } from './Member';
import { ITeam, teamSchema } from './Team';

export interface IPosition {
  team: ITeam;
  member: IMember;
  teamId: number;
  memberId: number;
}

export type PositionState = TableState<IPosition & IFetchableFields>;

export class Position extends ApplicationModel<IPosition, IFetchableFields> {
  public static modelName = 'Position';

  public static fields = {
    ...fetchableFields,
    id: attr(),
    teamId: attr(),
    memberId: attr(),
    member: fk('Member', 'positions'),
    team: fk('Team', 'positions')
  }
}

export const positionSchema = new schema.Entity('positions', {
  member: memberSchema,
  team: teamSchema
})

export const positionListSchema = new schema.Array(positionSchema);
