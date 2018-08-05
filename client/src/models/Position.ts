import { schema } from 'normalizr';
import { attr, TableState } from 'redux-orm';
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
  public static modelName = 'member';

  public static fields = {
    ...fetchableFields,
    id: attr(),
    teamId: attr(),
    memberId: attr()
  }
}

export const positionSchema = new schema.Entity('positions', {
  member: memberSchema,
  team: teamSchema
})
