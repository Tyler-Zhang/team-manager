import { schema } from 'normalizr';
import { attr, fk, TableState } from 'redux-orm';
import { ApplicationModel, baseFields, IBaseFields } from './ApplicationModel';
import { IMember } from './Member';
import { ITeam } from './Team';

export interface IPosition {
  id: number;
  team: ITeam;
  member: IMember;
  teamId: number;
  memberId: number;
}

export type PositionState = TableState<IPosition & IBaseFields>;

export class Position extends ApplicationModel<IPosition, IBaseFields> {
  public static modelName = 'Position';

  public static fields = {
    ...baseFields,
    id: attr(),
    teamId: attr(),
    memberId: attr(),
    member: fk('Member', 'positions'),
    team: fk('Team', 'positions')
  }
}

export const positionSchema = new schema.Entity('positions');
export const positionListSchema = new schema.Array(positionSchema);
